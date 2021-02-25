import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {singleProductsRequest} from "../store/actions/products";

import {withRouter} from "react-router-dom";

import Product from "../components/Shop/Product";
import Sidebar from "../components/Shop/Sidebar";
import Wrapper from "../components/Wrapper";
import BrandCrumb from "../components/BrandCrumb";
import RelatedProducts from "../components/Shop/RelatedProducts";

class SingleProduct extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <Wrapper>
        <BrandCrumb crumb="МАГАЗИН"/>
        <section className="product-shop spad page-details">
          <div className="container">
            <div className="row">
              <div className="shopContainer">
                <Sidebar />
                <Product />
              </div>
            </div>
          </div>
        </section>
        <RelatedProducts />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  singleProduct: state.products.singleProduct
});
const mapDispatchToProps = {
  singleProductsRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SingleProduct));

export default Container;
