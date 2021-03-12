import _ from 'lodash'
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
import Utils from "../../helpers/Utils";
import {INIT_PAGE, SET_TOTAL_PRICE} from "../actions/reduxSetState";

const initialState = {
  products: [],
  product: {},
  singleProduct: {},
  productsKeys: [],
  productCount: null,
  attributeKey: [],
  attributeValue: [],
  attributeFilter: [],
  price: {},
  page: 1,
  cardProducts: [],
  totalPrice: 0,
  sliderImages: [],
  saleProducts: [],
  newProducts: [],
  equipment: [],
  weekSale: [],
  catalog: [],
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      const { page = 1 } = action.payload.query;
      return {
        ...state,
        productsRequestStatus: 'request',
        paginationActivePage: page,
        products: page === 1 ? [] : state.products
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { products, productCount } = action.payload.data;
      return {
        ...state,
        productsRequestStatus: 'success',
        products: _.uniqBy([...state.products, ...products], 'id'),
        productCount,
      };
    }
    case GET_PRODUCTS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        productsRequestStatus: 'fail',
        error: message,
      };
    }

    case GET_SALE_REQUEST: {
      return {
        ...state,
        error: ''
      };
    }
    case GET_SALE_SUCCESS: {
      const { products } = action.payload.data;

      return {
        ...state,
        saleProducts: products
      };
    }
    case GET_SALE_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_NEW_REQUEST: {
      return {
        ...state,
        error: ''
      };
    }
    case GET_NEW_SUCCESS: {
      const { products } = action.payload.data;

      return {
        ...state,
        newProducts: products
      };
    }
    case GET_NEW_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_EQUIPMENT_REQUEST: {
      return {
        ...state,
        error: ''
      };
    }
    case GET_EQUIPMENT_SUCCESS: {
      const { products } = action.payload.data;

      return {
        ...state,
        equipment: products
      };
    }
    case GET_EQUIPMENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_WEEK_SALE_REQUEST: {
      return {
        ...state,
        error: ''
      };
    }
    case GET_WEEK_SALE_SUCCESS: {
      const { products } = action.payload.data;

      return {
        ...state,
        weekSale: products
      };
    }
    case GET_WEEK_SALE_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case INIT_PAGE: {
      const { page } = action.payload;
      return {
        ...state,
        page,
      };
    }
    case SET_TOTAL_PRICE: {
      const { totalPrice } = action.payload;
      return {
        ...state,
        totalPrice,
      };
    }

    case SINGLE_PRODUCTS_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case SINGLE_PRODUCTS_SUCCESS: {
      const { singleProduct } = action.payload.data;
      return {
        ...state,
        singleProduct,
      };
    }
    case SINGLE_PRODUCTS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_ATTRIBUTES_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case GET_ATTRIBUTES_SUCCESS: {
      const { attributeKey, attributeValue } = action.payload.data;
      return {
        ...state,
        attributeKey,
        attributeValue,
      };
    }
    case GET_ATTRIBUTES_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_FILTER_LIST_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case GET_FILTER_LIST_SUCCESS: {
      const { attributeFilter } = action.payload.data;
      return {
        ...state,
        attributeFilter,
      };
    }
    case GET_FILTER_LIST_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_PRICE_MIN_MAX_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case GET_PRICE_MIN_MAX_SUCCESS: {
      const { price } = action.payload.data;
      return {
        ...state,
        price,
      };
    }
    case GET_PRICE_MIN_MAX_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_SIDEBAR_TITLES_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_SIDEBAR_TITLES_SUCCESS: {
      const { sidebarTitles } = action.payload.data;
      return {
        sidebarTitles,
        test: sidebarTitles,
        ...state,
      };
    }
    case GET_SIDEBAR_TITLES_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_CARD_LIST_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case GET_CARD_LIST_SUCCESS: {
      const { cardProducts } = action.payload.data;

      return {
        ...state,
        cardProducts,
      };
    }
    case GET_CARD_LIST_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequestStatus: 'request',
        error: '',
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequestStatus: 'success',
      };
    }
    case CREATE_ORDER_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
        orderRequestStatus: 'fail',
      };
    }

    case GET_IMAGE_SLIDER_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case GET_IMAGE_SLIDER_SUCCESS: {
      const { sliderImages } = action.payload.data;
      return {
        ...state,
        sliderImages,
      };
    }
    case GET_IMAGE_SLIDER_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_CATALOG_LIST_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case GET_CATALOG_LIST_SUCCESS: {
      const { catalog } = action.payload.data;
      return {
        ...state,
        catalog,
      };
    }
    case GET_CATALOG_LIST_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    default: {
      return state;
    }
  }
}
