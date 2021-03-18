import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import SlickCarousel from "../Carusel/SlickCarousel";
import Preloader from "../../svg/preloader.svg";
import {getNewRequest, getSaleRequest} from "../../store/actions/products";
import Media from 'react-media'
import MobileLeftBar from "../Header/MobileLeftBar";

class SaleBanner extends Component {

  componentDidMount() {
    const query1 = {'положение': 'акция'}
    const query2 = {'положение': 'новый'}
    this.props.getSaleRequest(query1);
    this.props.getNewRequest(query2);
  }

  render() {
    const {reverse, title, saleProducts, newProducts} = this.props;

    let products = []

    if (reverse) {
      products = saleProducts;
    } else {
      products = newProducts;
    }

    if (!products) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const direction = process.env.REACT_APP_API_URL;

    return (
      <section className="sale-banner">
        <div className="container-fluid">
          <div className={`row ${reverse}`}>
            <div className="col-lg-3">
              <div className="product-large set-bg">
                <h4 className="compTitle">{title ? title : 'ПОСЛЕДНЕЕ ПОСТУПЛЕНИЕ'}</h4>
                <img src={`${direction}/productImage/${products[0]?.id}/${products[0]?.images[0].path}`}
                     alt={`image_${products[0]?.id}`}/>
                <Link to={reverse ? "/shop?положение=акция" : "/shop?положение=новый"}>В КАТАЛОГ</Link>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1">
              <div className="saleBannerSliderContainer">
                <Media queries={{
                  smallMax: "(max-width: 575px)",
                  small: "(min-width: 576px) and (max-width: 767px)",
                  medium: "(min-width: 768px) and (max-width: 1919px)",
                  large: "(min-width: 1920px)"
                }}>
                  {matches => (
                    <Fragment>
                      {matches.smallMax &&
                      <SlickCarousel images={products} slidesToShow={1} arrows={true} homeSlider={true}/>}
                      {matches.small &&
                      <SlickCarousel images={products} slidesToShow={2} arrows={true} homeSlider={true}/>}
                      {matches.medium &&
                      <SlickCarousel images={products} slidesToShow={3} arrows={true} homeSlider={true}/>}
                      {matches.large &&
                      <SlickCarousel images={products} slidesToShow={4} arrows={true} homeSlider={true}/>}
                    </Fragment>
                  )}
                </Media>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  newProducts: state.products.newProducts,
  saleProducts: state.products.saleProducts,
});
const mapDispatchToProps = {
  getSaleRequest,
  getNewRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleBanner);

export default Container;
