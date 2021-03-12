import React, {Component, Fragment} from 'react';
import ReactProSlider from './ReactProSlider';
import Modal from "react-modal";
import Sidebar from "../Shop/Sidebar";
import {NavLink} from "react-router-dom";
import Utils from "../../helpers/Utils";
import {MenuItem} from "react-pro-sidebar";

class MobileLeftBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.modalStyle = {
      overlay: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(0,0,0,0.0)',
      },
      content: {
        width: '60%',
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

  showMenu = () => {
    const {show} = this.state;
    this.setState({show: !show})
  };

  render() {
    const {show} = this.state;
    const {catalog} = this.props;
    return (
      <Fragment>
        <i className="contactIcon fa fa-phone"/>
        <a className="ContactTel" href="tel:+79996955303">8 (999) 695-53-03</a>
        <div onClick={this.showMenu} className="slicknav_menu">
          <span className="slicknav_btn slicknav_collapsed">
          <span className="slicknav_menutxt">MENU</span>
          <span className="slicknav_icon">
                  <span className="slicknav_icon-bar"/>
                  <span className="slicknav_icon-bar"/>
                  <span className="slicknav_icon-bar"/>
                </span>
          </span>
        </div>
        <Modal
          closeTimeoutMS={500}
          isOpen={show}
          onRequestClose={this.showMenu}
          contentLabel="leftBar"
          style={this.modalStyle}
        >
          <div>
            {catalog.map(c => <NavLink
              key={c.id}
              onClick={()=>this.changeAttribute(c.attributeValue)}
              to={`/shop?каталог=${c.attributeValue}`}>
              {Utils.upperCase(c.attributeValue)}
            </NavLink>)}
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default MobileLeftBar;
