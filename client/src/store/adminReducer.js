import * as actionsTypes from './adminActions';

export const initialState = {
    adminInfo: {},
    adminLog: {},
    isLog: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADMIN_LOG:
            return {
                ...state,
                adminLog: action.info
            };
        case actionsTypes.SET_ADMIN:
            return {
                ...state,
                adminInfo: action.info,
                isLog: action.success
            };
        default:
            return state;
    }
};

export default adminReducer;
