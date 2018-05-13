import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { years, genres } from '../../const';
import './style.css';
import { setGenre, setYear, loadingGenres} from '../../actions/filters';
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
    

    constructor(props) {
        super(props);
        this.state = {
            years: years(),
        };
    }

    render() {
        return (
            <div className="filters">
                <p>Descubra nuevas películas y programas de televisión</p>
                <label htmlFor="year">Año</label>
                <Select
                    name="year"
                    value={this.props.year}
                    onChange={(value) => this.props.setYear(value)}
                    options={
                        this.state.years
                    } />
                <label htmlFor="genre">Genero</label>
                <Select
                    name="genre"
                    value={this.props.genre}
                    onChange={(value) => this.props.setGenre(value)}
                    options={
                        this.props.genres
                    } />
            </div>
        );
    }
}

const mapStateToProps = ({ filtersReducer }) => {
    const { year, genre, genres} = filtersReducer;
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