import { API_REQUEST, API_REQUEST_FAILURE, API_REQUEST_SUCCESS } from './actionTypes';

const initialState = {
  user: { loading: false, data: null, error: null },
  post: { loading: false, data: null, error: null },
  comment: { loading: false, data: null, error: null },
  portfolio: { loading: false, data: null, error: null },
  asset: { loading: false, data: null, error: null },
  trade: { loading: false, data: null, error: null },
  news: { loading: false, data: null, error: null },
  currentMarketPrices: { loading: false, data: null, error: null },
  dailyVooPrices: { loading: false, data: null, error: null },
  dailyQqqPrices: { loading: false, data: null, error: null },
  dailyBitcoinPrices: { loading: false, data: null, error: null },
};

const apiReducer = (state = initialState, action) => {
  const { type, resource, data, error } = action;

  switch (type) {
    case API_REQUEST:
      return {
        ...state,
        [resource]: { ...state[resource], loading: true, error: null, },
      };
    case API_REQUEST_SUCCESS:
      return {
        ...state,
        [resource]: { ...state[resource], loading: false, data },
      };
    case API_REQUEST_FAILURE:
      return {
        ...state,
        [resource]: { ...state[resource], loading: false, error },
      };
    default:
      return state;
  }
};

export default apiReducer;