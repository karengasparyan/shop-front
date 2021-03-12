import axios from 'axios';
import {serialize} from 'object-to-formdata';
import Account from './helpers/Account';

const {REACT_APP_API_URL} = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    config.headers.authorization = Account.getToken();
  }
  return config;
}, (e) => Promise.reject(e));

api.interceptors.response.use((r) => r, (e) => {
  if (e.response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/admin/sign-in';
  }
  return Promise.reject(e);
});

class Api {

  static getProducts(query) {
    return api.get('/products', {
      params: query ,
    });
  }

  static getSaleProducts(query) {
    return api.get('/products', {
      params: query ,
    });
  }

  static getNewProducts(query) {
    return api.get('/products', {
      params: query ,
    });
  }

  static getEquipmentProducts(query) {
    return api.get('/products', {
      params: query ,
    });
  }

  static getWeekSaleProducts(query) {
    return api.get('/products', {
      params: query ,
    });
  }

  static singleProduct(productId) {
    return api.post('/products/single-product', {productId});
  }

  static getAttributes() {
    return api.get('/products/attributes-list')
  }

  static getFilterList(attr) {
    return api.get('/filter/list', {
      params: { attr },
    });
  }

  static getPriceMinMax() {
    return api.get('/filter/price');
  }

  static getSidebarTitles() {
    return api.get('/filter/get-sidebar-titles');
  }

  static getCardList(cardIds) {
    return api.get('/cart/list', {
      params: { cardIds },
    });
  }

  static createOrder(data) {
    return api.post('cart/create-order', data);
  }

  static getImageSlider() {
    return api.get('/products/slider-images-list');
  }

  static getCatalogList() {
    return api.get('/products/catalog-list');
  }

}

export default Api;
