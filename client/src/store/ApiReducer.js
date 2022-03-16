import * as actionTypes from './ApiActions';

export const initialState = {
    response: []
};

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER:
        case actionTypes.SET_RESPONSE:
            return {
                ...state,
                response: action.response
            };
        default:
            return state;
    }
};

export default apiReducer;
