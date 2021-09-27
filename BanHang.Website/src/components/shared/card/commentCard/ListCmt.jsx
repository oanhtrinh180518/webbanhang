import React from "react";
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const ListCommentCard = ({ fullName, rate, content, imgUrl }) => {
  const ratingConfig = {
    size: 16,
    isHalf: true,
    emptyIcon: <FaRegStar />,
    halfIcon: <FaStarHalfAlt />,
    filledIcon: <FaStar />,
    edit: false

  };
  const fristUser = fullName.substr(0, 1);
  return (
    <div className="list-comment d-flex">
      <div className="c-avatar rounded-circle mr-4">
        {/* <img
          className="c-img--img rounded"
          src={process.env.PUBLIC_URL + imgUrl}
          alt="#"
        /> */}
        <p className="c-avatar--text text-center">{fristUser}</p>
      </div>
      <div className="c-content">
        <div className="c-content__user-name">
          <h5>{fullName}</h5>
        </div>
        <div className="c-content__rate ">
          <ReactStars
            {...ratingConfig}
            value={rate}
          />
        </div>
        <div className="c-content__comment m-t-10">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ListCommentCard;
