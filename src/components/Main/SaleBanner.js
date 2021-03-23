import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import SlickCarousel from "../Carusel/SlickCarousel";
import Preloader from "../../svg/preloader.svg";
import {getNewRequest, getProductsRequest, getSaleRequest} from "../../store/actions/products";
import Media from 'react-media'
import memoizeOne from "memoize-one";
import _ from "lodash";
import {AnimateGroup} from "react-animation";
import Utils from "../../helpers/Utils";
import Slider from "react-slick";

class SaleBanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBuyMenu: null,
    }
  }

  componentDidMount() {
    const query1 = {'положение': 'акция'}
    const query2 = {'положение': 'новый'}
    this.props.getSaleRequest(query1);
    this.props.getNewRequest(query2);
  }

  getProducts = memoizeOne((argument) => {
    if (argument === 'saleProducts') {
      this.props.getProductsRequest({page: 1});
    } else if (argument === 'newProducts') {
      this.props.getProductsRequest({page: 1});
    }
  }, _.isEqual)

  showBuyMenu = (showBuyMenu) => {
    this.setState({showBuyMenu})
  }

  render() {
    const {reverse, title, saleProducts, newProducts} = this.props;
    const {showBuyMenu} = this.state;

    let products = [];

    if (reverse) {
     if (_.isEmpty(saleProducts)){
       this.getProducts('saleProducts')
       products = this.props.products;
     } else {
       products = saleProducts;
     }
    } else {
      if (_.isEmpty(newProducts)){
        this.getProducts('newProducts')
        products = this.props.products.reverse();
      } else {
        products = newProducts;
      }
    }

    if (!products) { return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div> }

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
                      <SlickCarousel images={products} slidesToShow={3} arrows={true} homeSlider={true}/>}
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
  products: state.products.products,
});
const mapDispatchToProps = {
  getSaleRequest,
  getNewRequest,
  getProductsRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaleBanner);

export default Container;
