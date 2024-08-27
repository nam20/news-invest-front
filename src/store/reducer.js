import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import apiReducer from './apiReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  api: apiReducer,
});

export default reducer;
