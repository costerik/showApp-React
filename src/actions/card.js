import * as types from '../reducers/card/const';
import myService from '../services/myService';
import * as globalTypes from '../const';
import LocalStorage from '../utils/localStorage';

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

export const startedAddData = () => {
    return {
        type: types.STARTED_ADDING_DATA,
        payload: globalTypes.LOADING,
    }
}

export const finishedAddData = (data) => {
    return {
        type: types.FINISHED_ADDING_DATA,
        payload: {
            state: globalTypes.SUCCESS,
            data,
        }
    }
}

export const startedDeleteData = () => {
    return {
        type: types.STARTED_DELETING_DATA,
        payload: globalTypes.LOADING,
    }
}

export const finishedDeleteData = (data) => {
    return {
        type: types.FINISHED_DELETING_DATA,
        payload: {
            state: globalTypes.SUCCESS,
            data,
        }
    }
}

export const startedLoadingFavorites = () => {
    return {
        type: types.STARTED_LOADING_FAVORITES,
        payload: globalTypes.LOADING,
    }
}

export const finishedLoadingFavorites = (data) => {
    return {
        type: types.FINISHED_LOADING_FAVORITES,
        payload: {
            state: globalTypes.SUCCESS,
            data,
        }
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

export const finishedOpenModal = (data) => {
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

export const addToFavorites = (favorite) => {
    return (dispatch, getState) => {
        dispatch(startedAddData());
        const data = LocalStorage.get("favorites");
        let favorites = [];
        if (data && data.length) {
            favorites = data;
        }
        
        if (findDataByID(favorite.id, favorites)) {
            dispatch(notifyError(
                types.ERROR_DUPLICATED_DATA,
                globalTypes.DUPLICATED_MSG,
            ));
        } else {
            favorites = [...favorites, favorite];
            LocalStorage.save("favorites", favorites);
            dispatch(finishedAddData(favorites));
        }
        console.log(getState().cardReducer.favorites);
    }
}

export const loadingFavorites = () => {
    return (dispatch, getState) => {
        dispatch(startedLoadingFavorites());
        try {
            const data = LocalStorage.get("favorites");
            let favorites = [];
            if (data && data.length) {
                favorites = data;
            }
            dispatch(finishedLoadingFavorites(favorites));
            console.log(getState().cardReducer.favorites);
        } catch (ex) {
            dispatch(notifyError(
                types.ERROR_LOADING_FAVORITES,
                `there was a problem with loading favorites`,
            ));
        }
    }
}

export const findDataByID = (dataID, data) => {
    const res = data.find(datum => datum.id == dataID);
    return res ? true : false;
}