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

export const startedInitialLoading = () => {
    return {
        type: types.STARTED_INITIAL_LOADING,
        payload: globalTypes.LOADING,
    }
}

export const finishedInitialLoading = (photos) => {
    return {
        type: types.FINISHED_INITIAL_LOADING,
        payload: {
            state: globalTypes.SUCCESS,
            photos,
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

export const addPhoto = (photo) => {
    return async dispatch => {
        dispatch(startedAddPhoto());
        try {
            const data = await LocalStorage.get("photos");
            let photos = [];
            if (data && data.length) {
                photos = data;
            }

            if (findPhotoByID(photo.id, photos)) {
                showAlertDialog();
                dispatch(notifyError(
                    types.ERROR_DUPLICATED_PHOTO,
                    globalTypes.DUPLICATED_MSG,
                ));
            } else {
                photos = [...photos, photo];
                await LocalStorage.save("photos", photos);
                dispatch(finishedAddPhoto(photos));
            }
        } catch (ex) {
            dispatch(notifyError(
                types.ERROR_ADDING_PHOTO,
                `there was a problem adding photo ${photo}`,
            ));
        }
    }
}

export const initialLoading = () => {
    return async dispatch => {
        dispatch(startedInitialLoading());
        try {
            const data = await LocalStorage.get("photos");
            let photos = [];
            if (data && data.length) {
                photos = data;
            }
            dispatch(finishedInitialLoading(photos));
        } catch (ex) {
            dispatch(notifyError(
                types.ERROR_INITIAL_LOADING,
                `there was a problem with initial loading`,
            ));
        }
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