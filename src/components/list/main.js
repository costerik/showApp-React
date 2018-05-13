import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
    render() {
        return (
            <ul>
                <li>
                    first
                </li>
            </ul>
        );
    }
}

export default connect(null,null)(List);