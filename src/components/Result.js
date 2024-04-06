import React from "react";
import { Header, Card, Icon, Progress, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Result = ({ question, score, authUser }) => (
  <React.Fragment>
    <Header as="h2">
      <Header.Content>Results</Header.Content>
      <Header.Subheader>Would you rather:</Header.Subheader>
    </Header>
    <Card fluid>
      <Card.Content>
        <Card.Header>{question.optionOne.text}</Card.Header>
        <Card.Description>
          <Progress
            percent={score.percent1}
            progress
            color={score.color1}
          />
        </Card.Description>
        {question.optionOne.votes.includes(authUser) && (
          <Label as="a" image>
            <img
              src={"/images/" + authUser + ".png"}
              alt={authUser}
            />
            Your vote
          </Label>
        )}
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {score.optionOneLength} / {score.total}
      </Card.Content>
    </Card>
    <Card fluid>
      <Card.Content>
        <Card.Header>{question.optionTwo.text}</Card.Header>
        <Card.Description>
          <Progress
            percent={score.percent2}
            progress
            color={score.color2}
          />
        </Card.Description>
        {question.optionTwo.votes.includes(authUser) && (
          <Label as="a" image>
            <img
              src={"/images/" + authUser + ".png"}
              alt={authUser}
            />
            Your vote
          </Label>
        )}
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {score.optionTwoLength} / {score.total}
      </Card.Content>
    </Card>
  </React.Fragment>
);

export default Result;
