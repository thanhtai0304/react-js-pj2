import React from "react";
import { Form, Radio } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Quiz = ({ question, value, onChange }) => (
  <React.Fragment>
    <Form.Field>
      <Radio
        label={question.optionOne.text}
        name="radioGroup"
        value="optionOne"
        checked={value === "optionOne"}
        onChange={onChange}
      />
    </Form.Field>
    <Form.Field>
      <Radio
        label={question.optionTwo.text}
        name="radioGroup"
        value="optionTwo"
        checked={value === "optionTwo"}
        onChange={onChange}
      />
    </Form.Field>
  </React.Fragment>
);

export default Quiz;
