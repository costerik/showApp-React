import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Filters extends Component {
    render() {
        return (
            <div className="filters">
                <p>Descubra nuevas películas y programas de televisión</p>
                <Select />
                <Select />
            </div>
        );
    }
}

export default Filters;