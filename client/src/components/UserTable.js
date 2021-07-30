import React, { useState, useEffect } from "react";
import { Table, Radio, Divider, Button } from "antd";
import axios from "axios";
import AddUser from "./AddUser";

const contentStyle = {
  minHeight: 280,
  padding: 24,
  background: "#ebebeb",
};

const UserTable = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Hobbbies",
      dataIndex: "hobbies",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <div>
          <Button style={{ marginRight: 5 }} primary>
            Update
          </Button>
          <Button onClick={handleDelete} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user`
      );
      setUsers(data);
    };
    fetchData();
  }, []);

  console.log(users);

  const tableData = [];

  users.map((user) => {
    tableData.push({
      key: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      hobbies: user.hobbies,
    });
  });

  console.log(tableData);

  const [seleted, setSelected] = useState("");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",

      name: record.name,
    }),
  };
  const handleDelete = async (e) => {
    const { data } = await axios
      .delete(`${process.env.REACT_APP_API}/api/v1/user/${seleted[0]}`)
      .then(window.location.reload());
  };

  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div style={contentStyle}>
      <span>
        <AddUser />
      </span>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={tableData ? tableData : []}
        onRow={(r) => ({
          onClick: () => console.log(r),
        })}
      />
    </div>
  );
};

export default UserTable;
