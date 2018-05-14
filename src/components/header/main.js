import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTab } from '../../actions/header';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    static propTypes = {
        changeTab: PropTypes.func.isRequired,
        selectedTab: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="wrapper">
                <h1><a href="#" >Show APP</a></h1>
                <ul>
                    <li><Link to="/"
                        className={this.props.selectedTab === "Movies" ? "hover-tabs" : null}
                        onClick={event => { this.props.changeTab(event.target.innerText) }}
                    >Movies</Link></li>
                    <li><Link to="/series"
                        className={this.props.selectedTab === "Series" ? "hover-tabs" : null}
                        onClick={event => { this.props.changeTab(event.target.innerText) }}
                    >Series</Link></li>
                    <li><Link to="/favorites"
                        className={this.props.selectedTab === "Favorites" ? "hover-tabs" : null}
                        onClick={event => { this.props.changeTab(event.target.innerText) }}
                    >Favorites</Link></li>
                </ul>
            </header>
        );
    }
}

const mapStateToProps = ({ headerReducer }) => {
    const { selectedTab } = headerReducer;
    return {
        selectedTab,
    }
}

export default connect(mapStateToProps, {
    changeTab,
})(Header);