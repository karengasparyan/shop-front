import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AnimateOnChange} from 'react-animation'
import {getCardListRequest} from "../../store/actions/products";
import Utils from "../../helpers/Utils";

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
    this.timeout = null;
  }

  componentDidMount() {
    const {deadline} = this.props;
   this.timeout = setTimeout(() => {
      this.getTimeUntil(deadline);
      this.getTimeUntilInterval(deadline)
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.timeout)
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

  render() {
    const {days, hours, minutes, seconds,} = this.state;
    let {weekSale} = this.props;

    return (
      <>
        {weekSale.map(p => <div key={p.id} className="col-lg-6 text-center">
          <div className="section-title">
            <h3 className="compTitle">Продажа недели</h3>
            <p>{p.shortDescription}</p>
            <div className="product-price">
              ₽ {p.salePrice}
            </div>
            {p.qty > 0 ? <p>{`На скаладе ${p.qty} штук`}</p> : <p>Все продоно</p>}
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
          {p.qty > 0 ? <p
              onClick={() => Utils.addCard(p.id,this.props.getCardListRequest)}
              className="primary-btn-custom">Купить сейчас</p> :
            <p
              className="primary-btn-custom">
              Все продоно!</p>}
        </div>)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  weekSale: state.products.weekSale,

});
const mapDispatchToProps = {
  getCardListRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Countdown);

export default Container;
