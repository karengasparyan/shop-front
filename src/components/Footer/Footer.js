import React, {Component} from 'react';
import {connect} from 'react-redux';
import Logo from "../Header/Logo";
import {NavLink} from "react-router-dom";
import Wrapper from "../Wrapper";

class Footer extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <footer className="footer-section">
        <div className="container-fluid guaranteeContainerColor">
          <div className="guaranteeContainer container">
            <div className="guarantee">
              <img src="https://static.tildacdn.com/tild3134-6438-4966-a439-323334663039/parcel_1.svg"/>
              <p>Доставка в любой регион России</p>
            </div>
            <div className="guarantee">
              <img src="https://static.tildacdn.com/tild6335-3933-4534-b866-333232393965/transport_1.svg"/>
              <p>Безопасная оплата банковской картой</p>
            </div>
            <div className="guarantee">
              <img src="https://static.tildacdn.com/tild3937-6630-4030-b164-356165666639/shipping-and-deliver.svg"/>
              <p>Возврат в течении 14 дней</p>
            </div>
            <div className="guarantee">
              <img src="https://static.tildacdn.com/tild3666-3730-4338-b666-643339626135/user_1.svg"/>
              <p>Гарантия на коляску 365 дней</p>
            </div>
          </div>
        </div>
        <footer className="footer-section container">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-left">
                  <div className="footer-logo">
                    <NavLink to="/">
                      <img src="/assets/img/adamex-logo1.png" alt="logo"/>
                    </NavLink>
                  </div>
                  <ul>
                    <li><a className="ContactTel" target="blank" href="https://g.page/kolyaskivrostove?share">
                      Белорусская ул., 199а, Ростов-на-Дону, Ростовская обл., Россия, 344056</a></li>
                    <li>
                      <i className="contactIcon fa fa-phone"/>
                      <a className="ContactTel" href="tel:+79996955303">8 (999) 695-53-03</a>
                    </li>
                    <li>
                      <i className="contactIcon fa fa-phone"/>
                      <a className="ContactTel" href="tel:+79054530203">8 (905) 453-02-03</a>
                    </li>
                    {/*<li>Email: hello.colorlib@gmail.com</li>*/}
                  </ul>
                  <div className="footer-social">
                    <a ><i className="fa fa-facebook"/></a>
                    <a href="https://www.instagram.com/kolyaskivrostove/"><i className="fa fa-instagram"/></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21652.376822850136!2d39.72914119556642!3d47.28410719702981!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e3b7edc5941337%3A0x3a54a19ef76ced10!2z0JzQsNCz0LDQt9C40L0g0LTQtdGC0YHQutC40YUg0LrQvtC70Y_RgdC-0LogItCa0J7Qm9Cv0KHQmtCYIDE2MSI!5e0!3m2!1sru!2s!4v1611177922043!5m2!1sru!2s"
                        width="100%" height="280" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                        tabIndex="0"/>
              </div>
            </div>
          </div>
          <div className="copyright-reserved">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="copyright-text">
                    Copyright ©
                    2021 All rights reserved | <i className="fa fa-heart-o"/> by <a
                    href="https://www.linkedin.com/in/karen-gasparyan-1b897a203/" target="_blank">Gasparyan</a>
                  </div>
                  <div className="payment-pic">
                    <img src="/assets/img/payment-method1.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </footer>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

export default Container;
