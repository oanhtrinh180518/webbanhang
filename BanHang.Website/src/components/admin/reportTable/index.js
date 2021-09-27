import React from 'react';
import {Table} from 'react-bootstrap'


export function TopMakeOrder({data}) {
  return (
    <>
      <div className="top-make-order__table">
        <div className="table__title">
          <h4>Top Users Make Order</h4>
        </div>
        <Table size={'md'} repsonsive hover>
          <thead>
          <tr>
            <th>🔝</th>
            <th>‍Username</th>
            <th>Phone number</th>
            {/*<th>Email</th>*/}
            <th>Total Order</th>
          </tr>
          </thead>
          <tbody>
          {data && data.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.userName}</td>
              <td>{user.phoneNumber}</td>
              {/*<td>{user.email}</td>*/}
              <td>{user.orderCount}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export function TopSpendTable({data}) {
  return (
    <>
      <div className="top-spend__table">
        <div className="table__title">
          <h4>Top Users Make Order</h4>
        </div>
        <Table size={'md'} repsonsive hover>
          <thead>
          <tr>
            <th>🔝</th>
            <th>‍Username</th>
            <th>Total Order</th>
          </tr>
          </thead>
          <tbody>
          {data && data.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.userName}</td>
              <td>{user.orderCount}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
