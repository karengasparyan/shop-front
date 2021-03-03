import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Wrapper from "../components/Wrapper";
import BrandCrumb from "../components/BrandCrumb";
import {AnimateKeyframes} from "react-simple-animate";

class Guarantee extends Component {

  render() {
    return (
      <Wrapper>
        <BrandCrumb crumb="Гарантия"/>
        <div className="container">
          <AnimateKeyframes
            play={true}
            duration={0.5}
            keyframes={["opacity: 0", "opacity: 1"]}
          >
          <h2 className="shippingAndPaymentTitle">Гарантия</h2>
          <p>Официальная гарантия изготовителей составляет 6 месяцев. В течение гарантийного срока производится
            бесплатное устранение недостатков товара, возникших по вине изготовителя.
            По всем вопросам связанным с дефектами коляски обращайтесь в наш магазин по номеру
            <a className="ContactTel" href="tel:+79996940090"> +7(999) 694-00-90</a>.
          </p>

          <p>Гарантия не распространяется в случае:</p>

          <ul className="guaranteeDescription">
            <li><p>Повреждений ткани, возникших при неаккуратной эксплуатации,</p></li>
            <li><p>Изменения цвета ткани (например, выгорание),</p></li>
            <li><p>Естественного износа деталей,</p></li>
            <li><p>Повреждений, вызванных несоблюдением инструкции по эксплуатации.</p></li>
          </ul>
            </AnimateKeyframes>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Guarantee);

export default Container;
