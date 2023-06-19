import {
    TOPSALES_SUCCESS,
    TOPSALES_REQUEST,
    TOPSALES_FAILURE,
  } from "../actions/actionTypes";
  
  const initialState = {
    item: [],
    loading: false,
    error: null,
  };
  export default function topSalesReducer(state = initialState, action) {
    switch (action.type) {
      case TOPSALES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case TOPSALES_FAILURE:
        const { error } = action.payload;
        return {
          ...state,
          loading: false,
          error,
        };
      case TOPSALES_SUCCESS:
        const { items } = action.payload;
        return {
          ...state,
          items,
          loading: false,
          error: null,
        };
  
      default:
        return state;
    }
  }