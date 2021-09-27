import React from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "formik";

export function InputSelect(props) {
  const { field, form, type } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control type={type} as="select" {...field} isInvalid={showError}>
          <option value={0}>Female</option>
          <option value={1}>Male</option>
          <option value={2}>Other</option>
        </Form.Control>
        <ErrorMessage
          name={name}
          component={Form.Control.Feedback}
          type={"invalid"}
        />
      </Form.Group>
    </>
  );
}

export function InputSelectActive(props) {

  const { field, form, type } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control type={type} as="select" {...field} isInvalid={showError}>
          <option value="">Choose</option>
          <option value={true}>Active</option>
          <option value={false}>UnActive</option>
        </Form.Control>
        <ErrorMessage
          name={name}
          component={Form.Control.Feedback}
          type={"invalid"}
        />
      </Form.Group>
    </>
  );
}
export function InputSelectStatus(props) {
  const { field, form, type } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control type={type} as="select" {...field} isInvalid={showError}>
          <option value="">Choose</option>
          <option value={0}>Canceled</option>
          <option value={1}>Pending</option>
          <option value={2}>Processing</option>
          <option value={3}>On Delivery</option>
          <option value={4}>Completed</option>
        </Form.Control>
        <ErrorMessage
          name={name}
          component={Form.Control.Feedback}
          type={"invalid"}
        />
      </Form.Group>
    </>
  );
}
