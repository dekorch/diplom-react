import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import catalogReducer from "../reducers/catalog";
import catalogItemReducer from "../reducers/catalogItem";
import topSalesReducer from "../reducers/topSales";
import cartReducer from "../reducers/cart";
import thunk from "redux-thunk";


const reducer = combineReducers({
  catalog: catalogReducer,
  catalogItem: catalogItemReducer,
  cart: cartReducer,
  topSales: topSalesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk),
));

export default store;
