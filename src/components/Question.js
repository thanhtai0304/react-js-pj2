import React, { useState } from "react";
import { Segment, Button, Header, Image, Grid, Divider, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateQuestions } from "../store/actions/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { updateUsers } from "../store/actions/users";
import Quiz from "./Quiz";
import Result from "./Result";

const Question = ({
  question,
  questions,
  answered,
  quiz,
  users,
  authUser,
  updateQuestions,
  updateUsers,
  history
}) => {
  const [state, setState] = useState({
    value: "",
    disabled: quiz && true,
    isAnswered: false
  });

  const answerPoll = () => {
    const authedUser = authUser;

    _saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer: state.value
    }).then(() => {
      const updatedUsers = users.map(user =>
        user.id === authedUser
          ? { ...user, answers: { ...user.answers, [question.id]: state.value } }
          : user
      );
      updateUsers(updatedUsers);

      const updatedQuestion = {
        ...question,
        [state.value]: {
          ...question[state.value],
          votes: [...question[state.value].votes, authedUser]
        }
      };
      const updatedQuestions = questions.map(q =>
        q.id === question.id ? updatedQuestion : q
      );
      updateQuestions(updatedQuestions);

      showResults();
    });
  };

  const viewPollDetails = () => {
    history.push("/questions/" + question.id);
  };

  const showResults = () => {
    setState({ ...state, isAnswered: true });
    history.push("/questions/" + question.id);
  };

  const onChange = (e, { value }) => {
    setState({ ...state, value, disabled: false });
  };

  const getUser = id => {
    return users.find(user => user.id === id);
  };

  const getScore = () => {
    const optionOneLength = question.optionOne.votes.length;
    const optionTwoLength = question.optionTwo.votes.length;
    const total = optionOneLength + optionTwoLength;
    const percent1 = Math.round((optionOneLength * 100) / total);
    const percent2 = Math.round((optionTwoLength * 100) / total);
    const color1 = percent1 >= 50 ? "green" : "orange";
    const color2 = percent2 >= 50 ? "green" : "orange";
    return {
      total,
      optionOneLength,
      optionTwoLength,
      percent1,
      percent2,
      color1,
      color2
    };
  };

  const user = getUser(question.author);

  return (
    <Segment.Group>
      <Header
        as="h4"
        block
        attached="top"
        content={user && user.name + " created pool:"}
      />
      <Grid divided padded>
        <Grid.Row>
          <Grid.Column width={4} verticalAlign="middle">
            <Image circular size="small" src={user && user.avatarURL} />
          </Grid.Column>

          <Grid.Column width={12}>
            {answered || state.isAnswered ? (
              <Result
                question={question}
                score={getScore()}
                authUser={authUser}
              />
            ) : (
              <React.Fragment>
                <Header as="h2">Would you rather</Header>
                <Form
                  onSubmit={() => {
                    quiz ? answerPoll() : viewPollDetails();
                  }}
                >
                  {quiz ? (
                    <Quiz
                      question={question}
                      value={state.value}
                      onChange={onChange}
                    />
                  ) : (
                    <Grid.Column width={12}>
                      <Grid>
                        <Grid.Column width={16}>Option 1: {question.optionOne.text}</Grid.Column>
                      </Grid>
                      <Divider horizontal>OR</Divider>
                      <Grid>
                        <Grid.Column width={16}>Option 2: {question.optionTwo.text}</Grid.Column>
                      </Grid>
                    </Grid.Column>
                  )}
                  <Divider />
                  <Button primary fluid disabled={state.disabled}>
                    View Poll
                  </Button>
                </Form>
              </React.Fragment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment.Group>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    questions: state.questions.questions,
    authUser: state.authUser && state.authUser.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateQuestions: questions => dispatch(updateQuestions(questions)),
    updateUsers: users => dispatch(updateUsers(users))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Question));
