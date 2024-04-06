import { createStore, combineReducers, applyMiddleware } from "redux";
import users from "./reducers/users";
import questions from './reducers/questions' 
import thunk from 'redux-thunk';
import authUser  from "./reducers/authUser";

const rootReducer = combineReducers({
  users: users,
  questions: questions,
  authUser: authUser,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

// Exports
export { store };
