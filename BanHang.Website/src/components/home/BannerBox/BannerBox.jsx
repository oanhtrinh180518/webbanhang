import React from 'react';
import {Link} from "react-router-dom";
import CustomButton from "../../shared/button/CustomButton";

function BannerBox(props) {
  return (
    <div className="banner__box">
      <div className="banner__box-single position-relative">
        <Link className="banner__link" to="/Product">
          <img src={props.src} alt="" className="banner__img"/>
        </Link>
        <div className="banner__content banner__content--center position-absolute">
          <h4 className="banner__title text-center mb-2">
            {props.textTop}
          </h4>
          <h1 className="banner__title banner__title-large font-weight-bold text-center mb-2">
            {props.bannerLarge}
          </h1>
          <h4 className="banner__title text-center mb-1">
            {props.textBottom}
          </h4>
        </div>
        <div className="banner__btn position-absolute">
          <CustomButton to={'/Product'} title="Buy Now" />
        </div>
      </div>
    </div>
  );
}

export default BannerBox;