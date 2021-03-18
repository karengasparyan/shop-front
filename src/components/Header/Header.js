import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MobileNavBar from './MobileNavBar';
import DesktopNavBar from "./DesktopNavBar";
import Search from "./Search";
import Logo from "./Logo";
import Cart from "./Cart";
import ContactsHeader from "./ContactsHeader";
import _ from "lodash";
import {getCatalogListRequest} from "../../store/actions/products";
import {Link, withRouter} from "react-router-dom";
import MobileLeftBar from "./MobileLeftBar";
import Media from "react-media";
import filters from "../../svg/filters.svg";
import SlickCarousel from "../Carusel/SlickCarousel";
import {Animate} from "react-simple-animate";

class Header extends Component {

  static propTypes = {
    innerWidth: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      show: null,
      showSMobileSearch: false,
    };
  }

  showMenu = (show) => {
    this.setState({show});
  }

  showSMobileSearch = () => {
    const {showSMobileSearch} = this.state;

    this.setState({showSMobileSearch: !showSMobileSearch})

  }

  componentDidMount() {
    const {catalog} = this.props;
    if (_.isEmpty(catalog)) {
      this.props.getCatalogListRequest()
    }
  }

  render() {
    const {show, showSMobileSearch} = this.state;
    const {innerWidth, position, catalog} = this.props;

    return (
      <header style={{position, top: 0, zIndex: 99999, backgroundColor: '#ffffff'}} className="header-section">
        <ContactsHeader/>
        <div className="container">
          <div className="inner-header">

            <div className="row">
              <Media query="(max-width: 767px)" render={() => (
                <MobileLeftBar catalog={catalog}/>
              )}/>

              <Logo />

              <Media query="(max-width: 767px)" render={() => (
                  <div className="headerContainer">

                    <i onClick={this.showSMobileSearch} title="Поиск" className="mobileHeaderIcon icon_search"/>

                    <a className="ContactTel" href="tel:+79996955303">
                      <i title="8 (999) 695-53-03" className="mobileHeaderIcon fa fa-phone"/>
                    </a>

                    <Cart showMenu={this.showMenu} show={show}/>

                  </div>
              )}/>

              <div className="col-lg-5 col-md-7 searchContainer">
                <Media queries={{
                  small: "(max-width: 767px)",
                  large: "(min-width: 768px)"
                }}>
                  {matches => (
                    <Fragment>
                      {matches.small && <Animate
                        play={showSMobileSearch}
                        start={{
                          maxHeight: 0,
                          transition: "max-height 1s ease-out",
                          overflow: "hidden",
                          background: "#d5d5d5",
                        }}
                        end={{
                          maxHeight: 100,
                          transition: "max-height 0.5s ease-in",
                        }}><Search/></Animate>}
                      {matches.large && <Search/>}
                    </Fragment>
                  )}
                </Media>
              </div>
              <Media query="(min-width: 768px)" render={() => (
                <div className="col-lg-3 text-right col-md-3">
                  <ul className="nav-right">
                    <Cart showMenu={this.showMenu} show={show}/>
                  </ul>
                  {innerWidth === 'showMobile' && <MobileLeftBar catalog={catalog}/>}
                </div>
              )}/>
            </div>
          </div>
        </div>
        {innerWidth === 'showDesktop' && <DesktopNavBar showMenu={this.showMenu} show={show} catalog={catalog}/>}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  catalog: state.products.catalog,
});
const mapDispatchToProps = {
  getCatalogListRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));

export default Container;
