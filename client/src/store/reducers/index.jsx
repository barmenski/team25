import { combineReducers } from 'redux';
import { userReducer } from './registrationReducer';
import { timerReducer } from './timerReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  timer: timerReducer
});
