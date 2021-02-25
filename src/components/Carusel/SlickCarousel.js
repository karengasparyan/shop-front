import React, {Component} from "react";
import Slider from "react-slick";
import Radium, {StyleRoot} from 'radium';
// import {bounce} from "react-animations";
import {CSSTransition} from "react-transition-group";
import {AnimateGroup, animations, AnimateOnChange} from 'react-animation'
import PropTypes from "prop-types";
import Preloader from "../../svg/preloader.svg";
import {getCardListRequest, singleProductsRequest} from "../../store/actions/products";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import _ from "lodash";
import {toast} from "react-toastify";
// import styles from '../../helpers/AnimationStyles'

// https://react-slick.neostack.com/docs/example/simple-slider

class SlickCarousel extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    slidesToShow: PropTypes.number,
    arrows: PropTypes.bool,
    product: PropTypes.bool,
    homeSlider: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeText: '',
      animation: false,
      showBuyMenu: null,

    }
    this.text = ['HELLO', 'WORLD', 'FINE'];
    this.interval = null;
    this.index = 0;
  }


  intervalFunction = (array) => {
    if (this.index === array.length) {
      this.index = 0
    }
    this.index++
    this.setState({activeText: array[this.index - 1], animation: true})
  }

  // animationInterval = () => {
  //   this.interval = setInterval(() => this.intervalFunction(this.text), 2000)
  //   this.setState({animation: false})
  // }

  // componentDidMount() {
  //   this.animationInterval()
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // }

  addCard = (id) => {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    cardIds.push(id);
    window.localStorage.setItem("cardIds", JSON.stringify(cardIds));
    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
    toast.success('Товар добавлен в корзину')
  }

  showBuyMenu = (showBuyMenu) => {
    this.setState({showBuyMenu})
  }

  render() {
    const {activeText, animation, showBuyMenu} = this.state;
    const {images, slidesToShow, arrows, product, homeSlider, match: {params}} = this.props;
    if (!images) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const direction = process.env.REACT_APP_API_URL;
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: slidesToShow || 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: arrows || false,
    };
    if (product) {
      return <section className="slickSection">
        <Slider {...settings}>
          {images.map(i => <div key={i.id}>
            <img style={{width: '100%', height: '100%'}}
                 src={`${direction}/productImage/${params.id}/${i.path}`}
                 alt={`image_${i.id}`}/>
          </div>)}
        </Slider>
      </section>
    }
    if (homeSlider) {
      return <section className="slickSection">
        <Slider {...settings}>
          {images.map(i =>
            <div key={i.id} className="product-item">
              <div className="pi-pic"
                   onMouseOver={() => this.showBuyMenu(i.id)}
                   onMouseLeave={() => this.showBuyMenu(null)} key={i.id}>
                <img style={{width: '100%', height: '100%'}}
                     src={`${direction}/productImage/${i.id}/${i.images[0].path}`}
                     alt={`image_${i.id}`}/>
                <AnimateGroup animation="bounce">
                  {+showBuyMenu === +i.id && <ul>
                    {i.qty > 0 && <li className="w-icon active">
                      <a onClick={() => this.addCard(i.id)}>
                        <i className="icon_bag_alt"/></a>
                    </li>}
                    <li className="quick-view"><Link to={`/product/${i.id}`}>Просмотр</Link></li>
                    {/*<li className="w-icon"><Link to=""><i className="fa fa-random"/></Link></li>*/}
                  </ul>}
                </AnimateGroup>
                {i?.attributes?.find(status => status.attributeKey === 'положение') &&
                i?.attributes?.find(status => status.attributeValue === 'акция') &&
                <div className="sale pp-sale">акция</div>}

                {i?.attributes?.find(status => status.attributeKey === 'положение') &&
                i?.attributes?.find(status => status.attributeValue === 'новый') &&
                <div className="stock pp-sale">новый</div>}

                {i.qty === 0 && <div className="notStock pp-sale">нет в наличи</div>}
              </div>
            </div>)}
        </Slider>
      </section>
    }
    return (
      <section className="slickSection">
        <Slider {...settings}>
          {/*<div style={{position: "relative"}}>*/}
          {/*    <div style={{position: "absolute", top: '90%'}}>*/}
          {/*        <AnimateOnChange>*/}
          {/*            <span style={{*/}
          {/*                color: "red",*/}
          {/*                fontSize: 50,*/}
          {/*            }}>{activeText}</span>*/}
          {/*        </AnimateOnChange>*/}
          {/*    </div>*/}
          {/*    <img src="/assets/img/01.jpg"/>*/}
          {/*</div>*/}
          {images.map(i => <div key={i.id}>
            <img src={`${direction}/sliderImages/${i.path}`} alt={`image_${i.id}`}/>
          </div>)}
        </Slider>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  singleProduct: state.products.singleProduct
});
const mapDispatchToProps = {
  singleProductsRequest,
  getCardListRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SlickCarousel));

export default Container;