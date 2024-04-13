import React, { useState } from "react";
import {
  Segment,
  Header,
  Grid,
  Form,
  Input,
  Divider,
  Button,
} from "semantic-ui-react";
import GridContainer from "./GridContainer";
import { updateQuestions } from "../store/actions/questions";
import { connect } from "react-redux";
import { _saveQuestion } from "../utils/_DATA";
import { withRouter } from "react-router-dom";
import { updateUsers } from "../store/actions/users";

const New = ({ authUser, questions, users, updateQuestions, updateUsers, history }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const addNewQuestion = (e) => {
    e.preventDefault();
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authUser,
    };
    _saveQuestion(question).then((formattedQuestion) => {
      const updatedQuestions = [...questions, formattedQuestion];

      const updatedUsers = users.map((user) =>
        user.id === authUser
          ? { ...user, questions: [...user.questions, formattedQuestion.id] }
          : user
      );

      updateUsers(updatedUsers);
      updateQuestions(updatedQuestions);
    });

    history.push("/");
  };

  const onChangeText1 = (e) => {
    setOptionOne(e.target.value);
  };

  const onChangeText2 = (e) => {
    setOptionTwo(e.target.value);
  };

  return (
    <React.Fragment>
      <GridContainer>
        <Segment.Group>
          <Header as="h3" block attached="top" textAlign="center">
            <Header.Content>Create Your Own Pool</Header.Content>
          </Header>
          <Grid padded>
            <Grid.Column width={16}>
              <Divider horizontal>First Option</Divider>
              <Form onSubmit={addNewQuestion}>
                <Input
                  fluid
                  required
                  placeholder="Option 1"
                  value={optionOne}
                  onChange={onChangeText1}
                  data-testid="first-option"
                />
                <Divider horizontal>Second Option</Divider>
                <Input
                  fluid
                  required
                  placeholder="Option 2"
                  value={optionTwo}
                  onChange={onChangeText2}
                  data-testid="second-option"
                />
                <br />
                <Button primary fluid>
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment.Group>
      </GridContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser && state.authUser.user,
    questions: state.questions.questions,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestions: (questions) => dispatch(updateQuestions(questions)),
    updateUsers: (users) => dispatch(updateUsers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(New));
