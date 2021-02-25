import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SlickCarousel from "../components/Carusel/SlickCarousel";
import Wrapper from "../components/Wrapper";
import BannerSection from "../components/Main/BannerSection";
import SaleBanner from "../components/Main/SaleBanner";
import CountDownSection from "../components/Main/CountDownSection";
import {getCatalogListRequest, getImagesSliderRequest} from "../store/actions/products";
import Preloader from "../svg/preloader.svg";

class Home extends Component {

  componentDidMount() {
    const {sliderImages} = this.props;
    if (_.isEmpty(sliderImages)){
      this.props.getImagesSliderRequest()
    }
  }

  render() {
    const {sliderImages} = this.props;

    if (!sliderImages) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    return (
        <Wrapper>
          {sliderImages && <SlickCarousel images={sliderImages} slidesToShow={1} arrows={true}/>}
          <BannerSection />
          <SaleBanner />
          <CountDownSection />
          <SaleBanner reverse="flex-row-reverse" titleMargin={{marginLeft: 56}} title="СЕЙЧАС ПОКУПАЮТ" />
        </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  sliderImages: state.products.sliderImages,
});
const mapDispatchToProps = {
  getImagesSliderRequest,
  getCatalogListRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Container;
