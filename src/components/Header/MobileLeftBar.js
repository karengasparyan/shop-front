import React, {Component, Fragment} from 'react';
import ReactProSlider from './ReactProSlider';
import Modal from "react-modal";
import Sidebar from "../Shop/Sidebar";
import {NavLink, withRouter} from "react-router-dom";
import Utils from "../../helpers/Utils";
import {MenuItem} from "react-pro-sidebar";
import {connect} from "react-redux";
import {getProductsRequest} from "../../store/actions/products";
import Logo from "./Logo";

class MobileLeftBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showCatalog: false,
    }
    this.modalStyle = {
      overlay: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 999999,
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
        outline: 'none',
        padding: 20,
      }
    }
  }

  showMenu = () => {
    const {show} = this.state;
    this.setState({show: !show})
  };

  changeAttribute = (catalog) => {
    const query = {'каталог': catalog}
    this.props.getProductsRequest(query)
    this.props.history.push(`/shop?каталог=${catalog}`)
    this.setState({show: false})
  }

  showCatalog = (showCatalog) => {
    this.setState({showCatalog})
  }

  render() {
    const {show, showCatalog} = this.state;
    const {catalog} = this.props;
    return (
      <div className="mobileMenu">
        {/*<div onClick={this.showMenu} className="slicknav_menu">*/}
        {/*  <span className="slicknav_btn slicknav_collapsed">*/}
        {/*  /!*<span className="slicknav_menutxt">MENU</span>*!/*/}
        {/*  <span className="slicknav_icon">*/}
        {/*          <span className="slicknav_icon-bar"/>*/}
        {/*          <span className="slicknav_icon-bar"/>*/}
        {/*          <span className="slicknav_icon-bar"/>*/}
        {/*        </span>*/}
        {/*  </span>*/}
        {/*</div>*/}
        <i onClick={this.showMenu} title="Меню" className="icon_menu"/>
        <Modal
          closeTimeoutMS={500}
          isOpen={show}
          onRequestClose={this.showMenu}
          contentLabel="leftBar"
          style={this.modalStyle}
        >
          <span className="closeModal" onClick={this.showMenu}>x</span>
          <ul className="menuContainer">
            <li><Logo style={{margin: 0, padding: 0}} /></li>
            <li
              onMouseOver={() => this.showCatalog(true)}
            >КАТАЛОГ</li>
            <ul onMouseLeave={() => this.showCatalog(false)}>
            {showCatalog && catalog.map(c => <li key={c.id}>
              <NavLink
              onClick={()=>this.changeAttribute(c.attributeValue)}
              to={`/shop?каталог=${c.attributeValue}`}
              className="menuLinks">
              {Utils.upperCase(c.attributeValue)}
            </NavLink>
            </li>)}
            </ul>
            <li><NavLink className="menuLinks" to="/shop">НОВОСТИ И АКЦИИ</NavLink></li>
            <li><NavLink className="menuLinks" to="/shipping-payment">ДОСТАВКА И ОПЛАТА</NavLink></li>
            <li><NavLink className="menuLinks" to="/guarantee">ГАРАНТИЯ</NavLink></li>
            <li><NavLink className="menuLinks" to="/contacts">О МАГАЗИНЕ</NavLink></li>
          </ul>
          <div className="menuPhone">
            <i className="contactIcon fa fa-phone"/>
            <a className="ContactTel" href="tel:+79996955303">8 (999) 695-53-03</a>
          </div>
        </Modal>
      </div>
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
)(withRouter(MobileLeftBar));

export default Container;
