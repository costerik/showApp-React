import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { years, genres } from '../../const';
import './style.css';
import { setGenre, setYear, loadingGenres } from '../../actions/filters';
import PropTypes from 'prop-types';

class Filters extends Component {
    static propTypes = {
        setGenre: PropTypes.func.isRequired,
        setYear: PropTypes.func.isRequired,
        loadingGenres: PropTypes.func.isRequired,
        genres: PropTypes.array,
    }

    async componentWillMount() {
        await this.props.loadingGenres();
    }

    async _setYear(value) {
        await this.props.setYear(value);
    }

    constructor(props) {
        super(props);
        this.state = {
            years: years(),
        };
        this._setYear = this._setYear.bind(this);
    }

    render() {
        return (
            <div className="filters wrapper">
                <p>Descubra nuevas películas y programas de televisión</p>
                <div className="wrapper-select">
                    <div className="filter-select">
                        <label htmlFor="year">Año</label>
                        <Select
                            className="filter-select__select"
                            name="year"
                            value={this.props.year}
                            onChange={this._setYear}
                            options={
                                this.state.years
                            } />
                    </div>
                    <div className="filter-select">
                        <label htmlFor="genre">Genero</label>
                        <Select
                            className="filter-select__select"
                            name="genre"
                            value={this.props.genre}
                            onChange={(value) => this.props.setGenre(value)}
                            options={
                                this.props.genres
                            } />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ filtersReducer }) => {
    const { year, genre, genres } = filtersReducer;
    return {
        year,
        genre,
        genres,
    }
}
export default connect(mapStateToProps, {
    setYear,
    setGenre,
    loadingGenres,
})(Filters);