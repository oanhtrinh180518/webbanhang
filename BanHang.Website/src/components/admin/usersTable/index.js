import React from 'react';
import {Table} from 'react-bootstrap'
import UserItem from "./UserItem";

function Index({listMember, loadIndex, reload, pageSize, pageIndex}) {
  return (
    <div className="users__table">
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>🆔</th>
          <th>😃 Full Name</th>
          <th>👦 Username</th>
          <th>💌 Email</th>
          <th>🗺 Address</th>
          {/*<th>🔢 Age</th>*/}
          <th>📞 Phone number</th>
          <th>✅ Active</th>
          {/*<th>Actions</th>*/}
        </tr>
        </thead>
        <tbody>
        {
          listMember.map((member, index) => {
            return (
              <UserItem
                key={index}
                index={index}
                pageSize={pageSize}
                pageIndex={pageIndex}
                id={member.id}
                fullName={member.fullName}
                userName={member.userName}
                email={member.email}
                address={member.address}
                age={member.age}
                phoneNumber={member.phoneNumber}
                isActive={member.active}
                loadIndex={loadIndex}
                reload={(loadIndex) => reload(loadIndex)}
              />
            )
          })
        }
        </tbody>
      </Table>
    </div>
  );
}

export default Index;
