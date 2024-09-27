import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import apiReducer from './apiReducer';
import userReducer from './userReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  api: apiReducer,
  user: userReducer,
});

export default reducer;
