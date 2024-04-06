import React from "react";
import { Tab } from "semantic-ui-react";
import Question from "./Question";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Questions = ({ questions, users, authUser }) => {
  const getCurrentUser = () => {
    let userId = authUser;
    if (users) {
      return users.filter((user) => user.id === userId)[0];
    }
  };

  const getAnsweredQuestion = () => {
    let currentUser = getCurrentUser();
    if (currentUser) {
      let answers = Object.keys(currentUser.answers);

      return answers
        .map(
          (id) =>
            questions.filter((question) => question.id === id)[0]
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    }
  };

  const getUnansweredQuestion = () => {
    if (getAnsweredQuestion()) {
      return questions
        .filter(function (e) {
          return this.indexOf(e) < 0;
        }, getAnsweredQuestion())
        .sort((a, b) => b.timestamp - a.timestamp);
    }
  };

  const panes = [
    {
      menuItem: "Unanswered Questions",
      render: () => (
        <Tab.Pane attached={false}>
          {questions &&
            getUnansweredQuestion().map((question) => (
              <Question question={question} key={question.id} />
            ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered Questions",
      render: () => (
        <Tab.Pane attached={false}>
          {questions &&
            getAnsweredQuestion().map((question) => (
              <Question question={question} key={question.id} />
            ))}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, tabular: true, pointing: true }}
      panes={panes}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    users: state.users.users,
    authUser: state.authUser && state.authUser.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(Questions));
