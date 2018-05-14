import * as types from './const';

const initialState = {
    selectedTab: "Movies",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_TAB:
            return { ...state, selectedTab: action.payload };
            break;
        default:
            return state;
            break;
    }
}