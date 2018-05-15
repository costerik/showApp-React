import * as types from '../reducers/list/const';
import * as globalTypes from '../const';
import myServices from '../services/myService';

export const startedLoadingData = () => {
    return {
        type: types.STARTED_LOADING_DATA,
        payload: globalTypes.LOADING,
    }
}

export const finishedLoadingData = (data) => {
    return {
        type: types.FINISHED_LOADING_DATA,
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

export const getTvDetails = async (data) => {
    let results=[];
    for(let tv in data.results){
        const result = await myServices.getTv(data.results[tv].id);
        const response = await result.json();
        results.push(response);
    }
    data.results = results;
    return data;
}

export const loadingData = (year, genre) => {
    return async (dispatch, getState) => {
        dispatch(startedLoadingData());
        try {
            const { headerReducer } = getState();
            const { selectedTab } = headerReducer;
            switch (selectedTab) {
                case globalTypes.MOVIES:
                    await myServices.getDiscoverMovie({ year, with_genres: genre })
                        .then((response) => {
                            response.json().then((data) => {
                                dispatch(finishedLoadingData(data));
                            })
                        }).catch((err) => {
                            dispatch(notifyError(
                                types.ERROR_LOADING_DATA,
                                `there was a problem loading data`,
                            ));
                        });
                    break;
                case globalTypes.SERIES:
                    await myServices.getDiscoverTv({ first_air_date_year: year, with_genres: genre })
                        .then((response) => {
                            response.json().then(async (data) => {
                                const myData = await getTvDetails(data);
                                dispatch(finishedLoadingData(myData));
                            })
                        }).catch((err) => {
                            dispatch(notifyError(
                                types.ERROR_LOADING_DATA,
                                `there was a problem loading data`,
                            ));
                        });
                    break;
                case globalTypes.FAVORITES:
                    break;
            }

        } catch (ex) {
            dispatch(notifyError(
                types.ERROR_LOADING_DATA,
                `there was a problem loading data`,
            ));
        }
    }
}