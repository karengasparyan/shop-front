import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { CSSTransition } from 'react-transition-group';
import PropTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";

class ReactProSlider extends Component {

    static propTypes = {
      show: PropTypes.bool.isRequired,
    }

  render() {
    const { show } = this.props;
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
              <MenuItem><NavLink to="/">КОНТАКТЫ</NavLink></MenuItem>
              <MenuItem><NavLink to="/">САМОВЫВОЗ</NavLink></MenuItem>
            </SubMenu>
            <MenuItem><NavLink to="/">ДОСТАВКА И ОПЛАТА</NavLink></MenuItem>
            <MenuItem><NavLink to="/">ГАРАНТИЯ</NavLink></MenuItem>
            <MenuItem><NavLink to="/contacts">О МАГАЗИНЕ</NavLink></MenuItem>
          </Menu>
        </ProSidebar>
      </CSSTransition>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactProSlider);

export default Container;
