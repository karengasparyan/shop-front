import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Countdown from "./Countdown";
import {getWeekSaleRequest} from "../../store/actions/products";
import Preloader from "../../svg/preloader.svg";
import Utils from "../../helpers/Utils";
import {Link} from "react-router-dom";

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

    const deadline = this.props.weekSale?.map(w => w.attributes.find(a =>
      a.attributeKey === 'акция недели'))[0]?.attributeValue;

    return (
      <section className="deal-of-week set-bg spad container-fluid countDownSection">
        <div className="container d-flex">
          {deadline && <Countdown deadline={deadline}/>}
          {weekSale.map(p => <div
            key={p.id}
            className="col-lg-6 text-center"
            style={{
              backgroundImage: `url(${`${direction}/productImage/${p.id}/${p?.images[0]?.path}`})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <Link to={`/product/${p.id}`}>
              <p>{Utils.sliceText(p.name, 30)}</p>
            </Link>
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
