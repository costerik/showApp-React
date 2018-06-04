import Reactotron from 'reactotron-react-js';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
export const history = createHistory();
const appReducer = combineReducers({ ...reducers, router: routerReducer });
const middlewares = [thunk, routerMiddleware(history)];

const store = ENV === 'dev' ?
    Reactotron.createStore(
        appReducer,
        compose(applyMiddleware(...middlewares))
    ) :
    createStore(
        appReducer,
        compose(applyMiddleware(...middlewares))
    );
;

export default store;