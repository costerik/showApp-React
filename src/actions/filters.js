import * as types from '../reducers/filters/const';

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