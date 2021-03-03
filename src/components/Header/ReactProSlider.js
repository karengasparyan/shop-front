import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { CSSTransition } from 'react-transition-group';
import PropTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";
import Utils from "../../helpers/Utils";
import {getProductsRequest} from "../../store/actions/products";

class ReactProSlider extends Component {

    static propTypes = {
      show: PropTypes.bool.isRequired,
    }

  changeAttribute = (catalog) => {
    const query = {'каталог': catalog}
    this.props.getProductsRequest(query)
  }

  render() {
    const { show, catalog } = this.props;
    return (
      <CSSTransition
        in={show}
        timeout={300}
        classNames="mobileMenu"
        unmountOnExit
      >
        <ProSidebar width="100%">
          <Menu iconShape="circle">
            <MenuItem><NavLink to="/">ГЛАВНАЯ</NavLink></MenuItem>
            <MenuItem><NavLink to="/shop">НОВОСТИ И АКЦИИ</NavLink></MenuItem>
            <SubMenu title="КАТАЛОГ">
              {catalog.map(c => <MenuItem>
                <NavLink
                  onClick={()=>this.changeAttribute(c.attributeValue)}
                  to={`/shop?каталог=${c.attributeValue}`}>
                  {Utils.upperCase(c.attributeValue)}
                </NavLink>
              </MenuItem>)}
            </SubMenu>
            <MenuItem><NavLink to="/shipping-payment">ДОСТАВКА И ОПЛАТА</NavLink></MenuItem>
            <MenuItem><NavLink to="/guarantee">ГАРАНТИЯ</NavLink></MenuItem>
            <MenuItem><NavLink to="/contacts">О МАГАЗИНЕ</NavLink></MenuItem>
          </Menu>
        </ProSidebar>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  getProductsRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactProSlider);

export default Container;
