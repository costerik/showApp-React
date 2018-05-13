import '../ReactotronConfig';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Reactotron from 'reactotron-react-js';
import reducers from './reducers';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';
const appReducer = combineReducers({ ...reducers, });
const middleware = applyMiddleware(thunkMiddleware);
const store = Reactotron.createStore(appReducer, compose(middleware));
import './styles/app.css';
import List from './components/list/main';
import Header from './components/header/main';
import Search from './components/search/main';
import Filters from './components/filters/main';

import {loadingData} from './actions/list';
import myService from './services/myService';

export class MyApp extends React.Component {
  constructor(props) {
    super();
  }

  async componentWillMount(){
    console.log("a");
    await store.dispatch(loadingData(2016, 16));
    console.log("c");
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <div>
            <Header />
            <Search />
            <Filters />
            <Route exact path="/" component={List} />
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  <MyApp />,
  document.getElementById('root')
);