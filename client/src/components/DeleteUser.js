import React from "react";
import { Button } from "antd";
import axios from "axios";

const DeleteUser = ({ id }) => {
  console.log(id);
  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/user/${id}`
    );

    console.log(data);
  };
  return (
    <div>
      <Button
        onClick={handleDelete}
        style={{ marginLeft: "88%", marginTop: 5 }}
        danger
      >
        Delete User
      </Button>
    </div>
  );
};

export default DeleteUser;
