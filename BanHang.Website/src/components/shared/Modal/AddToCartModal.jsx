import React from 'react';
import { Button, Modal } from "react-bootstrap";

function AddToCartModal({notification,show,hide}) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        // {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          {/* <h4>Added to cart successfully</h4> */}
          {notification}

        </Modal.Body>
        <Modal.Footer>
          <Button href='/cart' variant="secondary" 
          // onClick={props.onHide}
          >View Cart
    
          </Button>
          <Button href='/check-out' variant="success" 
          // onClick={props.onHide}
          >Checkout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddToCartModal;