import React, {Component} from 'react';
import {connect} from "react-redux";
import Wrapper from "../Wrapper";
import BrandCrumb from "../BrandCrumb";
import _ from "lodash";
import {toast} from "react-toastify";
import Preloader from "../../svg/preloader.svg";
import {createOrderRequest, getCardListRequest} from "../../store/actions/products";
import SimpleReactValidator from 'simple-react-validator';
import Utils from "../../helpers/Utils";
import memoizeOne from "memoize-one";
import {setTotalPrice} from "../../store/actions/reduxSetState";
import classnames from "classnames";


class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCount: [],
      values: {},
      errors: {},
    };
    this.validator = new SimpleReactValidator({
      messages: {
        name: 'Введите ваше имя и фамилию',
        town: 'Введите город доставки',
        address: 'Введите адрес доставки',
        phone: 'Телефонный номер неправильный',
        email: 'Электронная почта должна быть действующим адресом электронной почты',
        default: 'Ето обязательное поле!',
      }
    })
  }

  componentDidMount() {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
    window.scrollTo(0, 0)
  }

  handleChange = (ev, i) => {
    let {values} = this.state;
    const value = _.get(ev, 'target.value', ev)

    _.set(values, i, value)

    let errors = this.validator.getErrorMessages()
    this.forceUpdate();
    this.setState({values, errors});
  }

  sendOrder = async (totalPrice, singleCount, cardProducts) => {
    const {values, errors} = this.state;

    let orderData = [];
    let data = cardProducts;

    for (let i = 0; i < singleCount.length; i++) {
      if (data.some(d => +d.id === +Object.keys(singleCount[i])[0])) {
        data.find(d => +d.id === +Object.keys(singleCount[i])[0]).saleCount = +Object.values(singleCount[i])[0]
      }
    }
    data = JSON.stringify(data);
    orderData.push({data});
    values.total = totalPrice;
    orderData = [...orderData, {...values}]

    this.props.createOrderRequest({
      orderData,
    }, async (error, data) => {
      if (error) {
        this.setState({errors: this.validator.messages})
        toast.error(classnames(this.props.error === 'Unprocessable Entity' ? 'Неправильно заполненные поля' :
          this.props.error
        ))
        return;
      }

      toast.success('Заказ отправлен! Проверьте емайл');

      this.props.history.replace(`/shop`);
      window.localStorage.setItem("cardIds", JSON.stringify([]));
      this.props.getCardListRequest([]);
      this.props.setTotalPrice(0)
    })
  }

  initTotalPrice = memoizeOne((cardProducts, singleCount, totalPrice) => {
    if (cardProducts && singleCount && totalPrice) {
      this.props.setTotalPrice(totalPrice)
    }
  }, _.isEqual)

  render() {
    const {cardProducts, orderRequestStatus} = this.props;
    let {values, errors} = this.state;
    const { messages } = this.validator;

    if (!cardProducts) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const singleCount = Utils.getSingleCount();

    const totalPrice = Utils.getTotalPrice(cardProducts, singleCount);

    this.initTotalPrice(cardProducts, singleCount, totalPrice);

    return (
      <Wrapper>
        <BrandCrumb crumb="Заказать"/>
        <section className="checkout-section spad">
          <div className="container">
            <form className="checkout-form">
              <div className="row">
                <div className="col-lg-6">
                  <h4>Реквизиты для оплаты и доставки</h4>
                  <div className="row">
                    <div className="col-lg-12">
                      <label htmlFor="name">Имя Фамилия<span>*</span></label>
                      <input
                        type="text"
                        id="firstname"
                        value={values.name}
                        onChange={(ev) => this.handleChange(ev, 'name')}
                      />
                      {this.validator.message('name', values.name, 'required|string|min:3')}
                      <span className="inputValidationError">{errors?.name}</span>
                    </div>
                    <div className="col-lg-12">
                      <label htmlFor="town">Город<span>*</span></label>
                      <input
                        type="text"
                        id="town"
                        value={values.town}
                        onChange={(ev) => this.handleChange(ev, 'town')}
                      />
                      {this.validator.message('town', values.town, 'required|string|min:3')}
                      <span className="inputValidationError">{errors?.town}</span>
                    </div>
                    <div className="col-lg-12">
                      <label htmlFor="address">Адрес доставки<span>*</span></label>
                      <input
                        type="text"
                        id="address"
                        value={values.address}
                        onChange={(ev) => this.handleChange(ev, 'address')}
                      />
                      {this.validator.message('address', values.address, 'required|string|min:15')}
                      <span className="inputValidationError">{errors?.address}</span>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="phone">Телефон<span>*</span></label>
                      <input
                        type="text"
                        id="phone"
                        value={values.phone}
                        onChange={(ev) => this.handleChange(ev, 'phone')}
                      />
                      {this.validator.message('phone', values.phone, 'required|phone')}
                      <span className="inputValidationError">{errors?.phone}</span>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="email">Адрес электронной почты<span>*</span></label>
                      <input
                        type="text"
                        id="email"
                        value={values.email}
                        onChange={(ev) => this.handleChange(ev, 'email')}
                      />
                      {this.validator.message('email', values.email, 'required|email')}
                      <span className="inputValidationError">{errors?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="place-order">
                    <h4>Ваши заказы</h4>
                    <div className="order-total">
                      <ul className="order-table">
                        <li>Товары <span>ИТОГОВАЯ СУММА</span></li>
                        {cardProducts.map((p) => <li key={p.id}
                                                     className="fw-normal">
                          {`${Utils.sliceText(p.name,40)} X ${singleCount.map((c) => c[p.id]).filter(u => u !== undefined)[0]}`}
                          <span>
                            {`₽ ${p.salePrice * singleCount.map((c) => c[p.id]).filter(u => u !== undefined)[0]}`}
                          </span>
                        </li>)}
                        <li className="total-price">ИТОГОВАЯ СУММА <span>{`₽ ${totalPrice}`}</span></li>
                      </ul>
                      <div className="order-btn">
                        {orderRequestStatus === 'request' ?
                          <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div> :
                          <button
                            onClick={() => this.sendOrder(totalPrice, singleCount, cardProducts)}
                            type="button"
                            className="site-btn place-btn">
                            Отправить Заказ
                          </button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  cardProducts: state.products.cardProducts,
  orderRequestStatus: state.products.orderRequestStatus,
  error: state.products.error,
});
const mapDispatchToProps = {
  getCardListRequest,
  createOrderRequest,
  setTotalPrice,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOut);

export default Container;