import React from 'react';
import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom";

function ResetPasswordModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <div className="modal-content--custom text-center">
            <img src={process.env.PUBLIC_URL + 'img/icon/flatIcon/user-security_64.png'} alt=""/>
            <h6 className="p-xl-2"> Password has been reset.</h6>
            <Link to={'/login'} className="back-to-login-btn">Login now</Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;