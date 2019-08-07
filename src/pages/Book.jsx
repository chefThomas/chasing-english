import { Table, Button } from "antd";

import React, { Component } from "react";

export default class Book extends Component {
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
      render: () => <Button>Reserve</Button>
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
      <div style={{ padding: "1rem" }} className="Page">
        <h1 className="Page-header">Scheduling</h1>
        <section className="section">
          <h3 className="section-header">My Sessions</h3>
        </section>
        <section className="Book-available-sessions section">
          <h3 className="">Available Sessions</h3>
          <Table
            dataSource={this.availableSessionsData()}
            columns={this.availableSessionsCols}
          />
        </section>
      </div>
    );
  }
}
