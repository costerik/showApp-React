import React, { Component } from 'react';
import myService from '../../services/myService';
import "./style.css";
import moment from 'moment';

class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const date = moment(this.props.data.release_date.toString()).format("MMM Do YYYY");
        return (
            <div className="card">
                <img src={myService.imagesUrl + this.props.data.poster_path} />
                <div className="card-right">
                    <div className="card-right__content">
                        <div className="card-right__first">
                            <p className="title">{this.props.data.title}</p>
                            <p className="average">{this.props.data.vote_average}</p>
                        </div>
                        <ul>
                            {/* <li>{this.props.data.release_date}</li> */}
                            <li>{date}</li>
                            <li>{this.props.data.genre_ids}</li>
                        </ul>
                        <p className="overview">{this.props.data.overview}</p>
                        <div className="card-right__bottom">
                            <p className="show-trailer">
                                ver trailer
                            </p>
                            <p className="favorites-link">
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

export default Card;