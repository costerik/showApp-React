import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';

class Header extends Component {
    render() {
        return (
            <header>
                <h1><a href="#" >Show APP</a></h1>
                <ul>
                    <li><a href="#">Movies</a></li>
                    <li><a href="#">Series</a></li>
                    <li><a href="#">Favorites</a></li>
                </ul>
            </header>
        );
    }
}

const connectStateToProps = () => {
    
}

export default connect(null, null)(Header);