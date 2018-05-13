import * as types from '../reducers/filters/const';
import * as globalTypes from '../const';
import myServices from '../services/myService';

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
    return {
        type: types.SET_YEAR,
        payload: year,
    }
}

export const setGenre = (genre) => {
    return {
        type: types.SET_GENRE,
        payload: genre,
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

export const loadingGenres = (year, genre) => {
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
                        types.ERROR_LOADING_DATA,
                        `there was a problem loading genres`,
                    ));
                });
        } catch (ex) {
            dispatch(notifyError(
                types.ERROR_LOADING_DATA,
                `there was a problem loading genres`,
            ));
        }
    }
}