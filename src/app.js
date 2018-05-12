import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';
import './styles/app.css';
import List from './components/list/main';
import Header from './components/header/main';
import Search from './components/search/main';
import Filters from './components/filters/main';

export class MyApp extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Header />
          <Search />
          <Filters />
          <Route exact path="/" component={List} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <MyApp />,
  document.getElementById('root')
);