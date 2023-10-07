import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import items from './items'
import suppliers from './suppliers'
import requests from './requests'
import user from './user';
import purchase_orders from './purchase_orders';
import request_items from './request_items'
import purchase_order_items from './purchase_order_items';


const rootReducer = combineReducers({
  session, user, items, suppliers, requests, purchase_orders, request_items, purchase_order_items
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
