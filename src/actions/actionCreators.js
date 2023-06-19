import {
    TOPSALES_REQUEST,
    TOPSALES_SUCCESS,
    TOPSALES_FAILURE,
    CATEGORIES_SUCCESS,
    CATEGORIES_REQUEST,
    CATEGORIES_FAILURE,
    CATALOG_SUCCESS,
    CATALOG_REQUEST,
    CATALOG_FAILURE,
    LOAD_MORE_REQUEST,
    LOAD_MORE_SUCCESS,
    LOAD_MORE_FAILURE,
    CATALOGITEM_SUCCESS,
    CATALOGITEM_REQUEST,
    CATALOGITEM_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_OWNER_FIELD,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILURE,
    CHANGE_CATEGORIE,
    CHANGE_SEARCH_FIELD,
  } from "./actionTypes";
  
  export const topSalesRequest = () => ({
    type: TOPSALES_REQUEST,
  });
  
  export const topSalesFailure = (error) => ({
    type: TOPSALES_FAILURE,
    payload: {
      error,
    },
  });
  
  export const topSalesSuccess = (items) => ({
    type: TOPSALES_SUCCESS,
    payload: {
      items,
    },
  });
  
  export const categoriesRequest = () => ({
    type: CATEGORIES_REQUEST,
  });
  
  export const categoriesFailure = (error) => ({
    type: CATEGORIES_FAILURE,
    payload: {
      error,
    },
  });
  
  export const categoriesSuccess = (items) => ({
    type: CATEGORIES_SUCCESS,
    payload: {
      items,
    },
  });
  
  export const catalogRequest = () => ({
    type: CATALOG_REQUEST,
  });
  
  export const catalogFailure = (error) => ({
    type: CATALOG_FAILURE,
    payload: {
      error,
    },
  });
  
  export const catalogSuccess = (items) => ({
    type: CATALOG_SUCCESS,
    payload: {
      items,
    },
  });
  
  export const loadMoreRequest = () => ({
    type: LOAD_MORE_REQUEST,
  });
  
  export const loadMoreFailure = (error) => ({
    type: LOAD_MORE_FAILURE,
    payload: {
      error,
    },
  });
  
  export const loadMoreSuccess = (items) => ({
    type: LOAD_MORE_SUCCESS,
    payload: {
      items,
    },
  });
  
  export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: {
      item,
    },
  });
  
  export const removeFromCart = (name) => ({
    type: REMOVE_FROM_CART,
    payload: {
      name,
    },
  });
  
  export const changeOwnerField = (name, value) => ({
    type: CHANGE_OWNER_FIELD,
    payload: {
      name,
      value,
    },
  });
  
  export const changeCategories = (id) => ({
    type: CHANGE_CATEGORIE,
    payload: {
      id,
    },
  });
  
  export const changeSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: {
      text,
    },
  });
  
  export const catalogItemRequest = () => ({
    type: CATALOGITEM_REQUEST,
  });
  
  export const catalogItemFailure = (error) => ({
    type: CATALOGITEM_FAILURE,
    payload: {
      error,
    },
  });
  
  export const catalogItemSuccess = (item) => ({
    type: CATALOGITEM_SUCCESS,
    payload: {
      item,
    },
  });
  
  export const submitOrderRequest = () => ({
    type: SUBMIT_ORDER_REQUEST,
  });
  
  export const submitOrderFailure = (error) => ({
    type: SUBMIT_ORDER_FAILURE,
    payload: {
      error,
    },
  });
  
  export const submitOrderSuccess = () => ({
    type: SUBMIT_ORDER_SUCCESS,
  });
  
  export const fetchTopSales = () => async (dispatch) => {
    dispatch(topSalesRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}top-sales`, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(topSalesSuccess(data));
    } catch (e) {
      dispatch(topSalesFailure(e.message));
    }
  };
  
  export const fetchCategories = () => async (dispatch) => {
    dispatch(categoriesRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}categories`, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(categoriesSuccess(data));
    } catch (e) {
      dispatch(categoriesFailure(e.message));
    }
  };
  
  export const fetchCatalog = () => async (dispatch, getState) => {
    const { searchText, categorie } = getState().catalog;
    const params = new URLSearchParams();
    searchText && params.set("q", searchText);
    categorie && params.set("categoryId", categorie);
  
    dispatch(catalogRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}items?${params}`,
        {
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(catalogSuccess(data));
    } catch (e) {
      dispatch(catalogFailure(e.message));
    }
  };
  
  export const fetchLoadMore = () => async (dispatch, getState) => {
    const { items, searchText, categorie } = getState().catalog;
    const params = new URLSearchParams();
    searchText && params.set("q", searchText);
    categorie && params.set("categoryId", categorie);
    params.set("offset", items.length);
  
    dispatch(loadMoreRequest());
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}items?${params}`,
        {
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(loadMoreSuccess(data));
    } catch (e) {
      dispatch(loadMoreFailure(e.message));
    }
  };
  
  export const fetchCatalogItem = (id) => async (dispatch) => {
    dispatch(catalogItemRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}items/${id}`, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(catalogItemSuccess(data));
    } catch (e) {
      dispatch(catalogItemFailure(e.message));
    }
  };
  
  export const fetchSubmitOrder = () => async (dispatch, getState) => {
    const { items, owner } = getState().cart;
  
    const products = [];
    items.forEach((item) => {
      products.push({
        id: item.id,
        price: item.price,
        count: item.count,
      });
    });
  
    const body = {
      owner: {
        phone: owner.phone,
        address: owner.address,
      },
      items: products,
    };
  
    dispatch(submitOrderRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      dispatch(submitOrderSuccess());
    } catch (e) {
      dispatch(submitOrderFailure(e.message));
    }
  };