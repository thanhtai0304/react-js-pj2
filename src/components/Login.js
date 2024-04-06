import React, { useState } from "react";
import {
  Segment,
  Header,
  Grid,
  Image,
  Form,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { setAuthUser } from "../store/actions/authUser";
import { withRouter } from "react-router-dom";
import GridContainer from "./GridContainer";

const Login = ({ users, setAuthUser, history, location }) => {
  const [userId, setUserId] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onSubmit = (event) => {
    event.preventDefault();

    setAuthUser(userId);
    history.push(location.pathname);
  };

  const onChange = (e, { value }) => {
    setUserId(value);
    setDisabled(false);
  };

  return (
    <React.Fragment>
      <GridContainer>
        <Segment.Group>
          <Header as="h4" block attached="top" textAlign="center">
            <Header.Content>
              Animal Pools
            </Header.Content>
            <Header.Subheader>Please sign in to continue</Header.Subheader>
          </Header>
          <Grid padded textAlign="center">
            <Grid.Row>
              <Grid.Column width={16}>
                <Image src="/images/logo.png" size="medium" centered />
                <br />
                <Form onSubmit={onSubmit}>
                  <Header as="h2" color="blue">
                    Sign In
                  </Header>
                  <Form.Dropdown
                    placeholder="Select a animal"
                    fluid
                    selection
                    scrolling
                    value={userId}
                    required
                    onChange={onChange}
                    options={
                      (users &&
                        users.map((user) => ({
                          key: user.id,
                          text: user.name,
                          value: user.id,
                          image: { avatar: true, src: user.avatarURL },
                        }))) ||
                      []
                    }
                  />
                  <Form.Button
                    content="Login"
                    primary
                    fluid
                    disabled={disabled}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      </GridContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    authUser: state.authUser && state.authUser.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUser: (userId) => dispatch(setAuthUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
