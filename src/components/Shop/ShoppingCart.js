import React, {Component} from 'react';
import {connect} from "react-redux";
import Wrapper from "../Wrapper";
import BrandCrumb from "../BrandCrumb";
import _ from "lodash";
import Utils from "../../helpers/Utils";
import Preloader from "../../svg/preloader2.svg";
import {getCardListRequest} from "../../store/actions/products";
import {setTotalPrice} from "../../store/actions/reduxSetState";
import {Link} from "react-router-dom";
import memoizeOne from "memoize-one";


class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCount: [],
      value: 1,
    };
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
    const {value} = ev.target;
    if (value > 0) {
      this.setState({value})
    }
  }

  initTotalPrice = memoizeOne((cardProducts, singleCount, totalPrice) => {
    if (cardProducts && singleCount && totalPrice) {
      this.props.setTotalPrice(totalPrice)
    } else {
      this.props.setTotalPrice(0)
    }
  }, _.isEqual)

  render() {
    const {cardProducts} = this.props;

    if (!cardProducts) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const singleCount = Utils.getSingleCount();

    const totalPrice = Utils.getTotalPrice(cardProducts,singleCount);

    this.initTotalPrice(cardProducts, singleCount, totalPrice);

    const direction = process.env.REACT_APP_API_URL;

    return (
      <Wrapper>
        <BrandCrumb crumb="Корзина"/>
        <section className="shopping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table">
                  {_.isEmpty(cardProducts) ? <p>Корзина пуста</p> : <table>
                    <thead>
                    <tr>
                      <th>Изображение</th>
                      <th className="p-name">Названия продуктов</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>ИТОГОВАЯ СУММА</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cardProducts.map((p) => <tr key={p.id}>
                      <td className="cart-pic first-row">
                        <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt={`image_${p.id}`}/>
                      </td>
                      <td className="cart-title first-row">
                        <h5>{p.name}</h5>
                      </td>
                      <td className="p-price first-row">{`₽ ${p.salePrice}`}</td>
                      <td className="qua-col first-row">
                        <div className="quantity">
                          <div className="pro-qty">
                            <input
                              className="countInput"
                              type="number"
                              value={singleCount.map((c) => c[p.id]).filter(u => u !== undefined)[0]}
                              onClick={() => this.setCountProduct(p.id)}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="total-price first-row">
                        {`₽ ${p.salePrice * singleCount.map((c) => c[p.id]).filter(u => u !== undefined)[0]}`}
                      </td>

                      <td onClick={() => this.deleteProduct(p.id)} className="close-td first-row">
                        <i className="ti-close"/>
                      </td>
                    </tr>)}
                    </tbody>
                  </table>}
                </div>
                <div className="row">
                  <div className="col-lg-12 offset-lg-12">
                    <div className="proceed-checkout">
                      <ul>
                        <li className="cart-total">ИТОГОВАЯ СУММА <span>{`₽ ${totalPrice}`}</span></li>
                      </ul>
                      {!_.isEmpty(cardProducts) &&
                      <Link to="/check-out" className="proceed-btn">ПЕРЕЙТИ К ОФОРМЛЕНИЮ ЗАКАЗА</Link>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
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
)(ShoppingCart);

export default Container;