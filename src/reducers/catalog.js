import {
    CATALOG_SUCCESS,
    CATALOG_REQUEST,
    CATALOG_FAILURE,
    LOAD_MORE_REQUEST,
    LOAD_MORE_FAILURE,
    LOAD_MORE_SUCCESS,
    CATEGORIES_REQUEST,
    CATEGORIES_FAILURE,
    CATEGORIES_SUCCESS,
    CHANGE_CATEGORIE,
    CHANGE_SEARCH_FIELD,
  } from "../actions/actionTypes";
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    searchText: "",
    categories: [],
    categorie: "",
    categoriesLoading: false,
    categoriesError: null,
    loadMore: true,
  };
  
  export default function catalogReducer(state = initialState, action) {
    switch (action.type) {
      case CATALOG_REQUEST:
      case LOAD_MORE_REQUEST: {
        return {
          ...state,
          loading: true,
          error: null,
        };
      }
      case CATALOG_FAILURE:
      case LOAD_MORE_FAILURE: {
        const { error } = action.payload;
        return {
          ...state,
          loading: false,
          error,
        };
      }
      case CATALOG_SUCCESS:
        const { items } = action.payload;
        return {
          ...state,
          items,
          loading: false,
          error: null,
        };
      case LOAD_MORE_SUCCESS: {
        let items = [...state.items, ...action.payload.items];
        return {
          ...state,
          items: items,
          loadMore: action.payload.items.length < 6 ? false : true,
          loading: false,
          error: null,
        };
      }
  
      case CATEGORIES_REQUEST: {
        return {
          ...state,
          categoriesLoading: true,
          categoriesError: null,
        };
      }
      case CATEGORIES_FAILURE: {
        const { error } = action.payload;
        return {
          ...state,
          categoriesLoading: false,
          categoriesError: error,
        };
      }
      case CATEGORIES_SUCCESS: {
        const { items } = action.payload;
        return {
          ...state,
          categories: items,
          categoriesLoading: false,
          categoriesError: null,
        };
      }
      case CHANGE_CATEGORIE: {
        const { id } = action.payload;
        return {
          ...state,
          loadMore: true,
          categorie: id,
        };
      }
      case CHANGE_SEARCH_FIELD: {
        const { text } = action.payload;
        return {
          ...state,
          searchText: text,
        };
      }
  
      default:
        return state;
    }
  }