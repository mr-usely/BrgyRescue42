import * as actionTypes from './uiActions';

const initialState = {
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING_ON:
        case actionTypes.SET_LOADING_OFF:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};
