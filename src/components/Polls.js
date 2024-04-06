import React from "react";
import { Container } from "semantic-ui-react";
import Questions from "./Questions";
import GridContainer from "./GridContainer";

const Polls = () => {
  return (
    <Container>
      <GridContainer>
        <Questions />
      </GridContainer>
    </Container>
  );
};

export default Polls;
