import React from "react";
import { Divider } from "antd";
import AddSessionFormAdmin from "../components/AddSessionFormAdmin";
// import SessionCalendar from "../components/SessionCalendar";

const Admin = props => {
  return (
    <div className="Admin">
      <h1>Add Session to Booking List</h1>
      <AddSessionFormAdmin addSession={props.addSession} />
      <Divider />
      <h1>User Access Requests</h1>
    </div>
  );
};

export default Admin;
