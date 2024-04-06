import React from "react";
import { Grid } from "semantic-ui-react";

const GridContainer = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 1100 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

export default GridContainer;
