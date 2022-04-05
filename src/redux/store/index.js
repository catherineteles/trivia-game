import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

if (window.Cypress) {
  window.store = store;
}

export default createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));
