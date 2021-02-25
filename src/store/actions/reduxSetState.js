export const INIT_PRODUCTS = 'INIT_PRODUCTS';

export function initProducts (initProducts, page) {
  return {
    type: INIT_PRODUCTS,
    payload: { initProducts, page },
  };
}

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export function setTotalPrice (totalPrice) {
  return {
    type: SET_TOTAL_PRICE,
    payload: { totalPrice },
  };
}