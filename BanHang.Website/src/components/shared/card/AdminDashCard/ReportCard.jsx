import React from 'react';

function ReportCard(props) {
  console.log(props.actQty)
  return (
    <>
      <div className="reportCard">
        <div className="reportCard__img m-r-20">
          <img src={process.env.PUBLIC_URL + props.imgUrl} alt=""/>
        </div>
        <div className="reportCard__content">
          <div className="reportCard__content-left">
            <div className="reportCard__content-title">
              <h6>{props.cardTitle}</h6>
            </div>
            <div className="reportCard__content-qty">
              <p>{props.qty}</p>
            </div>
          </div>
          {props.cardTitle === 'Total users' &&
          <div className="reportCard__content-right m-l-20">
            <div className="reportCard__content-title">
              <h6>Active</h6>
            </div>
            <div className="reportCard__content-qty">
              <p className="text-primary">{props.actQty}</p>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default ReportCard;