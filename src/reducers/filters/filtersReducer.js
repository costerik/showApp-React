import * as types from './const';

const initialState = {
    year: null,
    genre: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_YEAR:
            return { ...state, year: action.payload };
            break;
        case types.SET_GENRE:
            return { ...state, genre: action.payload};
            break;
        default:
            return state;
            break;
    }
}