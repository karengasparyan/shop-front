import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Shop/Sidebar";
import Products from "../components/Shop/Products";
import BrandCrumb from "../components/BrandCrumb";
import LoadingMore from "../components/Shop/LoadingMore";
import Media from "react-media";
import Modal from 'react-modal';
import filters from "../svg/filters.svg";


class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
    }
    this.modalStyle = {
      overlay: {
        width: '100%',
        height: 'auto',
        minWidth: '100%',
        overflowX: 'hidden',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 99999,
      },
      content: {
        width: '50%',
        minWidth: 300,
        height: '100%',
        top: 0,
        left: 0,
        border: '1px solid #ccc',
        background: '#ffffff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: 10,
        outline: 'none',
        padding: 20,
      }
    }
  }

  showSidebar = () => {
    const {showSidebar} = this.state;
    this.setState({showSidebar: !showSidebar})
  }

  render() {
    const {showSidebar} = this.state;
    return (
      <Wrapper>
        <BrandCrumb crumb="Магазин"/>
        <section className="product-shop spad">
          <Media query="(max-width: 767px)" render={() => (
            <img
              className="buttonFilters"
              onClick={this.showSidebar}
              title="Филтеры"
              src={filters}
            />
          )}/>
          <div className="container">
            <div className="shopContainer">
              <Products />
              <Media queries={{
                small: "(max-width: 767px)",
              }}>
                {matches => (
                  <Fragment>
                    {!matches.small && <Sidebar />}
                    {matches.small && <Fragment>
                      <Modal
                        closeTimeoutMS={500}
                        isOpen={showSidebar}
                        onRequestClose={this.showSidebar}
                        contentLabel="filters"
                        style={this.modalStyle}
                      >
                        <span className="closeModal" onClick={this.showSidebar}>x</span>
                        <Sidebar showSidebar={showSidebar}  />
                      </Modal>
                    </Fragment>
                    }
                  </Fragment>
                )}
              </Media>
            </div>
            <LoadingMore/>
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
