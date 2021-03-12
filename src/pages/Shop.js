import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Shop/Sidebar";
import Products from "../components/Shop/Products";
import BrandCrumb from "../components/BrandCrumb";
import LoadingMore from "../components/Shop/LoadingMore";
import Media from "react-media";
import Modal from 'react-modal';
import Preloader from "../svg/preloader.svg";


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      noRender: undefined,
    }
    this.modalStyle = {
      overlay: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(0,0,0,0.0)',
      },
      content: {
        width: '50%',
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
    const {showSidebar, noRender} = this.state;
    const {productsRequestStatus} = this.props;

    return (
      <Wrapper>
        <BrandCrumb crumb="Магазин"/>
        <section className="product-shop spad">
          <div className="container">
            <Media query="(max-width: 767px)" render={() => (
                <p className="buttonFilters"
                   onClick={this.showSidebar}
                   title="Филтеры"
                >Филтеры</p>)}/>
            <div className="shopContainer">
              <Products />
              <Media queries={{
                small: "(max-width: 767px)",
              }}>
                {matches => (
                  <Fragment>
                    {!matches.small && <Sidebar/>}
                    {matches.small && <Fragment>
                      <Modal
                        closeTimeoutMS={500}
                        isOpen={showSidebar}
                        onRequestClose={this.showSidebar}
                        contentLabel="filters"
                        style={this.modalStyle}
                      >
                        <Sidebar noRender={noRender} />
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
