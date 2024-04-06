import { SET_AUTH_USER } from "../actions/authUser";

const authUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTH_USER: {
      return { ...state, user: action.user };
    }

    default:
      return state;
  }
};

export default authUser;
