import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import queryString from "query-string";
import memoizeOne from "memoize-one";
import _ from "lodash";
import { initProducts } from "../../store/actions/reduxSetState";
import { getProductsRequest } from "../../store/actions/products";
import {withRouter} from "react-router-dom";
import Utils from "../../helpers/Utils";

class LoadingMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      initProducts: [],
    }
    this.scrollBottom = React.createRef();
  }


  initProducts = memoizeOne((products, page) => {
    let {initProducts, y} = this.state;
    let {history} = this.props;
    let query = queryString.parse(window.location.search);

    if (products) {
      if (query){
        delete query.price;

        if (query.s === ''){
          delete query.s;
        }

      }
      history.replace(`?${queryString.stringify(query)}`)
      initProducts = [...products, ...initProducts]
      initProducts = _.uniqBy(initProducts, 'id');
      initProducts = _.orderBy(initProducts, ['id'], ['asc']);

      this.setState({initProducts})
      this.props.initProducts(initProducts, page)
    }
  }, _.isEqual)

  loadMore = () => {
    let { page } = this.state;
    const {productCount} = this.props;
    const {current} = this.scrollBottom;
    let query = queryString.parse(window.location.search);

    current.scrollIntoView({ block: "center", behavior: "smooth" });

    if (page < productCount) {
      page++;
      this.setState({page})
      query.page = page;
      this.props.getProductsRequest(query)
    }

  }

  render() {
    const {products, productsRequestStatus, productCount} = this.props
    const {page} = this.state
    this.initProducts(products, page)
    if (+page === +productCount - 1 || +productCount === 1){
      return null
    }

    return (
      <div className="loading-more" ref={this.scrollBottom}>
        {productsRequestStatus === 'request' && <i className="icon_loading"/>}
        <a onClick={this.loadMore}>Загрузить еще</a>
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
  initProducts,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoadingMore));

export default Container;
