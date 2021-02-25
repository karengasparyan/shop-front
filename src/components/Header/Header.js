import React, {Component} from 'react';
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
import {withRouter} from "react-router-dom";

class Header extends Component {

  static propTypes = {
    innerWidth: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      show: null,
    };
  }

  showMenu = (show) => {
    this.setState({show});
  }

  componentDidMount() {
    const {catalog} = this.props;
    if (_.isEmpty(catalog)){
      this.props.getCatalogListRequest()
    }
  }

  render() {
    const {show} = this.state;
    const {innerWidth, catalog} = this.props;

    return (
      <header className="header-section">
        <ContactsHeader />
        <div className="container">
          <div className="inner-header">
            <div className="row">
              <Logo />
              <Search />
              <div className="col-lg-3 text-right col-md-3">
                <Cart showMenu={this.showMenu} show={show}/>
                {innerWidth === 'showMobile' && <MobileNavBar catalog={catalog} />}
              </div>
            </div>
          </div>
        </div>
        {innerWidth === 'showDesktop' && <DesktopNavBar showMenu={this.showMenu} show={show} catalog={catalog} />}
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
