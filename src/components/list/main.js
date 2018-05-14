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
        year: PropTypes.object,
        genre: PropTypes.object,
    }

    async componentWillMount() {
        await this.props.loadingData(this.props.year && this.props.year.value,this.props.genre && this.props.genre.value);
    }

    displayData(data, genres) {
        if (this.props.reducerState === globalTypes.LOADING) {
            return (
                <div className="wrapper-spinner"><i className="fa fa-spinner fa-spin fa-3x" /></div>
            );
        } else {
            return Object.keys(data).length > 0 && data.results.length > 0 ?
                data.results.map(datum => <Card key={datum.id} data={datum} genres={genres} />)
                : <p>"Sorry no movies were found related to these criterias"</p>;
        }
    }

    render() {
        const { data, genres } = this.props;
        return (
            <ul className="list">
                {this.displayData(data, genres)}
            </ul>
        );
    }
}

const mapStateToProps = ({ listReducer, filtersReducer }) => {
    const { data, reducerState } = listReducer;
    const { genres, year, genre } = filtersReducer;
    return {
        data,
        reducerState,
        genres,
        year, 
        genre,
    }
}

export default connect(mapStateToProps, {
    loadingData,
})(List);