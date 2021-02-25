export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export function getProductsRequest(query) {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload: { query },
  };
}

export const GET_SALE_REQUEST = 'GET_SALE_REQUEST';
export const GET_SALE_SUCCESS = 'GET_SALE_SUCCESS';
export const GET_SALE_FAIL = 'GET_SALE_FAIL';

export function getSaleRequest(query) {
  return {
    type: GET_SALE_REQUEST,
    payload: { query },
  };
}

export const GET_NEW_REQUEST = 'GET_NEW_REQUEST';
export const GET_NEW_SUCCESS = 'GET_NEW_SUCCESS';
export const GET_NEW_FAIL = 'GET_NEW_FAIL';

export function getNewRequest(query) {
  return {
    type: GET_NEW_REQUEST,
    payload: { query },
  };
}

export const GET_EQUIPMENT_REQUEST = 'GET_EQUIPMENT_REQUEST';
export const GET_EQUIPMENT_SUCCESS = 'GET_EQUIPMENT_SUCCESS';
export const GET_EQUIPMENT_FAIL = 'GET_EQUIPMENT_FAIL';

export function getEquipmentRequest(query) {
  return {
    type: GET_EQUIPMENT_REQUEST,
    payload: { query },
  };
}

export const GET_WEEK_SALE_REQUEST = 'GET_WEEK_SALE_REQUEST';
export const GET_WEEK_SALE_SUCCESS = 'GET_WEEK_SALE_SUCCESS';
export const GET_WEEK_SALE_FAIL = 'GET_WEEK_SALE_FAIL';

export function getWeekSaleRequest(query) {
  return {
    type: GET_WEEK_SALE_REQUEST,
    payload: { query },
  };
}

export const SINGLE_PRODUCTS_REQUEST = 'SINGLE_PRODUCTS_REQUEST';
export const SINGLE_PRODUCTS_SUCCESS = 'SINGLE_PRODUCTS_SUCCESS';
export const SINGLE_PRODUCTS_FAIL = 'SINGLE_PRODUCTS_FAIL';

export function singleProductsRequest(productId) {
  return {
    type: SINGLE_PRODUCTS_REQUEST,
    payload: { productId },
  };
}

export const GET_ATTRIBUTES_REQUEST = 'GET_ATTRIBUTES_REQUEST';
export const GET_ATTRIBUTES_SUCCESS = 'GET_ATTRIBUTES_SUCCESS';
export const GET_ATTRIBUTES_FAIL = 'GET_ATTRIBUTES_FAIL';

export function getAttributesRequest() {
  return {
    type: GET_ATTRIBUTES_REQUEST,
    payload: {},
  };
}

export const GET_FILTER_LIST_REQUEST = 'GET_FILTER_LIST_REQUEST';
export const GET_FILTER_LIST_SUCCESS = 'GET_FILTER_LIST_SUCCESS';
export const GET_FILTER_LIST_FAIL = 'GET_FILTER_LIST_FAIL';

export function getFilterListRequest(attr) {
  return {
    type: GET_FILTER_LIST_REQUEST,
    payload: {attr},
  };
}

export const GET_PRICE_MIN_MAX_REQUEST = 'GET_PRICE_MIN_MAX_REQUEST';
export const GET_PRICE_MIN_MAX_SUCCESS = 'GET_PRICE_MIN_MAX_SUCCESS';
export const GET_PRICE_MIN_MAX_FAIL = 'GET_PRICE_MIN_MAX_FAIL';

export function getPriceMinMaxRequest() {
  return {
    type: GET_PRICE_MIN_MAX_REQUEST,
    payload: {},
  };
}

export const GET_SIDEBAR_TITLES_REQUEST = 'GET_SIDEBAR_TITLES_REQUEST';
export const GET_SIDEBAR_TITLES_SUCCESS = 'GET_SIDEBAR_TITLES_SUCCESS';
export const GET_SIDEBAR_TITLES_FAIL = 'GET_SIDEBAR_TITLES_FAIL';

export function getSidebarTitlesRequest() {
  return {
    type: GET_SIDEBAR_TITLES_REQUEST,
    payload: {},
  };
}

export const GET_CARD_LIST_REQUEST = 'GET_CARD_LIST_REQUEST';
export const GET_CARD_LIST_SUCCESS = 'GET_CARD_LIST_SUCCESS';
export const GET_CARD_LIST_FAIL = 'GET_CARD_LIST_FAIL';

export function getCardListRequest(cardIds) {
  return {
    type: GET_CARD_LIST_REQUEST,
    payload: { cardIds },
  };
}

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

export function createOrderRequest(requestData, cb) {
  return {
    type: CREATE_ORDER_REQUEST,
    payload: { requestData, cb },
  };
}

export const GET_IMAGE_SLIDER_REQUEST = 'GET_IMAGE_SLIDER_REQUEST';
export const GET_IMAGE_SLIDER_SUCCESS = 'GET_IMAGE_SLIDER_SUCCESS';
export const GET_IMAGE_SLIDER_FAIL = 'GET_IMAGE_SLIDER_FAIL';

export function getImagesSliderRequest() {
  return {
    type: GET_IMAGE_SLIDER_REQUEST,
    payload: {}
  };
}

export const GET_CATALOG_LIST_REQUEST = 'GET_CATALOG_LIST_REQUEST';
export const GET_CATALOG_LIST_SUCCESS = 'GET_CATALOG_LIST_SUCCESS';
export const GET_CATALOG_LIST_FAIL = 'GET_CATALOG_LIST_FAIL';

export function getCatalogListRequest() {
  return {
    type: GET_CATALOG_LIST_REQUEST,
    payload: {}
  };
}
