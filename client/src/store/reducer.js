import { combineReducers } from 'redux';
import adminReducer from './adminReducer';

// reducer import
import customizationReducer from './customizationReducer';
import dataReducer from './data-reducer';
import uiReducer from './uiReducer';
import apiReducer from './ApiReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    admin: adminReducer,
    user: dataReducer,
    ui: uiReducer,
    api: apiReducer
});

export default reducer;
