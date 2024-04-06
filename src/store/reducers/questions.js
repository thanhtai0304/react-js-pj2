import { UPDATE_QUESTIONS } from "../actions/questions";

const questions = (state = [], action) => {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return { ...state, questions: action.questions };

    default:
      return state;
  }
};

export default questions;
