import * as types from './const';

const initialState = {
    data: {},
    isOpen: false,
    reducerState: '',
    errorMessage: '',
    favorites: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_MODAL:
            return { ...state, isOpen: action.payload }
            break;
        case types.CLOSE_MODAL:
            return { ...state, isOpen: action.payload }
            break;
        case types.FINISHED_OPEN_MODEL:
            return { ...state, data: action.payload }
            break;
        case types.STARTED_ADDING_DATA:
            return { ...state, reducerState: action.payload, }
            break;
        case types.FINISHED_ADDING_DATA:
            return {
                ...state,
                reducerState: action.payload.state,
                favorites: [...action.payload.data],
            }
            break;
        case types.STARTED_LOADING_FAVORITES:
            return { ...state, reducerState: action.payload, }
            break;
        case types.FINISHED_LOADING_FAVORITES:
            return {
                ...state,
                reducerState: action.payload.state,
                favorites: [...action.payload.data],
            }
            break;
        case types.ERROR_LOADING_DETAILS_MOVIE:
        case types.ERROR_LOADING_FAVORITES:
        case types.ERROR_DUPLICATED_DATA:
            return {
                ...state,
                reducerState: action.payload.state,
                errorMessage: action.payload.message,
            }
            break;
        default:
            return state;
            break;
    }
}