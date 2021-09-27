import React from 'react';
import {Link} from 'react-router-dom'


function CategoryCard(props) {
  return (
    <div className="topCategories__card">
      <div className="__card-content">
        <Link to="#" className="__card-link">{props.categoryName}</Link>
        <span className="__card-text">{props.productQty} products</span>
      </div>
      <div className="__card-img-box">
        <Link to="#" className="__card-img-link">
          <img src={process.env.PUBLIC_URL + props.src} alt="" className="__card-img-fluid"/>
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
