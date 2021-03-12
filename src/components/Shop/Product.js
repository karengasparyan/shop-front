import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Preloader from "../../svg/preloader.svg";
import _ from 'lodash';
import {Link, withRouter} from "react-router-dom";
import {AnimateGroup} from "react-animation";
import memoizeOne from "memoize-one";
import {getCardListRequest, singleProductsRequest} from "../../store/actions/products";
import SlickCarousel from "../Carusel/SlickCarousel";
import modalCustomStyle from '../../assets/styles/modal';
import Modal from 'react-modal';
import classnames from "classnames";
import Utils from "../../helpers/Utils";
import {toast} from "react-toastify";
import ImageGallery from 'react-image-gallery';
import {setTotalPrice} from "../../store/actions/reduxSetState";
import {AnimateKeyframes} from "react-simple-animate";

class Product extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      showSliderArrows: false,
      activeTab: 'ДРУГИЕ ЦВЕТА',
      showBuyMenu: '',
      singleCount: [],
      value: 1,
      disabled: 'disabled',
      openModal: false,
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    if (id) {
      this.props.singleProductsRequest(id)
    }
      let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
      cardIds = _.uniq(cardIds);
      this.props.getCardListRequest(cardIds);
    }

  showSliderArrows = (showSliderArrows) => {
    this.setState({showSliderArrows})
  }

  showTab = (activeTab) => {
    this.setState({activeTab})
  }

  showBuyMenu = (showBuyMenu) => {
    this.setState({showBuyMenu})
  }

  initProduct = memoizeOne((id) => {
    if (id) {
      window.scrollTo(0, 0)
      this.props.singleProductsRequest(id)
    }
  }, _.isEqual)

  setCountProduct = (pId) => {
    let { value } = this.state;
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    let utilArray = [];
    const singleCount = Utils.getSingleCount();

    for (let i = 0; i < singleCount.length; i++) {

      if (singleCount[i][pId]) {

        cardIds = Utils.deleteArrayElement(cardIds, [+Object.keys(singleCount[i])])

        singleCount[i][pId] = +value
      }
    }
    for (let i = 0; i < singleCount.length; i++) {
      if (singleCount[i][pId]) {
        for (let j = 0; j < +singleCount[i][pId]; j++) {
          utilArray.push(+Object.keys(singleCount[i]))
        }
      }
    }
    cardIds = cardIds.concat(utilArray)

    window.localStorage.setItem("cardIds", JSON.stringify(cardIds));

    this.setState({singleCount})
  }


  handleChange = (ev) => {
    const {value} = ev.target;
    if (value > 0) {
      this.setState({value})
    }
  }

  addCard = (id) => {
    Utils.addCard(id,this.props.getCardListRequest)
    this.setState({disabled: ''})
  }

  initTotalPrice = memoizeOne((cardProducts, singleCount, totalPrice) => {
    if (cardProducts && singleCount && totalPrice) {
      this.props.setTotalPrice(totalPrice)
    }
  }, _.isEqual)

  openModal = () => {
    const {openModal} = this.state;
    this.setState({openModal: !openModal,})
  }

  render() {
    const {singleProduct, match: {params}, cardProducts} = this.props;
    const {showSliderArrows, activeTab, showBuyMenu, disabled, openModal} = this.state;

    if (!singleProduct) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    if (!singleProduct.name) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    this.initProduct(params.id)

    const singleCount = Utils.getSingleCount();

    const totalPrice = Utils.getTotalPrice(cardProducts,singleCount);

    this.initTotalPrice(cardProducts, singleCount, totalPrice);

    const direction = process.env.REACT_APP_API_URL;

    const value = singleCount.map((c) => c[singleProduct.id]).filter(u => u !== undefined)[0] || 1;

    const images = [];
    singleProduct.images.map(i => images.push({
        original: `${direction}/productImage/${params.id}/${i.path}`,
        thumbnail: `${direction}/productImage/${params.id}/${i.path}`,
    }))

    return (
      <div className="col-lg-9">
        <div className="row">
          <div
            // onMouseOver={() => this.showSliderArrows(true)}
            // onMouseLeave={() => this.showSliderArrows(false)}
            className="col-lg-6">
            {/*<SlickCarousel openModal={this.openModal} images={singleProduct.images} arrows={showSliderArrows} product={true}/>*/}
          <ImageGallery items={images}/>
          </div>
          <div className="col-lg-6">
            <AnimateKeyframes
              play={!_.isEmpty(this.props.singleProduct)}
              duration={1}
              keyframes={["opacity: 0", "opacity: 1"]}
            >
            <div className="product-details">
              <div className="pd-title">
                <span>{singleProduct?.attributes?.find(a => a.attributeKey.toLowerCase() === 'цвет')?.attributeValue}</span>
                <h3>{Utils.sliceText(singleProduct?.name,25)}</h3>
              </div>
              <div className="pd-desc">
                <p>{singleProduct.shortDescription}</p>
                <h4>{`₽ ${singleProduct.salePrice}`} <span>{`₽ ${singleProduct.price}`}</span></h4>
              </div>
              {singleProduct.qty > 0 && <div className="quantity">
                <div className="pro-qty">
                  {singleProduct.qty > 0 && <input
                    type="number"
                    value={value}
                    onClick={() => this.setCountProduct(singleProduct.id)}
                    onChange={this.handleChange}
                    disabled={disabled}
                    min={0}
                    max={singleProduct.qty}
                  />}
                </div>
                <Link to={`/product/${singleProduct.id}`} className="primary-btn pd-cart"
                       onClick={() => this.addCard(singleProduct.id)}
                >в корзину</Link>
              </div>}
              <div className="pd-share">
                <div className="p-code">{`Sku : ${singleProduct.sku}`}</div>
                <div className="pd-social">
                  <a href="#"><i className="ti-facebook"/></a>
                  <a href="#"><i className="ti-instagram"/></a>
                </div>
              </div>
              {singleProduct.qty !== 0 ? <div className="p-code">{`В складе ${singleProduct.qty} штук`}</div> :
                <div className="p-code">Нет в наличии</div>}
            </div>
            </AnimateKeyframes>
          </div>
        </div>
        <div className="product-tab">
          <div className="tab-item">
            <ul className="nav" role="tablist">
              <li>
                <a
                  onClick={() => this.showTab('ДРУГИЕ ЦВЕТА')}
                  className={classnames(activeTab === 'ДРУГИЕ ЦВЕТА' && 'active')}
                >ДРУГИЕ ЦВЕТА</a>
              </li>
              <li>
                <a
                  onClick={() => this.showTab('ОПИСАНИЕ')}
                  className={classnames(activeTab === 'ОПИСАНИЕ' && 'active')}
                >ОПИСАНИЕ
                </a>
              </li>
              <li>
                <a
                  onClick={() => this.showTab('ХАРАКТЕРИСТИКИ')}
                  className={classnames(activeTab === 'ХАРАКТЕРИСТИКИ' && 'active')}
                >ХАРАКТЕРИСТИКИ</a>
              </li>
            </ul>
          </div>
          <div className="tab-item-content">
            <div className="tab-content">
              <div className={classnames('tab-pane', activeTab === 'ДРУГИЕ ЦВЕТА' && 'active')} id="tab-3">
                <div className="customer-review-option">
                  <h4>Также можете выбрать</h4>
                  <div className="product-list">
                    <div className="row">
                      {_.isEmpty(singleProduct.relatedProducts) ? <p>нет информации</p> :
                        singleProduct.relatedProducts.map(p => <div className="col-lg-4 col-sm-6">
                          <div className="product-item">
                            <div
                              onMouseOver={() => this.showBuyMenu(p.id)}
                              onMouseLeave={() => this.showBuyMenu(null)}
                              className="pi-pic">
                              <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`}
                                   alt={`image_${p.id}`}/>
                              <AnimateKeyframes
                                play={+showBuyMenu === +p.id}
                                duration={0.5}
                                keyframes={["opacity: 0", "opacity: 1"]}
                              >
                                {+showBuyMenu === +p.id && <ul>
                                  {p.qty > 0 && <li className="w-icon active">
                                    <a onClick={() => Utils.addCard(p.id,this.props.getCardListRequest)}>
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
                              <Link to={`/product/${p.id}`}><h5>{Utils.sliceText(p.name, 30)}</h5></Link>
                              <div className="product-price">
                                {p.price}
                                <span>{p.salePrice}</span>
                              </div>
                            </div>
                          </div>
                          <Modal
                            closeTimeoutMS={500}
                            isOpen={openModal}
                            onRequestClose={this.openModal}
                            contentLabel="Images"
                            style={modalCustomStyle}
                          >
                            <div className="sliderImagesContainer">
                              <span className="closeModal" onClick={this.openModal}>x</span>
                            </div>
                            <SlickCarousel images={singleProduct.images} product={true} arrows={true}/>
                          </Modal>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classnames('tab-pane', activeTab === 'ОПИСАНИЕ' && 'active')} id="tab-1">
                <div className="product-content">
                  <div className="row">
                    <div className="col-lg-7">
                      <div dangerouslySetInnerHTML={{__html: singleProduct.description}} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={classnames('tab-pane', activeTab === 'ХАРАКТЕРИСТИКИ' && 'active')} id="tab-2">
                <div className="specification-table">
                  <table>
                    <tbody>
                    {singleProduct?.attributes?.filter(f =>
                      f.attributeKey.toLowerCase() && f.attributeKey.toLowerCase() !== 'положение' &&
                      f.attributeKey.toLowerCase() !== 'секция комплектация').map(a => <tr>
                      <td className="p-catagory">{a.attributeKey}</td>
                      <td>
                        <div className="p-code">{a.attributeValue}</div>
                      </td>
                    </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleProduct: state.products.singleProduct,
  cardProducts: state.products.cardProducts,
});
const mapDispatchToProps = {
  singleProductsRequest,
  getCardListRequest,
  setTotalPrice,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Product));

export default Container;
