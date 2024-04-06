import { UPDATE_USERS } from "../actions/users";

const users = (state = [], action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return { ...state, users: action.users };

    default:
      return state;
  }
};

export default users;
