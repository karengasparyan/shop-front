import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import {CSSTransition} from 'react-transition-group';
import PropTypes from "prop-types";
import {getProductsRequest, getSidebarTitlesRequest} from "../../store/actions/products";
import Preloader from "../../svg/preloader2.svg"
import {AnimateGroup} from "react-animation";
import _ from "lodash";
import memoizeOne from "memoize-one";
import {withRouter} from "react-router-dom";
import queryString from 'query-string';
import Utils from "../../helpers/Utils";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
      initProducts: [],
      attributes: [],
    }
    this.searchListRef = React.createRef();
  }

  componentDidMount() {
    let query = queryString.parse(window.location.search, { arrayFormat: 'comma' });
    if (query) {
      this.setState({ search: query.s })
      this.props.getProductsRequest(query);
    } else {
      this.props.getProductsRequest();
    }
    this.props.getSidebarTitlesRequest();
  }

  initProducts = memoizeOne((products, path) => {
    let {initProducts} = this.state;
    if (products && path !== '/shop') {
      initProducts = [...products, ...initProducts]
      initProducts = _.uniqBy(initProducts, 'id');
      this.setState({ initProducts })
    }
    this.setState({ initProducts: products })
  }, _.isEqual)

  onChangeSearch = (ev) => {
    const {value} = ev.target;
    const {history} = this.props;

    let query = queryString.parse(window.location.search);

    if (value === '') {
      this.setState({initProducts: [], page: 1})
    }

    if (query) {
      query.s = value;
      delete query.page;
      delete query.price;
      history.replace(`?${queryString.stringify(query)}`);
      this.setState({search: query.s});
    }
    this.props.getProductsRequest(query);
  }

  changeRequest = () => {
    const {current} = this.searchListRef
    let {search, page} = this.state
    const {productCount, history} = this.props
    let query = queryString.parse(window.location.search);

    if (current?.offsetHeight + current?.scrollTop >= current?.scrollHeight - 100) {
      if (+page < +productCount) {
        page++;
        this.setState({page})

        query.s = search;

        history.replace(`?${queryString.stringify(query)}`)
        this.props.getProductsRequest(query)
      }
    }
  }

  changeProduct = (id) => {
    this.props.history.push(`/product/${id}`)
  }

  render() {
    const {products, productsRequestStatus, match: {path}} = this.props;
    let {search, initProducts} = this.state;
    let query = queryString.parse(window.location.search);
    this.initProducts(products, path)
    if (!products) {
      return <img src={Preloader} width="40px" height="40px"/>;
    }

    return (
      <div className="col-lg-5 col-md-7 searchContainer">
        <div className="advanced-search">
          {/*<div className="category-btn">КАТЕГОРИИ</div>*/}
          <div className="input-group">
            <input
              type="text"
              placeholder="Что вам нужно?"
              value={query.s}
              onChange={this.onChangeSearch}
            />
            {/*<button type="button"><i className="ti-search"/></button>*/}
          </div>
        </div>
        <AnimateGroup durationIn={200} animation="bounce">
          {search !== '' && search && path !== '/shop' &&
          <ul onScroll={this.changeRequest} ref={this.searchListRef} className="searchLists">
            <AnimateGroup durationIn={200} animation="bounce">
              {_.isEmpty(products) ? <p>Поиск не дал результатов</p> :
                initProducts.map(p => <li onClick={() => this.changeProduct(p.id)} key={p.id}>
                <span>{p.name}</span>
                <span>{p.attributes.map(a => <Fragment key={a.key}>
                  <span>{a.attributeKey}</span>
                  <span>{a.attributeValue}</span>
                </Fragment>)}</span>
              </li>)}
              {productsRequestStatus === 'request' && <li><img src={Preloader} width="50px"/></li>}
            </AnimateGroup>
          </ul>}
        </AnimateGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  productCount: state.products.productCount,
  productsRequestStatus: state.products.productsRequestStatus,
});
const mapDispatchToProps = {
  getProductsRequest,
  getSidebarTitlesRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Search));

export default Container;
