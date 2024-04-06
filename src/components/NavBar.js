import React from "react";
import {
  Container,
  Responsive,
  Menu,
  Image,
  Button,
  Grid,
} from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { setAuthUser } from "../store/actions/authUser";
import { connect } from "react-redux";

const NavBar = ({ users, authUser, setAuthUser }) => {
  const logout = () => {
    setAuthUser(undefined);
  };

  let user =
    users &&
    users.filter((user) => user.id === authUser)[0];

  return (
    <Container>
      <Responsive as={Menu} minWidth={650} pointing secondary>
        {authUser && (
          <Menu.Menu position="left">
            <Menu.Item name="home" as={NavLink} to="/" exact />
            <Menu.Item name="new question" as={NavLink} to="/add" />
            <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
          </Menu.Menu>
        )}
        {authUser && (
          <Menu.Menu position="right">
            <Menu.Item>
              <Image
                src={user && user.avatarURL}
                avatar
                spaced="right"
                verticalAlign="bottom"
              />
              {user && user.name}
            </Menu.Item>
            <Menu.Item>
              <Button content="Logout" negative onClick={logout} />
            </Menu.Item>
          </Menu.Menu>
        )}
      </Responsive>
      <Responsive as={React.Fragment} minWidth={375} maxWidth={650}>
        <Grid columns={2} padded="vertically">
          {authUser && (
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={user && user.avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {user && user.name}
              </Grid.Column>
              <Grid.Column verticalAlign="bottom" textAlign="right">
                <Button content="Logout" negative onClick={logout} />
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column width={16}>
              <Menu pointing secondary widths={3}>
                <Menu.Item name="home" as={NavLink} to="/" exact />
                <Menu.Item name="new question" as={NavLink} to="/add" />
                <Menu.Item
                  name="leader board"
                  as={NavLink}
                  to="/leaderboard"
                />
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
      <Responsive as={React.Fragment} maxWidth={374}>
        <Grid padded="vertically" columns={1}>
          {authUser && (
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={user && user.avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                <Button content="Logout" negative onClick={logout} />
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column>
              <Menu pointing secondary widths={3}>
                <Menu.Item name="home" as={NavLink} to="/" exact />
                <Menu.Item name="new question" as={NavLink} to="/add" />
                <Menu.Item
                  name="leader board"
                  as={NavLink}
                  to="/leaderboard"
                />
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
