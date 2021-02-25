import { takeLatest, call, put } from 'redux-saga/effects';
import Api from '../../Api';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ATTRIBUTES_FAIL,
  GET_ATTRIBUTES_REQUEST,
  GET_ATTRIBUTES_SUCCESS,
  GET_CARD_LIST_FAIL,
  GET_CARD_LIST_REQUEST,
  GET_CARD_LIST_SUCCESS, GET_CATALOG_LIST_FAIL,
  GET_CATALOG_LIST_REQUEST,
  GET_CATALOG_LIST_SUCCESS,
  GET_EQUIPMENT_FAIL,
  GET_EQUIPMENT_REQUEST,
  GET_EQUIPMENT_SUCCESS,
  GET_FILTER_LIST_FAIL,
  GET_FILTER_LIST_REQUEST,
  GET_FILTER_LIST_SUCCESS,
  GET_IMAGE_SLIDER_FAIL,
  GET_IMAGE_SLIDER_REQUEST,
  GET_IMAGE_SLIDER_SUCCESS,
  GET_NEW_FAIL,
  GET_NEW_REQUEST,
  GET_NEW_SUCCESS,
  GET_PRICE_MIN_MAX_FAIL,
  GET_PRICE_MIN_MAX_REQUEST,
  GET_PRICE_MIN_MAX_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_SALE_FAIL,
  GET_SALE_REQUEST,
  GET_SALE_SUCCESS,
  GET_SIDEBAR_TITLES_FAIL,
  GET_SIDEBAR_TITLES_REQUEST,
  GET_SIDEBAR_TITLES_SUCCESS,
  GET_WEEK_SALE_FAIL,
  GET_WEEK_SALE_REQUEST,
  GET_WEEK_SALE_SUCCESS,
  SINGLE_PRODUCTS_FAIL,
  SINGLE_PRODUCTS_REQUEST,
  SINGLE_PRODUCTS_SUCCESS,
} from "../actions/products";

function* getProducts(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(Api.getProducts, query);
    yield put({
      type: GET_PRODUCTS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getSaleProducts(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(Api.getSaleProducts, query);
    yield put({
      type: GET_SALE_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_SALE_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getNewProducts(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(Api.getNewProducts, query);
    yield put({
      type: GET_NEW_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_NEW_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getEquipmentProducts(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(Api.getEquipmentProducts, query);
    yield put({
      type: GET_EQUIPMENT_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_EQUIPMENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getWeekSaleProducts(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(Api.getWeekSaleProducts, query);
    yield put({
      type: GET_WEEK_SALE_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_WEEK_SALE_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* singleProduct(action) {
  try {
    const { productId } = action.payload;
    const { data } = yield call(Api.singleProduct, productId);
    yield put({
      type: SINGLE_PRODUCTS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: SINGLE_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getAttributes(action) {
  try {
    // const {} = action.payload;
    const { data } = yield call(Api.getAttributes);
    yield put({
      type: GET_ATTRIBUTES_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_ATTRIBUTES_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getFilterList(action) {
  try {
    const { attr } = action.payload;
    const { data } = yield call(Api.getFilterList, attr);
    yield put({
      type: GET_FILTER_LIST_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_FILTER_LIST_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getPriceMinMax() {
  try {
    const { data } = yield call(Api.getPriceMinMax);
    yield put({
      type: GET_PRICE_MIN_MAX_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_PRICE_MIN_MAX_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getSidebarTitles() {
  try {
    const { data } = yield call(Api.getSidebarTitles);
    yield put({
      type: GET_SIDEBAR_TITLES_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_SIDEBAR_TITLES_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getCardList(action) {
  try {
    const { cardIds } = action.payload;
    const { data } = yield call(Api.getCardList, cardIds);
    yield put({
      type: GET_CARD_LIST_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_CARD_LIST_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* createOrder(action) {
  try {
    const { requestData } = action.payload;
    const { data } = yield call(Api.createOrder, requestData);
    yield put({
      type: CREATE_ORDER_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: CREATE_ORDER_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* getImageSlider() {
  try {
    const { data } = yield call(Api.getImageSlider);
    yield put({
      type: GET_IMAGE_SLIDER_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_IMAGE_SLIDER_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getCatalogList() {
  try {
    const { data } = yield call(Api.getCatalogList);
    yield put({
      type: GET_CATALOG_LIST_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_CATALOG_LIST_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}


export default function* watcher() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProducts);
  yield takeLatest(GET_SALE_REQUEST, getSaleProducts);
  yield takeLatest(GET_NEW_REQUEST, getNewProducts);
  yield takeLatest(GET_EQUIPMENT_REQUEST, getEquipmentProducts);
  yield takeLatest(GET_WEEK_SALE_REQUEST, getWeekSaleProducts);
  yield takeLatest(SINGLE_PRODUCTS_REQUEST, singleProduct);
  yield takeLatest(GET_ATTRIBUTES_REQUEST, getAttributes);
  yield takeLatest(GET_FILTER_LIST_REQUEST, getFilterList);
  yield takeLatest(GET_PRICE_MIN_MAX_REQUEST, getPriceMinMax);
  yield takeLatest(GET_SIDEBAR_TITLES_REQUEST, getSidebarTitles);
  yield takeLatest(GET_CARD_LIST_REQUEST, getCardList);
  yield takeLatest(CREATE_ORDER_REQUEST, createOrder);
  yield takeLatest(GET_IMAGE_SLIDER_REQUEST, getImageSlider);
  yield takeLatest(GET_CATALOG_LIST_REQUEST, getCatalogList);

}
