import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadingData } from '../../actions/list';
import { loadingFavorites } from '../../actions/card';
import Card from '../card/main';
import * as globalTypes from '../../const';
import './style.css';

class List extends Component {

    static propTypes = {
        loadingData: PropTypes.func.isRequired,
        loadingFavorites: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        reducerState: PropTypes.string.isRequired,
        year: PropTypes.object,
        genre: PropTypes.object,
        selectedTab: PropTypes.string.isRequired,
    }

    async componentWillMount() {
        this.props.loadingFavorites();
        await this.props.loadingData(this.props.year && this.props.year.value, this.props.genre && this.props.genre.value);
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
            <div className="wrapper">
                <ul className="list">
                    {this.displayData(data, genres)}
                </ul>
            </div>

        );
    }
}

const mapStateToProps = ({ listReducer, filtersReducer, headerReducer, cardReducer }) => {
    const { data } = listReducer;
    const { genres, year, genre } = filtersReducer;
    const { selectedTab } = headerReducer;
    const { favorites } = cardReducer;
    return {
        data: selectedTab === globalTypes.FAVORITES ? { results: favorites } : data,
        reducerState: selectedTab === globalTypes.FAVORITES ? cardReducer.reducerState : listReducer.reducerState,
        genres,
        year,
        genre,
        selectedTab,
    }
}

export default connect(mapStateToProps, {
    loadingData,
    loadingFavorites,
})(List);