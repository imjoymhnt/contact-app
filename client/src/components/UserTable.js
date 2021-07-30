import React, { useState, useEffect } from "react";
import { Table, Radio, Divider } from "antd";
import axios from "axios";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

const contentStyle = {
  minHeight: 280,
  padding: 24,
  background: "#ebebeb",
};

const UserTable = () => {
  const columns = [
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

  console.log(seleted);

  const [selectionType, setSelectionType] = useState("checkbox");
  return (
    <div style={contentStyle}>
      {/* <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
       
      </Radio.Group> */}
      <span>
        <AddUser />
        <DeleteUser id={seleted[0]} />
      </span>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={tableData ? tableData : []}
      />
    </div>
  );
};

export default UserTable;
