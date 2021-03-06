import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContactsHeader extends Component {
  render() {
    return (
      <div className="header-top">
        <div className="container">
          <div className="ht-left">
            <div className="mail-service">
              <i className="contactIcon fa ti-location-pin"/>
              <a className="ContactTel" target="blank" href="https://g.page/kolyaskivrostove?share">
                Ростовская обл., Россия, 344056</a>
            </div>
            <div className="phone-service">
              <i className="contactIcon fa fa-phone"/>
              <a className="ContactTel" href="tel:+79996955303">8 (999) 695-53-03</a>
            </div>
          </div>
          <div className="ht-right">
            <div className="top-social">
              <a><i className="contactIcon ti-facebook"/></a>
              <a href="https://www.instagram.com/kolyaskivrostove/"><i className="contactIcon ti-instagram"/></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsHeader);

export default Container;
