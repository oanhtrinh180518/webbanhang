import React from "react";

const Textarea = (props) => {
  // const {
  //   field,
  //   form,
  //   type,
  //   label,
  //   placeholder,
  //   disabled,
  //   value,
  //   defaultValue,
  // } = props;
  const {
    field, form,
    type, label, placeholder, disabled, value, defaultValue
  } = props;
  const {name} = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <div>
      <div className="add-comment__text col-md-12 flex-column">
        <label htmlFor="content" className="d-sm-inline font-weight-bold ">
          Your review*
        </label>
        <textarea
          placeholder="Enter your comment"
          className="border w-100 p-2 rounded mt-2"
          rows={3}
          cols={100}
          {...field}

          // onChange={formik.handleChange}
          // {...formik.getFieldProps("content")}
        />
      </div>
    </div>
  );
};

export default Textarea;
