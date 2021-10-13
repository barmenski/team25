import {
  SET_IS_MASTER,
  SET_IS_OBSERVER,
  SET_USER
} from '../actionTypes/actionTypes';

const initialState = {
  users: [],
  isObserver: false,
  isMaster: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case SET_IS_OBSERVER:
      return { ...state, isObserver: action.payload };

    case SET_IS_MASTER:
      return { ...state, isMaster: action.payload };

    default:
      return state;
  }
};
