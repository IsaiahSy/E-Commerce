import { combineReducers } from 'redux';
import authReducer from './auth';
import productReducer from './products';

const allReducers = combineReducers({
    authReducer,
    productReducer
});

export default allReducers;