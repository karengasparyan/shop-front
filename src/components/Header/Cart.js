import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import {CSSTransition} from 'react-transition-group';
import PropTypes from "prop-types";
import CartHover from "./CartShow";
import {Link, NavLink, withRouter} from "react-router-dom";
import {AnimateGroup} from "react-animation";
import _ from "lodash";
import {getCardListRequest, getProductsRequest} from "../../store/actions/products";
import queryString from "query-string";
import Utils from "../../helpers/Utils";
import memoizeOne from "memoize-one";
import {setTotalPrice} from "../../store/actions/reduxSetState";

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
            <i className="icon_bag_alt"/>
            {cardProducts?.length > 0 && <span>{cardProducts?.length}</span>}
          </Link>
          <AnimateGroup animation="fade">
            {show === 'showCard' && path !== '/shopping-cart' && path !== '/check-out' &&
            <CartHover show={show} showMenu={showMenu}/>}
          </AnimateGroup>
        </li>
        <li className="cart-price">{`₽ ${totalPrice}`}</li>
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
