import * as types from '../reducers/header/const';

export const changeTab = (tab) => {
    return {
        type: types.CHANGE_TAB,
        payload: tab,
    }
}