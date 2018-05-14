import React, { Component } from 'react';
import { connect } from 'react-redux';
import myService from '../../services/myService';
import "./style.css";
import moment from 'moment';
import PropTypes from 'prop-types';
import { getMovie, getTv } from '../../actions/card';
import * as globalTypes from '../../const';

class Card extends Component {

    static propTypes = {
        getMovie: PropTypes.func.isRequired,
        selectedTab: PropTypes.string.isRequired,
        getTv: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
    }

    _genres(genres, ids) {
        let result = "";
        let max = 0;
        ids.forEach(id => {
            if (max < 2) {
                genres.forEach(genre => {
                    if (genre.value === id) {
                        result += genre.label + ",";
                    }
                });
                max += 1;
            }
        });
        return result.slice(0, result.length - 1);
    }

    async _getTrailer(id) {
        switch (this.props.selectedTab) {
            case globalTypes.MOVIES:
                await this.props.getMovie(id);
                break;
            case globalTypes.SERIES:
                this.props.getTv(this.props.data);
                break;
            case globalTypes.FAVORITES:
                break;
        }
    }

    render() {
        const validationDate = this.props.data.release_date && this.props.data.release_date.toString()
            || this.props.data.first_air_date && this.props.data.first_air_date.toString()
        const date = moment(validationDate).format("MMM Do YYYY");

        return (
            <div className="card">
                <img src={myService.imagesUrl + this.props.data.poster_path} />
                <div className="card-right">
                    <div className="card-right__content">
                        <div className="card-right__first">
                            <p className="title">{this.props.data.title || this.props.data.name}</p>
                            <p className="average">{this.props.data.vote_average}</p>
                        </div>
                        <ul>
                            <li>{date}</li>
                            <li>{this._genres(this.props.genres, this.props.data.genre_ids || this.props.data.genres.map(g => g.id))}</li>
                        </ul>
                        <p className="overview">{this.props.data.overview}</p>
                        <div className="card-right__bottom">
                            <p className="show-trailer" onClick={() => this._getTrailer(this.props.data.id)}>
                                Ver Trailer
                            </p>
                            <p className="favorites-link" onClick={() => console.log("click")}>
                                Agregar a favoritos
                            <i className="fas fa-heart"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const stateMapToProps = ({ headerReducer }) => {
    const { selectedTab } = headerReducer;
    return {
        selectedTab,
    }
}

export default connect(stateMapToProps, {
    getMovie,
    getTv,
})(Card);