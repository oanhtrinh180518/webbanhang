import React from 'react';
import {Container} from 'react-bootstrap'
import {BtnCheckOut} from "../../components/shared/button/CardBtn";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "../../app/userSlice";

function CheckOutSuccess(props) {
  let history = useHistory();
  const { userInfo } = useSelector(
    userSelector
  );
  return (
    <div>
      <Container>
        { !userInfo ? history.push('/401-unauthorized-page') :
          <div className="checkOut--success d-flex justify-content-center m-t-100 m-b-100">
            {/*<div className="checkOut__img">*/}
            {/*  <img src={process.env.PUBLIC_URL + '/img/checkOut/thanks.png'} alt=""/>*/}
            {/*</div>*/}
            <div className="checkOut--success__body text-center mx-auto">
              <div className={'checkOut--success__header m-b-40'}>
                <img src={process.env.PUBLIC_URL + '/img/checkOut/thank-you_02.png'} alt=""/>
              </div>
              <div className="checkOut--success__content">
                <h4>Cảm ơn bạn đã mua hàng tại Oganuceic!</h4>
                <p>Tặng bạn mã giảm giá 10% cho lần mua hàng tiếp theo, vui lòng check email để nhận mã giảm giá.</p>
              </div>
              <div className="backhome__btn d-flex justify-content-center">
                <BtnCheckOut path={'/Home'} title={"Back to Home"}/>
              </div>
            </div>
          </div>
        }
      </Container>
    </div>
  );
}

export default CheckOutSuccess;
