import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {AnimateOnChange} from 'react-animation'
import _ from "lodash";
import {toast} from "react-toastify";
import {getCardListRequest} from "../../store/actions/products";

class Countdown extends Component {

  constructor(props) {

    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.interval = null;
  }

  componentDidMount() {
    const deadline = this.props.weekSale.map(w =>
      w.attributes.find(a => a.attributeKey === 'акция недели'))[0].attributeValue;
    if (deadline) {
      this.getTimeUntil(deadline);
      this.getTimeUntilInterval(deadline)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getTimeUntilInterval = (deadline) => {
    this.interval = setInterval(() => this.getTimeUntil(deadline), 1000);
  }

  leading0(num) {
    return num < 10 ? "0" + num : num;
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      this.setState({days: 0, hours: 0, minutes: 0, seconds: 0});
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({days, hours, minutes, seconds});
    }
  }

  addCard = (id) => {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    cardIds.push(id);
    window.localStorage.setItem("cardIds", JSON.stringify(cardIds));
    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
    toast.success('Товар добавлен в корзину')
  }

  render() {
    const {days, hours, minutes, seconds,} = this.state;
    let {weekSale} = this.props;

    return (
      <>
        {weekSale.map(p => <div key={p.id} className="col-lg-6 text-center">
          <div className="section-title">
            <h2>Продажа недели</h2>
            <p>{p.shortDescription}</p>
            <div className="product-price">
              ₽ {p.salePrice}
            </div>
          </div>

          <div className="countdown-timer" id="countdown">
            <div className="cd-item"><span><AnimateOnChange>{this.leading0(days)}</AnimateOnChange></span><p>Days</p>
            </div>
            <div className="cd-item"><span><AnimateOnChange>{this.leading0(hours)}</AnimateOnChange></span><p>Hrs</p>
            </div>
            <div className="cd-item"><span><AnimateOnChange>{this.leading0(minutes)}</AnimateOnChange></span><p>Mins</p>
            </div>
            <div className="cd-item"><span><AnimateOnChange>{this.leading0(seconds)}</AnimateOnChange></span><p>Secs</p>
            </div>
          </div>
          <a onClick={() => this.addCard(p.id)} className="primary-btn">Купить сейчас</a>
        </div>)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  getCardListRequest,
  };

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Countdown);

export default Container;
