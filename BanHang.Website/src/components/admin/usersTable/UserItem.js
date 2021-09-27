import React, {useState} from 'react';
import {ConfirmModal} from "../../shared/Modal/ConfirmModal";
import ActiveStatusBtn from "../../shared/button/ActiveStatusBtn";
import ActiveIcon from'../../../assets/img/icon/flatIcon/check_24.png'
import UnActiveIcon from'../../../assets/img/icon/flatIcon/cancel_24.png'

function UserItem({index, pageSize, pageIndex, id, fullName, userName, email, address, age, phoneNumber, isActive, loadIndex, reload }) {

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  return (
    <>
      <tr>
        <td>{index + (pageIndex - 1) * pageSize + 1}</td>
        <td>{fullName}</td>
        <td>{userName}</td>
        <td>{email}</td>
        <td>{address}</td>
        {/*<td>{age}</td>*/}
        <td>{phoneNumber}</td>
        <td>
          {
            isActive === true ? <ActiveStatusBtn icon={ActiveIcon} onClick={() => {
              setModalShow(true)
              setModalText("DeActivate khách hàng này ?")
            }}/>
            :
              <ActiveStatusBtn icon={UnActiveIcon} onClick={() => {
                setModalShow(true)
                setModalText("Activate khách hàng này ?")
              }}/>
          }
        </td>
      </tr>
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalText={modalText}
        userId={id}
        isActive={isActive}
        loadIndex={loadIndex}
        reload={(loadIndex) => reload(loadIndex)}
      />
    </>
  );
}

export default UserItem;