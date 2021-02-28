import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'react-pro-sidebar/dist/css/styles.css';
import {CSSTransition} from 'react-transition-group';
import PropTypes from "prop-types";
import {AnimateGroup, animations, AnimateOnChange} from 'react-animation'
import {NavLink} from "react-router-dom";
import Preloader from "../../svg/preloader.svg";
import Utils from "../../helpers/Utils";
import {getProductsRequest} from "../../store/actions/products";

class ReactProSlider extends Component {
  static propTypes = {
    showMenu: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      active: null,
    }
  }

  changeActive = id => {
    this.setState({active: id});
  };

  changeAttribute = (catalog) => {
    const query = {'каталог': catalog}
    this.props.getProductsRequest(query)
  }

  // https://stackoverflow.com/questions/55518798/how-to-add-active-class-to-clicked-item-in-reactjs

  render() {
    const {show, showMenu, catalog} = this.props;
    const {active} = this.state;

    if (!catalog) {
      return <div className="preloaderContainer"><img src={Preloader} alt="preloader"/></div>
    }

    return (
      <div className="nav-item">
        <div className="container-fluid catalogContainer">
          <div className="nav-depart"
               onMouseOver={() => showMenu('catalog')}
               onMouseLeave={() => showMenu(null)}
          >
            <div className="depart-btn">
              <i className="ti-menu"/>
              <span>КАТАЛОГ</span>
              <AnimateGroup animation="bounce">
                {show === 'catalog' && (
                  <ul className="depart-hover">
                    {catalog.map(c =>  <li key={c.id} className={+c.id === +active ? 'active' : ''}
                  onClick={() => this.changeActive(c.id)}>
                      <NavLink
                        onClick={()=>this.changeAttribute(c.attributeValue)}
                        to={`/shop?каталог=${c.attributeValue}`}>
                      {Utils.upperCase(c.attributeValue)}
                      </NavLink>
                  </li>)}
                  </ul>
                )}
              </AnimateGroup>
            </div>
          </div>
          <nav className="nav-menu mobile-menu">
            <ul>
              <li><NavLink exact to="/">ГЛАВНАЯ</NavLink></li>
              <li><NavLink to="/shop">НОВОСТИ И АКЦИИ</NavLink></li>
              <li><NavLink to="/shipping-payment">ДОСТАВКА И ОПЛАТА</NavLink></li>
              <li><NavLink to="/guarantee">ГАРАНТИЯ</NavLink></li>
              <li onMouseOver={() => showMenu('inTheShop')}>
                <NavLink to="/contacts">О МАГАЗИНЕ</NavLink>
                {/*<div onMouseLeave={() =>  showMenu(null)}>*/}
                {/*  <AnimateGroup animation="bounce">*/}
                {/*  {show === 'inTheShop' && <ul className="dropdowns">*/}
                {/*    <li className={13 === active ? 'active' : ''}*/}
                {/*        onClick={()=>this.changeActive(13)}><NavLink to="/contacts">КОНТАКТЫ</NavLink></li>*/}
                {/*    <li className={14 === active ? 'active' : ''}*/}
                {/*        onClick={()=>this.changeActive(14)}><NavLink to="/">САМОВЫВОЗ</NavLink></li>*/}
                {/*  </ul>}*/}
                {/*  </AnimateGroup>*/}
                {/*</div>*/}
              </li>
            </ul>
          </nav>
        </div>
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
)(ReactProSlider);

export default Container;
