import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Shop/Sidebar";
import Products from "../components/Shop/Products";
import BrandCrumb from "../components/BrandCrumb";
import SingleProduct from "./SingleProduct";
import LoadingMore from "../components/Shop/LoadingMore";

class Shop extends Component {

  render() {
    return (
      <Wrapper>
        <BrandCrumb crumb="МАГАЗИН"/>
        <section className="product-shop spad">
          <div className="container">
            <div className="shopContainer">
              <Sidebar />
              <Products />
            </div>
            <LoadingMore />
          </div>
        </section>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shop);

export default Container;
