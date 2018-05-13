import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchingData } from '../../actions/search';
import PropTypes from 'prop-types';
import './style.css';

class Search extends Component {
    static propTypes = {
        searchingData: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this._searchData = this._searchData.bind(this);
    }

    async _searchData(e) {
        console.log(e.target.value);
        e.target.value.length > 0 ? await this.props.searchingData(e.target.value) : null;
    }

    render() {
        return (
            <div className="pb">
                <div className="wrapper">
                    <div className="wrapper-icon"><i className="fa fa-search"></i></div>
                    <input className="pb"
                        type="search"
                        placeholder="Search for a movies, series and videos"
                        onChange={this._searchData}></input>
                </div>
            </div>
        );
    }
}

export default connect(null, {
    searchingData,
})(Search);