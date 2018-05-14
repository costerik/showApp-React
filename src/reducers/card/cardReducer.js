import * as types from './const';

const initialState = {
    data: {},
    isOpen: false,
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
        case types.ERROR_LOADING_DETAILS_MOVIE:
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