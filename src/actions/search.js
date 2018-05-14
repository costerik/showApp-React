import * as types from '../reducers/search/const';
import * as globalTypes from '../const';
import myServices from '../services/myService';
import { finishedLoadingData } from '../actions/list';

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
    return async (dispatch, getState) => {
        dispatch(startedSearchData());
        try {
            const { headerReducer } = getState();
            const { selectedTab } = headerReducer;
            let response, data;
            switch (selectedTab) {
                case globalTypes.MOVIES:
                    response = await myServices.searchMovies(keyword);
                    data = await response.json();
                    dispatch(finishedLoadingData(data));
                    dispatch(finishedSearchData());
                    break;
                case globalTypes.SERIES:
                    response = await myServices.searchTv(keyword);
                    data = await response.json();
                    dispatch(finishedLoadingData(data));
                    dispatch(finishedSearchData());
                    break;
                case globalTypes.FAVORITES:
                    break;
            }
        } catch (err) {
            dispatch(notifyError(
                types.ERROR_SEARCHING_DATA,
                `there was a problem loading data`,
            ));
        }
    }
}
