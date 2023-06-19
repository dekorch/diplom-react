import {
    CATALOGITEM_FAILURE,
    CATALOGITEM_REQUEST,
    CATALOGITEM_SUCCESS,
  } from "../actions/actionTypes";
  
  const initialState = {
    item: {},
    loading: false,
    error: null,
  };
  export default function catalogItemReducer(state = initialState, action) {
    switch (action.type) {
      case CATALOGITEM_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CATALOGITEM_FAILURE:
        const { error } = action.payload;
        return {
          ...state,
          loading: false,
          error,
        };
      case CATALOGITEM_SUCCESS:
        const { item } = action.payload;
        return {
          item,
          loading: false,
          error: null,
        };
  
      default:
        return state;
    }
  }