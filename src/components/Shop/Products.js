import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getCardListRequest, getProductsRequest,} from "../../store/actions/products";
import {setTotalPrice} from "../../store/actions/reduxSetState";
import Preloader from "../../svg/preloader2.svg";
import _ from 'lodash';
import {Link} from "react-router-dom";
import {AnimateKeyframes} from "react-simple-animate";
import LazyLoad from 'react-lazyload';
import memoizeOne from "memoize-one";
import Utils from "../../helpers/Utils";

class Products extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      showBuyMenu: null,
    }
  }

  showBuyMenu = (showBuyMenu) => {
    this.setState({showBuyMenu})
  }

  componentDidMount() {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    cardIds = _.uniq(cardIds);
    this.props.getCardListRequest(cardIds);
  }

  initTotalPrice = memoizeOne((cardProducts, singleCount, totalPrice) => {
    if (cardProducts && singleCount && totalPrice) {
      this.props.setTotalPrice(totalPrice)
    }
  }, _.isEqual)


  render() {
    let {products, cardProducts, productsRequestStatus} = this.props;
    const {showBuyMenu} = this.state;

    if (!products) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    const singleCount = Utils.getSingleCount();

    const totalPrice = Utils.getTotalPrice(cardProducts, singleCount);

    this.initTotalPrice(cardProducts, singleCount, totalPrice);

    const direction = process.env.REACT_APP_API_URL;

    return (
      <div className="product-list">
        <div className="row">
          {_.isEmpty(products) && productsRequestStatus === 'success' ? <p>Поиск не дал результатов</p> :
            (products).map(p => <div className="col-lg-4 col-sm-6">
              <AnimateKeyframes
                play={!_.isEmpty(products)}
                duration={0.5}
                keyframes={["opacity: 0", "opacity: 1"]}
              >
                <div className="product-item">
                  <div
                    onMouseOver={() => this.showBuyMenu(p.id)}
                    onMouseLeave={() => this.showBuyMenu(null)}
                    className="pi-pic">
                    <LazyLoad height={300}>
                      <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt={`image_${p.id}`}/>
                    </LazyLoad>
                    <AnimateKeyframes
                      play={+showBuyMenu === +p.id}
                      duration={0.5}
                      keyframes={["opacity: 0", "opacity: 1"]}
                    >
                      {+showBuyMenu === +p.id && <ul>
                        {p.qty > 0 && <li className="w-icon active">
                          <a onClick={() => Utils.addCard(p.id, this.props.getCardListRequest)}>
                            <i className="icon_bag_alt"/></a>
                        </li>}
                        <li className="quick-view"><Link to={`/product/${p.id}`}>Просмотр</Link></li>
                        {/*<li className="w-icon"><Link to=""><i className="fa fa-random"/></Link></li>*/}
                      </ul>}
                    </AnimateKeyframes>
                    {p?.attributes?.find(status => status.attributeKey === 'положение') &&
                    p?.attributes?.find(status => status.attributeValue === 'акция') &&
                    <div className="sale pp-sale">акция</div>}

                    {p?.attributes?.find(status => status.attributeKey === 'положение') &&
                    p?.attributes?.find(status => status.attributeValue === 'новый') &&
                    <div className="stock pp-sale">новый</div>}

                    {p.qty === 0 && <div className="notStock pp-sale">нет в наличи</div>}

                    <div className="icon">
                      <i className="icon_heart_alt"/>
                    </div>
                  </div>
                  <div className="pi-text">
                    {p.attributes.filter(a => a.attributeKey !== 'положение' &&
                      a.attributeKey !== 'секция комплектация').map(a =>
                      <div className="catagory-name">{a.attributeValue}</div>)}
                    <a href="#">
                      <Link to={`/product/${p.id}`}><h5>{Utils.sliceText(p.name, 30)}</h5></Link>
                    </a>
                    <div className="product-price">
                      {p.price}
                      <span>{p.salePrice}</span>
                    </div>
                  </div>
                </div>
              </AnimateKeyframes>
            </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  productCount: state.products.productCount,
  cardProducts: state.products.cardProducts,
  productsRequestStatus: state.products.productsRequestStatus,
});
const mapDispatchToProps = {
  getProductsRequest,
  getCardListRequest,
  setTotalPrice,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);

export default Container;
