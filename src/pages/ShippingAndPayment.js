import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Wrapper from "../components/Wrapper";
import BrandCrumb from "../components/BrandCrumb";

class ShippingAndPayment extends Component {

  render() {
    return (
      <Wrapper>
        <BrandCrumb crumb="Доставка и оплата" />
        <div className="container">
          <h2 className="shippingAndPaymentTitle">Доставка и оплата</h2>
          <Tabs>
            <TabList>
              <Tab>Доставка по Ростову и РО</Tab>
              <Tab>Доставка в регионы РФ</Tab>
              <Tab>Оплата</Tab>
              <Tab>Получение заказа</Tab>
            </TabList>

            <TabPanel>
              <p>По Ростову – бесплатно.</p>

              <p>По РО в пределах 30 км от Ростова – бесплатно.</p>

              <p>По РО дальше 30 км от Ростова – из расчета 30 руб./км (оплачивается километраж в одну сторону до вашего
                дома).</p>

              <p>Детали и точные сроки доставки Вы можете уточнить у наших сотрудников по телефону.</p>
            </TabPanel>
            <TabPanel>

              <p>Бесплатная доставка осуществляется до терминала транспортной компании ПЭК (pecom.ru).</p>

              <p>Вы можете забрать товар самостоятельно из терминала ТК ПЭК или заказать доставку до дома.
                Как правило она составляет 300-500 рублей в зависимости от региона.
              </p>

              <p>Детали и точные сроки доставки Вы можете уточнить у наших сотрудников по телефону.</p>

            </TabPanel>
            <TabPanel>
              <p>При самовывозе из розничного магазина по адресу: г. Ростов-на-Дону, ул. Белорусская 199 а
                ,10:00-20:00, наличными средствами.
              </p>

              <p>При доставке курьером:Наличный расчет, после осмотра коляски.
              </p>

              <p>При удаленном заказе : Необходимо оплатить стоимость коляски в полном размере  до
                отправки ее в транспортную компанию.
              </p>
            </TabPanel>
            <TabPanel>
              <p>При доставке по Ростову и ростовской области:</p>

              <p>Наш курьер бесплатно поднимет коляску на этаж, соберет и проведет краткий инструктаж по
                использованию и уходу за коляской.</p>

              <p>Вы осматриваете коляску и после этого оплачиваете.</p>

              <p> Курьер ответит на все Ваши вопросы о коляске на месте.</p>

            </TabPanel>
          </Tabs>
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
)(ShippingAndPayment);

export default Container;
