import React, {Component} from 'react';
import {connect} from 'react-redux';

import BrandCrumb from "../components/BrandCrumb";
import Wrapper from "../components/Wrapper";

class Contacts extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Wrapper>
        <BrandCrumb crumb="О МАГАЗИНЕ"/>
        <div className="map spad">
          <div className="container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21652.376822850136!2d39.72914119556642!3d47.28410719702981!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e3b7edc5941337%3A0x3a54a19ef76ced10!2z0JzQsNCz0LDQt9C40L0g0LTQtdGC0YHQutC40YUg0LrQvtC70Y_RgdC-0LogItCa0J7Qm9Cv0KHQmtCYIDE2MSI!5e0!3m2!1sru!2s!4v1611177922043!5m2!1sru!2s"
                width="100%" height="450" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                tabIndex="0"/>
          </div>
        </div>
        <section className="contact-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/*<div className="contact-title">*/}
                {/*  <h4>Contacts Us</h4>*/}
                {/*  <p>Contrary to popular belief, Lorem Ipsum is simply random text. It has roots in a piece of*/}
                {/*    classical Latin literature from 45 BC, maki years old.</p>*/}
                {/*</div>*/}
                <div className="contact-widget">
                  <div className="cw-item">
                    <div className="ci-icon">
                      <i className="ti-location-pin"/>
                    </div>
                    <div className="ci-text">
                      <span>Адрес:</span>
                      <p><a className="ContactTel" target="blank" href="https://g.page/kolyaskivrostove?share">
                        Белорусская ул., 199а, Ростов-на-Дону, Ростовская обл., Россия, 344056</a></p>
                    </div>
                  </div>
                  <div className="cw-item">
                    <div className="ci-icon">
                      <i className="ti-mobile"/>
                    </div>
                    <div className="ci-text">
                      <span>Телефон:</span>
                      <p>
                        <i className="contactIcon fa fa-phone"/>
                        <a className="ContactTel" href="tel:+79996955303">8 (999) 695-53-03</a>
                      </p>
                      <p>
                        <i className="contactIcon fa fa-phone"/>
                        <a className="ContactTel" href="tel:+79054530203">8 (905) 453-02-03</a>
                      </p>
                    </div>
                  </div>
                  {/*<div className="cw-item">*/}
                  {/*  <div className="ci-icon">*/}
                  {/*    <i className="ti-email"/>*/}
                  {/*  </div>*/}
                  {/*  <div className="ci-text">*/}
                  {/*    <span>Email:</span>*/}
                  {/*    <p>hellocolorlib@gmail.com</p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
              {/*<div className="col-lg-6 offset-lg-1">*/}
              {/*  <div className="contact-form">*/}
              {/*    <div className="leave-comment">*/}
              {/*      <h4>Leave A Comment</h4>*/}
              {/*      <p>Our staff will call back later and answer your questions.</p>*/}
              {/*      <form action="#" className="comment-form">*/}
              {/*        <div className="row">*/}
              {/*          <div className="col-lg-6">*/}
              {/*            <input type="text" placeholder="Your name"/>*/}
              {/*          </div>*/}
              {/*          <div className="col-lg-6">*/}
              {/*            <input type="text" placeholder="Your email"/>*/}
              {/*          </div>*/}
              {/*          <div className="col-lg-12">*/}
              {/*            <textarea placeholder="Your message"/>*/}
              {/*            <button type="submit" className="site-btn">Send message</button>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </form>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
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
)(Contacts);

export default Container;
