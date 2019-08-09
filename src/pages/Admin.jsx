import React, { Component } from "react";
import { Divider, Button, Table } from "antd";
import AddSessionFormAdmin from "../components/AddSessionFormAdmin";
// import SessionCalendar from "../components/SessionCalendar";
const styles = {
  Admin: {
    padding: "2rem"
  }
};
export default class Admin extends Component {
  availableSessionsCols = [
    {
      title: "When",
      dataIndex: "when",
      key: "when"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </span>
      )
    }
  ];

  availableSessionsData = () => {
    return this.props.sessions.map((el, index) => {
      return { key: index, when: el.when, type: el.sessionType };
    });
  };

  componentDidMount() {
    //construct table data list
    console.log("Book componentdidmount1", this.props.sessions);
    console.log("Book componentdidmount2", this.availableSessionsData());
    this.availableSessionsData();
  }

  render() {
    return (
      <div style={styles.Admin} className="Admin">
        <h1>Add Session to Booking List</h1>
        <AddSessionFormAdmin addSession={this.props.addSession} />
        <Divider />
        <h1>Scheduled Sessions</h1>
        <Table
          dataSource={this.availableSessionsData()}
          columns={this.availableSessionsCols}
        />
        <h1>User Access Requests</h1>
      </div>
    );
  }
}
