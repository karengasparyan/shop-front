import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {getCardListRequest} from "../../store/actions/products";
import {setTotalPrice} from "../../store/actions/reduxSetState";
import _ from 'lodash';
import Preloader from "../../svg/preloader2.svg";
import Utils from "../../helpers/Utils";
import memoizeOne from "memoize-one";

class CartShow extends Component {
  static propTypes = {
    showMenu: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      singleCount: [],
      value: 1,
    }
  }


  componentDidMount() {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
  }

  setCountProduct = (pId) => {
    let { value } = this.state;
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    let utilArray = [];
    const singleCount = Utils.getSingleCount();

    for (let i = 0; i < singleCount.length; i++) {

      if (singleCount[i][pId]) {

        cardIds = Utils.deleteArrayElement(cardIds, [+Object.keys(singleCount[i])])

        singleCount[i][pId] = +value
      }
    }
    for (let i = 0; i < singleCount.length; i++) {
      if (singleCount[i][pId]) {
        for (let j = 0; j < +singleCount[i][pId]; j++) {
          utilArray.push(+Object.keys(singleCount[i]))
        }
      }
    }
    cardIds = cardIds.concat(utilArray)

    window.localStorage.setItem("cardIds", JSON.stringify(cardIds));

    this.setState({singleCount})

  }

  deleteProduct = (pId) => {
    const singleCount = Utils.getSingleCount();
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];

    for (let i = 0; i < singleCount.length; i++) {
      if (singleCount[i][pId]) {
        cardIds = Utils.deleteArrayElement(cardIds, [+Object.keys(singleCount[i])])
      }
    }

    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
    window.localStorage.setItem("cardIds", JSON.stringify(cardIds));
    this.setState({singleCount})
  }

  handleChange = (ev) => {
    let {value} = ev.target
    if (value > 0) {
      this.setState({value})
    }
  }

  // handleChange = (value, i,qty) => {
  //   if (value > 0 && value < qty + 1) {
  //     const values = {...this.state.values, [i]: value}
  //     this.setState({values});
  //   }
  //
  // }

  initTotalPrice = memoizeOne((cardProducts, singleCount, totalPrice) => {
    if (cardProducts && singleCount && totalPrice) {
      this.props.setTotalPrice(totalPrice)
    } else {
      this.props.setTotalPrice(0)
    }
  }, _.isEqual)

  render() {
    const {showMenu, cardProducts} = this.props;

    if (!cardProducts) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const singleCount = Utils.getSingleCount();

    const totalPrice = Utils.getTotalPrice(cardProducts,singleCount);

    this.initTotalPrice(cardProducts, singleCount, totalPrice);

    const direction = process.env.REACT_APP_API_URL;

    return (
      <div onMouseLeave={() => showMenu(null)} className="cart-hover">
        <div className="select-items">
          <table>
            {_.isEmpty(cardProducts) ? <p>Корзина пуста</p> : <tbody>
            {cardProducts.map((p) => <tr key={p.id}>
              <td className="si-pic">
                <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt={`image_${p.id}`}/>
              </td>
              <td className="si-text">
                <div className="product-selected">
                  <p>{`₽${p.salePrice} x`}</p>
                  <input
                    className="countInput"
                    type="number"
                    value={singleCount.map((c) => c[p.id]).filter(u => u !== undefined)[0]}
                    onClick={() => this.setCountProduct(p.id)}
                    onChange={this.handleChange}
                  />
                </div>
                <h6>{Utils.sliceText(p.name,17)}</h6>
              </td>
              <td onClick={() => this.deleteProduct(p.id)} className="si-close">
                <i className="ti-close"/>
              </td>
            </tr>)}
            </tbody>}
          </table>
        </div>
        {!_.isEmpty(cardProducts) && <div className="select-total">
          <span>Итоговая сумма:</span>
          <h5>{totalPrice}</h5>
        </div>}
        {!_.isEmpty(cardProducts) && <div className="select-button">
          <Link to="/shopping-cart" className="primary-btn view-card">ПОСМОТРЕТЬ</Link>
          <Link to="/check-out" className="primary-btn checkout-btn">ЗАКАЗАТЬ</Link>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cardProducts: state.products.cardProducts,
});
const mapDispatchToProps = {
  getCardListRequest,
  setTotalPrice,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartShow);

export default Container;
