import * as types from './const';

const initialState = {
    year: null,
    genre: null,
    genres: [],
    reducerState: '',
    errorMessage: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.STARTED_LOADING_GENRES:
            return { ...state, reducerState: action.payload}
            break;
        case types.FINISHED_LOADING_GENRES:
            return {
                ...state,
                reducerState: action.payload.state,
                genres: action.payload.data
            }
            break;
        case types.SET_YEAR:
            return { ...state, year: action.payload };
            break;
        case types.SET_GENRE:
            return { ...state, genre: action.payload };
            break;
        case types.ERROR_LOADING_GENRES:
            return {
                ...state,
                reducerState: action.payload.state,
                errorMessage: action.payload.message,
            };
            break;
        default:
            return state;
            break;
    }
}