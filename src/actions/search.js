import * as types from '../reducers/search/const';
import * as globalTypes from '../const';
import myServices from '../services/myService';
import {finishedLoadingData} from '../actions/list';

export const startedSearchData = () => {
    return {
        type: types.STARTED_SEARCH_DATA,
        payload: globalTypes.LOADING,
    }
}

export const finishedSearchData = (data) => {
    return {
        type: types.FINISHED_SEARCH_DATA,
        payload: globalTypes.SUCCESS,
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

export const searchingData = (keyword) => {
    return async dispatch => {
        dispatch(startedSearchData());
        try {
            await myServices.searchMovies(keyword)
                .then((response) => {
                    response.json().then(async (data) => {
                        await dispatch(finishedLoadingData(data));
                        console.log(data);
                        dispatch(finishedSearchData());
                    })
                })
                .catch();
        } catch (err) {
            dispatch(notifyError(
                types.ERROR_SEARCHING_DATA,
                `there was a problem loading data`,
            ));
        }
    }
}
