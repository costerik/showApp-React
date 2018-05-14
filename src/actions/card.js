import * as types from '../reducers/card/const';
import myService from '../services/myService';
import * as globalTypes from '../const';

export const openModal = () => {
    return {
        type: types.OPEN_MODAL,
        payload: true,
    }
}

export const closeModal = () => {
    return {
        type: types.CLOSE_MODAL,
        payload: false,
    }
}

export const notifyError = (type, err) => {
    return {
        type,
        payload: {
            state: globalTypes.ERROR,
            message: err,
        },
    }
}

export const finishedOpenModal = (data) =>{
    return {
        type: types.FINISHED_OPEN_MODEL,
        payload: data,
    }
}

export const getTv = (data) => {
    return dispatch => {
        dispatch(openModal());
        dispatch(finishedOpenModal(data));
    }
}

export const getMovie = (id) => {
    return async dispatch => {
        dispatch(openModal());
        try {
            await myService.getMovie(id)
                .then((response) => {
                    response.json().then((data) => {
                        dispatch(finishedOpenModal(data));
                    })
                })
                .catch((err) => {
                    dispatch(notifyError(
                        types.ERROR_LOADING_DETAILS_MOVIE,
                        `there was a problem loading movie details`,
                    ));
                });
        } catch (err) {
            dispatch(notifyError(
                types.ERROR_LOADING_DETAILS_MOVIE,
                `there was a problem loading movie details `,
            ));
        }
    }
}

export const addToFavorites = () => {
    return async dispatch => {
        let res = localStorage.getItem("favorites");
        
    }
}