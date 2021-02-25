import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Countdown from "./Countdown";
import {getWeekSaleRequest} from "../../store/actions/products";
import Preloader from "../../svg/preloader.svg";

class CountDownSection extends Component {
  componentDidMount() {
    const query = {s: 'акция недели'}
    this.props.getWeekSaleRequest(query)
  }

  render() {
    const {weekSale} = this.props;

    if (!weekSale) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const direction = process.env.REACT_APP_API_URL;

    return (
      <section className="deal-of-week set-bg spad countDownSection">
        <div className="container d-flex">
          {!_.isEmpty(weekSale) && weekSale && <Countdown weekSale={weekSale}/>}
          {weekSale.map(p => <div key={p.id} className="col-lg-6 text-center">
            <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt={`image_${p.id}`}/>
            <p>{p.name}</p>
          </div>)}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
    weekSale: state.products.weekSale,
  }
);
const mapDispatchToProps = {
  getWeekSaleRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountDownSection);

export default Container;
