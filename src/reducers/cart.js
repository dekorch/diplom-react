import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_OWNER_FIELD,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILURE,
  } from "../actions/actionTypes";
  
  const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    owner: { phone: "", address: "" },
    success: false,
    loading: false,
    error: null,
  };
  export default function cartReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_CART: {
        const product = action.payload.item;
        if (state.items.find((item) => item.name === product.name)) {
          const cart = state.items.map((item) => {
            if (item.id === product.id) item.count += product.count;
            return item;
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          return { ...state, cart };
        }
        localStorage.setItem("cart", JSON.stringify([...state.items, product]));
        return {
          ...state,
          items: [...state.items, product],
        };
      }
      case REMOVE_FROM_CART: {
        const items = state.items.filter(
          (item) => item.name !== action.payload.name
        );
        localStorage.setItem("cart", JSON.stringify(items));
        return {
          ...state,
          items: items,
        };
      }
      case CHANGE_OWNER_FIELD: {
        const { name, value } = action.payload;
        const { owner } = state;
        return {
          ...state,
          owner: {
            ...owner,
            [name]: value,
          },
        };
      }
      case SUBMIT_ORDER_REQUEST: {
        return {
          ...state,
          loading: true,
          error: null,
        };
      }
      case SUBMIT_ORDER_SUCCESS: {
        localStorage.clear();
        return {
          ...initialState,
          success: true,
        };
      }
      case SUBMIT_ORDER_FAILURE: {
        const { error } = action.payload;
        return {
          ...state,
          loading: false,
          error: error,
        };
      }
      default:
        return state;
    }
  }