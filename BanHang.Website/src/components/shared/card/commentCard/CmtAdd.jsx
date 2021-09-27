import React from "react";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  createComment,
  getAllCommentByProductId,
} from "../../../../app/commentSlice";
import { Formik, Form, FastField } from "formik";
import InputField from "../../custom-fields/InputField/InputField";
import { Col, Container, Row, Button } from "react-bootstrap";
import { ref } from "yup";

const CommentAdd = ({ productId, load }) => {
  const ratingConfig = {
    size: 20,
    isHalf: false,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
  };
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState();
  const onSubmit = async(e) => {
    e.preventDefault();
    await dispatch(
      createComment({
        productId: productId,
        content: content,
        rate: rate
      })
    );
    await dispatch(getAllCommentByProductId(productId));
    load();
    e.target.reset();
  };

	  
							
					
				 
					
	  
								 
										 
					 
					   
							   
								  
							
		  
		
														 
														  
									   
										 
			 
	  
	 
  return (
    <div className="add-feedback">
      <form className="form-feedback" onSubmit={(e)=>onSubmit(e)}>
      <div className="form-feedback__header">
        <h6>ADD NEW FEEDBACK</h6>
        <p>
          Your email address will not be published. Required fields are marked
          <span className="text-danger">*</span>
        </p>
      </div>
      <div className="form-feedback__rating col-md-12">
        <label htmlFor="content">
          Your Rating
          <span className="text-danger">*</span>
        </label>
        <ReactStars
          classNames={"justify-content-center"}
          name="rate"
          {...ratingConfig}
          onChange={(e) => setRate(e)}
        />
      </div>
      <div className="form-feedback__cmt col-md-12 flex-column">
        <label htmlFor="content" className="d-sm-inline">
          Your review
          <span className="text-danger">*</span>
        </label>
        <textarea
          placeholder="Enter your comment"
          className="border w-100 p-2 rounded"
          name="content"
          rows={4}
          cols={100}
          onChange={(e) => setContent(e.target.value)}
        />
			
      </div>
      <div className="add-comment__btn-submit col-md-12 ">
        <button
          type="submit"
          className=" btn btn-success"
        >
          Submit
        </button>
      </div>
      </form>
	
    </div>
  );
};

export default CommentAdd;
