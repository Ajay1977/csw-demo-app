import React, { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StaticUserData from "../assets/data/userList.json";
import { setSelectedUser, setUserList } from "../redux/actions/userListActions";

export const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const headerList = [
    {
      // asc: false,
      name: "First Name",
      id: "firstName",
    },
    {
      // asc: false,
      name: "Last Name",
      id: "firstName",
    },
    {
      // asc: false,
      name: "Email ID",
      id: "email",
    },
    {
      // asc: false,
      name: "Username",
      id: "username",
    },
  ];
  const [tableData, setTableData] = useState({
    totalPages: Math.ceil(StaticUserData.length / 10),
    currPage: 1,
    pagePerSize: 10,
  });

  const handlePageChange = (currPage) => {
    setTableData({
      ...tableData,
      currPage,
    });
  };

  useEffect(() => {
    dispatch(setUserList(StaticUserData));
    setUsersData(StaticUserData);
  }, []);

  const onSelectUser = (userId) => {
    localStorage.setItem("selectedUserId", userId);
    dispatch(setSelectedUser(userId));
    navigate("/details", {
      replace: true,
      state: { userId: userId },
    });
  };

  return (
    <>
      <h5 className="user-list-heading">
        User List:
        <span>(Please click any of the row to view the detail)</span>
      </h5>
      <Table className="user-list-table" striped bordered hover responsive>
        <thead>
          <tr>
            <th>S.No</th>
            {headerList.map((headerItem, index) => (
              <th key={`${headerItem.id}_${index}`}>{headerItem.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usersData
            .slice(
              (tableData.currPage - 1) * tableData.pagePerSize,
              tableData.currPage * tableData.pagePerSize
            )
            .map((userData, index) => (
              <tr
                key={`${userData.id}`}
                onClick={() => onSelectUser(userData.id)}
              >
                <td>
                  {(tableData.currPage - 1) * tableData.pagePerSize + index + 1}
                </td>
                {headerList.map((headerItem, index) => (
                  <td key={`${userData.id}_${headerItem.id}_${index}`}>
                    {userData[headerItem.id]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination className="list-pagination">
        <Pagination.Prev
          onClick={() => handlePageChange(tableData.currPage - 1)}
          disabled={tableData.currPage == 1}
        />
        {[...Array(tableData.totalPages)].map((elem, index) => (
          <React.Fragment key={`list-pagination-${index}`}>
            <Pagination.Item
              onClick={() => handlePageChange(index + 1)}
              active={index + 1 === tableData.currPage}
            >
              {index + 1}
            </Pagination.Item>
          </React.Fragment>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(tableData.currPage + 1)}
          disabled={tableData.totalPages === tableData.currPage}
        />
      </Pagination>
    </>
  );
};
