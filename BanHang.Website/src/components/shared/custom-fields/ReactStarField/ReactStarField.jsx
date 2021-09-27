import React from "react";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
const ReactStarField = (props) => {
  const ratingConfig = {
    size: 20,
    isHalf: false,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
  };
  const {
    field, form,
    type, label, placeholder, disabled, value, defaultValue
  } = props;
  const {name} = field;
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];
  return (
    <div>
      <div className="add-comment__star col-md-12">
        <label htmlFor="content" className="font-weight-bold">Your Rate*</label>
        <ReactStars
          classNames={"justify-content-center"}
          {...ratingConfig}
          {...field}
          // onChange={(e) => formik.setFieldValue("rate", e)}
        />
      </div>
    </div>
  );
};

export default ReactStarField;
