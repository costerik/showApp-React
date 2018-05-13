import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadingData } from '../../actions/list';
import Card from '../card/main';
import * as globalTypes from '../../const';
import './style.css';

class List extends Component {

    static propTypes = {
        loadingData: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        reducerState: PropTypes.string.isRequired,
    }

    async componentWillMount() {
        await this.props.loadingData();
    }

    displayData(data) {

        console.log(this.props.reducerState);
        if(this.props.reducerState === globalTypes.LOADING){
            return (
                <div className="wrapper-spinner"><i className="fa fa-spinner fa-spin fa-3x"/></div>
            );
        }else{
            return Object.keys(data).length > 0 && data.results.length > 0 ? 
            data.results.map(datum => <Card key={datum.id} data={datum}/>) 
            : <p>"Sorry no movies were found related to these criterias"</p>;
        }
        // <li key={datum.id}>{datum.title}</li>
    }

    render() {
        const { data } = this.props;
        console.log('render', data);
        return (
            <ul className="list">
                {this.displayData(data)}
            </ul>
        );
    }
}

const mapStateToProps = ({ listReducer }) => {
    const { data, reducerState } = listReducer;
    return {
        data,
        reducerState,
    }
}

export default connect(mapStateToProps, {
    loadingData,
})(List);