import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style.css';

class Search extends Component {
    render() {
        return (
            <div className="pb">
                <div className="wrapper">
                    <div className="wrapper-icon"><i className="fa fa-search"></i></div>
                    <input className="pb" type="search" placeholder="Search for a movies, series and videos" onChange={() => null}></input>
                </div>
            </div>
        );
    }
}

export default connect(null,null)(Search);