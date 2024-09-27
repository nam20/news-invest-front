import { USER } from './actionTypes';

const initialState = {
  data: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default userReducer;