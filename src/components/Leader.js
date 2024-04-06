import React from "react";
import {
  Grid,
  Image,
  Segment,
  Divider,
  Header,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import GridContainer from "./GridContainer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const getUserScore = (user) => {
  let answered = Object.keys(user.answers).length;
  let created = user.questions.length;
  let score = answered + created;
  return { answered, created, score };
};

const Leader = ({ users }) => {
  const compare = (user1, user2) => {
    let score1 = getUserScore(user1).score;
    let score2 = getUserScore(user2).score;
    if (score1 < score2) {
      return 1;
    }
    if (score1 > score2) {
      return -1;
    }
    return 0;
  };

  return (
    <React.Fragment>
      {users.sort(compare).map((user) => (
        <GridContainer key={user.id}>
          <Segment.Group>
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={4} verticalAlign="middle">
                  <Image circular size="small" src={user.avatarURL} />
                </Grid.Column>

                <Grid.Column width={12}>
                  <Header as="h2">{user.name}</Header>
                  <Grid>
                    <Grid.Column width={12}>Answered questions</Grid.Column>
                    <Grid.Column width={4}>{getUserScore(user).answered}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={12}>Created questions</Grid.Column>
                    <Grid.Column width={4}>{getUserScore(user).created}</Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        </GridContainer>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, null)(withRouter(Leader));
