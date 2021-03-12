export const INIT_PAGE = 'INIT_PAGE';

export function setPage (page) {
  return {
    type: INIT_PAGE,
    payload: { page },
  };
}

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export function setTotalPrice (totalPrice) {
  return {
    type: SET_TOTAL_PRICE,
    payload: { totalPrice },
  };
}