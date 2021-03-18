import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import CartHover from "./CartShow";
import {Link, withRouter} from "react-router-dom";
import _ from "lodash";
import {getCardListRequest} from "../../store/actions/products";
import Utils from "../../helpers/Utils";
import memoizeOne from "memoize-one";
import {setTotalPrice} from "../../store/actions/reduxSetState";
import Media from "react-media";
import MobileLeftBar from "./MobileLeftBar";

class Cart extends Component {

  componentDidMount() {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
  }

  initTotalPrice = memoizeOne((cardProducts, singleCount, totalPrice) => {
    if (cardProducts && singleCount && totalPrice) {
      this.props.setTotalPrice(totalPrice)
    }
  }, _.isEqual)

  render() {
    const {showMenu, show, cardProducts, match: {path}} = this.props;

    const singleCount = Utils.getSingleCount();

    const totalPrice = Utils.getTotalPrice(cardProducts,singleCount);

    this.initTotalPrice(cardProducts, singleCount, totalPrice);

    return (
      <ul className="nav-right">
          <li onMouseOver={() => showMenu('showCard')} className="cart-icon">
            <Link to="/shopping-cart">
              <i className="mobileHeaderIcon icon_bag_alt" title={`${totalPrice} ₽`}/>
              {cardProducts?.length > 0 && <span>{cardProducts?.length}</span>}
            </Link>
            {show === 'showCard' && path !== '/shopping-cart' && path !== '/check-out' &&
            <CartHover show={show} showMenu={showMenu}/>}
          </li>
        <Media query="(min-width: 768px)" render={() => (
          <li className="cart-price">{`${totalPrice} ₽`}</li>
        )}/>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  cardProducts: state.products.cardProducts,
  totalPrice: state.products.totalPrice,
});
const mapDispatchToProps = {
  getCardListRequest,
  setTotalPrice,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Cart));

export default Container;
