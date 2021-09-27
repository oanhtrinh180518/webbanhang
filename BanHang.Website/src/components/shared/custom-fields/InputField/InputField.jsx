import React from 'react';
import {Form } from "react-bootstrap";
import PropTypes from 'prop-types'
import {ErrorMessage} from "formik";

function InputField(props) {

  const {
    field, form,
    type, label, placeholder, disabled, value, defaultValue
  } = props;
  const {name} = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <div>
      <Form.Group >
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          id={name}
          type={type}
          placeholder={placeholder}
          {...field}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}

          isInvalid={showError}
        />

        <ErrorMessage name={name} component={Form.Control.Feedback} type={'invalid'} />
      </Form.Group>
    </div>
  );
}

InputField.propTypes = {
  // formik
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  // props tu them
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

export default InputField;
