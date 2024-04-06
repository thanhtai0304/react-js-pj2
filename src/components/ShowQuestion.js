import React, { useEffect, useState } from "react";
import GridContainer from "./GridContainer";
import Question from "./Question";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./NotFound";

const ShowQuestion = ({ match, questions, authUser, users }) => {
  const [questionState, setQuestionState] = useState({
    question: null,
    isAnswered: false,
  });

  useEffect(() => {
    const questionId = match.params.question_id;
    const question = getQuestion(questionId);
    if (question) {
      const answered = isAnsweredQuestion(question);
      setQuestionState({ question, isAnswered: answered });
    }
  }, [match.params.question_id, questions, users]);

  const isAnsweredQuestion = (question) => {
    const user = users.find((user) => user.id === authUser);
    return user && user.answers[question.id];
  };

  const getQuestion = (questionId) => {
    return questions.find((q) => q.id === questionId) || null;
  };

  if (!questionState.question) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      <GridContainer>
        <Question
          question={questionState.question}
          answered={questionState.isAnswered}
          quiz={!questionState.isAnswered}
        />
      </GridContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  authUser: state.authUser && state.authUser.user,
  users: state.users.users,
});

export default connect(mapStateToProps, null)(withRouter(ShowQuestion));
