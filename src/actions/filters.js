import * as types from '../reducers/filters/const';
import * as globalTypes from '../const';
import myServices from '../services/myService';
import { loadingData } from '../actions/list';

export const startedLoadingGenres = () => {
    return {
        type: types.STARTED_LOADING_GENRES,
        payload: globalTypes.LOADING,
    }
}

export const finishedLoadingGenres = (data) => {
    return {
        type: types.FINISHED_LOADING_GENRES,
        payload: {
            state: globalTypes.SUCCESS,
            data,
        }
    }
}

export const setYear = (year) => {
    return async (dispatch, getState) => {
        dispatch({
            type: types.SET_YEAR,
            payload: year,
        });
        const { filtersReducer } = getState();
        await dispatch(loadingData(
            filtersReducer.year && filtersReducer.year.value,
            filtersReducer.genre && filtersReducer.genre.value));
    }
}

export const setGenre = (genre) => {
    return async (dispatch, getState) => {
        dispatch({
            type: types.SET_GENRE,
            payload: genre,
        });
        const { filtersReducer } = getState();
        await dispatch(loadingData(
            filtersReducer.year && filtersReducer.year.value,
            filtersReducer.genre && filtersReducer.genre.value));
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

export const loadingGenres = () => {
    return async dispatch => {
        dispatch(startedLoadingGenres());
        try {
            await myServices.getGenres()
                .then((response) => {
                    response.json().then((data) => {
                        const genres = data.genres.map(genre => {
                            return {
                                value: genre.id,
                                label: genre.name,
                            }
                        });
                        dispatch(finishedLoadingGenres(genres));
                    })
                }).catch((err) => {
                    dispatch(notifyError(
                        types.ERROR_LOADING_GENRES,
                        `there was a problem loading genres`,
                    ));
                });
        } catch (ex) {
            dispatch(notifyError(
                types.ERROR_LOADING_GENRES,
                `there was a problem loading genres`,
            ));
        }
    }
}