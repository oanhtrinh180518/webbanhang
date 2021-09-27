import React from 'react';
import {BtnContinuedShopping} from "../../components/shared/button/CardBtn";
import {Container} from "react-bootstrap";

function CartEmpty(props) {
  return (
    <>
      <Container>
        <div className="card-empty d-flex justify-content-center m-t-50 m-b-100">
          {/*<div className="checkOut__img">*/}
          {/*  <img src={process.env.PUBLIC_URL + '/img/checkOut/thanks.png'} alt=""/>*/}
          {/*</div>*/}
          <div className="card-empty__body text-center mx-auto">
            <div className={'card-empty__header m-b-40'}>
              <img src={process.env.PUBLIC_URL + '/img/icon/flatIcon/empty-cart_256-2.png'} alt=""/>
            </div>
            <div className="card-empty__content">
              <h3>There are no more items in your cart</h3>
            </div>
            <div className="continued-shopping__btn d-flex justify-content-center">
              <BtnContinuedShopping path={'/Product'} title={"Continued Shopping"}  />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CartEmpty;