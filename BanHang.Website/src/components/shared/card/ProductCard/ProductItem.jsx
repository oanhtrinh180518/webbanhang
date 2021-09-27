import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import {
  getAllProduct,
  updateStatusProduct,
} from "../../../../app/productSlice";
import { BsPencil } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import ProUpCard from "./ProUpCard";
import ActiveStatusBtn from "../../button/ActiveStatusBtn";
import UnActiveIcon from "../../../../assets/img/icon/flatIcon/cancel_24.png";
import ActiveIcon from "../../../../assets/img/icon/flatIcon/check_24.png";
import Button from "react-bootstrap/Button";

const ProductRow = (props) => {
  // console.log(props.activeIndex);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  //modal update product
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //modal active product
  // const [status, setStatus] = useState(props.product.status);

  const onUpdateStatus = async () => {
    if (props.product.status === 1) {
      await dispatch(updateStatusProduct({ id: props.product.id, status: 0 }));
    } else {
      await dispatch(updateStatusProduct({ id: props.product.id, status: 1 }));
    }

    props.reload(props.reloadIndex + 1);
    console.log(props.reloadIndex);
    setModalShow(false);
  };

  return (
    <>
      <tr>
        <td className="text-center align-middle ">
          {props.index + (props.pageIndex - 1) * props.pageSize + 1}
        </td>
        <td className="text-center align-middle ">{props.product.name}</td>
        <td className="text-center align-middle ">
          {props.product.categoryName}
        </td>
        <td className="text-center align-middle ">
          {props.product.supplierName}
        </td>
        <td className="text-center align-middle ">{props.product.unitPrice}</td>
        <td className="text-center align-middle ">
          {props.product.availableQuantity}
        </td>
        <td className="text-center align-middle ">
          {props.product.createDate.substring(
            0,
            props.product.createDate.indexOf("T")
          )}
        </td>
        <td className="text-center align-middle ">
          {props.product.expDate.substring(
            0,
            props.product.expDate.indexOf("T")
          )}
        </td>
        <td className="text-center align-middle ">
          {props.product.status === 1 ? (
            <ActiveStatusBtn
              icon={ActiveIcon}
              onClick={() => {
                setModalShow(true);
                setModalText("Would you like to deactivate this product?");
              }}
            />
          ) : (
            <ActiveStatusBtn
              icon={UnActiveIcon}
              onClick={() => {
                setModalShow(true);
                setModalText(" Would you like to Activate this product?");
              }}
            />
          )}
          {/* <button value={props.product.status} >{display}</button> */}
        </td>
        <td className="text-center align-middle tableitem--cursor">
          <BsPencil onClick={() => handleShow()} />
        </td>
      </tr>

      {/* Modal Update Product */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProUpCard
            product={props.product}
            handleClose={() => handleClose()}
            reload={props.reload}
          />
        </Modal.Body>
      </Modal>

      {/* Modal Update Status */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalText={modalText}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onUpdateStatus()}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductRow;
