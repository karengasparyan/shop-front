import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {getCardListRequest, getProductsRequest, singleProductsRequest} from "../../store/actions/products";
import Preloader from "../../svg/preloader.svg";
import _ from "lodash";
import memoizeOne from "memoize-one";
import Utils from "../../helpers/Utils";
import {AnimateKeyframes} from "react-simple-animate";

class RelatedProducts extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {
      showBuyMenu: null,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.singleProductsRequest(id)
    }
  }

  showBuyMenu = (showBuyMenu) => {
    this.setState({showBuyMenu})
  }

  initSingleProduct = memoizeOne((id) => {
    if (id) {
      window.scrollTo(0, 0)
      this.props.singleProductsRequest(id)
    }
  }, _.isEqual)

  initProduct = memoizeOne((singleProduct) => {
    if (singleProduct) {
      const query = {s: singleProduct.name}
      this.props.getProductsRequest(query)
    }
  }, _.isEqual)

  render() {
    const {singleProduct, products, match: {params}} = this.props;
    const {showBuyMenu} = this.state;

    if (!singleProduct) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    this.initSingleProduct(params.id);

    this.initProduct(singleProduct);

    const direction = process.env.REACT_APP_API_URL;

    return (
      <div className="related-products spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Похожие</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {_.isEmpty(products) ? <p>Нет результатов</p> : products.map(p => <div
              className="col-lg-3 col-sm-6">
              <div className="product-item">
                <div
                  onMouseOver={() => this.showBuyMenu(p.id)}
                  onMouseLeave={() => this.showBuyMenu(null)}
                  className="pi-pic">
                  <img src={`${direction}/productImage/${p.id}/${p?.images[0]?.path}`} alt={`image_${p.id}`}/>
                  <AnimateKeyframes
                    play={+showBuyMenu === +p.id}
                    duration={1}
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
                  {p.attributes.filter(a => a.attributeKey !== 'status' && a.attributeKey !== 'seo').map(a =>
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
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleProduct: state.products.singleProduct,
  products: state.products.products
});
const mapDispatchToProps = {
  singleProductsRequest,
  getProductsRequest,
  getCardListRequest
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(RelatedProducts));

export default Container;
