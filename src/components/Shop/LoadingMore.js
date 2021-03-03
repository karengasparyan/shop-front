import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import queryString from "query-string";
import {getProductsRequest} from "../../store/actions/products";
import {withRouter} from "react-router-dom";
import {setPage} from "../../store/actions/reduxSetState";

class LoadingMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
    this.scrollBottom = React.createRef();
  }

  loadMore = (ev) => {
    ev.preventDefault();
    let {page, setPage} = this.props;
    const {productCount, history} = this.props;
    const {current} = this.scrollBottom;
    let query = queryString.parse(window.location.search);

    if (page < productCount) {
      page++;
      setPage(page);
      this.props.getProductsRequest({...query, page})
      current.scrollIntoView({block: "center", behavior: "smooth"});
      // history.push('?' + queryString.stringify({...query, page}))
    }
  }

  render() {
    const {productsRequestStatus, productCount} = this.props
    const {page} = this.props
    if (page && +page >= +productCount) {
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
  productCount: state.products.productCount,
  productsRequestStatus: state.products.productsRequestStatus,
  page: state.products.page,
});
const mapDispatchToProps = {
  getProductsRequest,
  setPage,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(LoadingMore));

export default Container;
