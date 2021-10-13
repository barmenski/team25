import { SET_MINUTES, SET_SECONDS } from '../actionTypes/actionTypes';

const initialState = {
  minutes: 0,
  seconds: 0
};

export const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MINUTES:
      return {
        ...state,
        minutes: action.payload
      };

    case SET_SECONDS:
      return {
        ...state,
        seconds: action.payload
      };

    default:
      return state;
  }
};
