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
import myService from './services/myService';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {closeModal} from './actions/card';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '70%',
    height: '375px',
    padding: 0,
    backgroundColor: 'rgba(151,151,151,0.0)',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(151,151,151,0.7)',
  }
};

class MyApp extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super();
  }

  render() {
    const { isOpen: modalIsOpen, data } = this.props.reducer.cardReducer;
    return (
      <Router history={browserHistory}>
        <div >
          <Header />
          <Search />
          <Filters />
          <Modal
            // className={}
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <div className="modal-trailer">
              <i className="fas fa-times" onClick={()=>this.props.closeModal()}></i>
            </div>
            {
              data.videos && data.videos.results.length > 0 ? <iframe style={{ width: '100%', height:'340px', border: 'none' }} src={myService.youtube + data.videos.results[0].key}>
              </iframe> : "No video available..."}

          </Modal>
          <Route exact path="/" component={List} />
          <Route path="/series" component={List} />
          <Route path="/favorites" component={List} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (reducer) => {
  return {
    reducer,
  }
}

const Root = connect(mapStateToProps, {
  closeModal,
})(MyApp);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);