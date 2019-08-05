import React, { Component } from "react";
import { Divider } from "antd";
import AddSessionFormAdmin from "../components/AddSessionFormAdmin";
import SessionCalendar from "../components/SessionCalendar";

export default class Admin extends Component {
  state = {
    sessions: [
      {
        month: 0,
        date: 1,
        year: 2016,
        time: 0,
        minute: 0,
        sessionType: "group"
      },
      {
        month: 0,
        date: 3,
        year: 2016,
        time: 1200,
        minute: 0,
        sessionType: "group"
      },
      {
        month: 0,
        date: 4,
        year: 2016,
        time: 1300,
        minute: 0,
        sessionType: "individual"
      }
    ]
  };

  componentDidMount() {
    // fetch tutoring session data here from db and load to state
  }

  addSession = session => {
    console.log("state from form to admin.. yay", session);
    this.setState(st => ({ sessions: [...st.sessions, session] }));
  };

  render() {
    return (
      <div className="Admin">
        <h1>Add Session Block</h1>
        <AddSessionFormAdmin addSession={this.addSession} />
        <SessionCalendar sessions={this.state.sessions} />
        <Divider />
        <h1>User Access Requests</h1>
      </div>
      //   <>
      //     <p>Add Session Availability</p>
      //     <DatePicker showTime onOk={this.onOk} />
      //     <p>Choose type</p>

      //     <Calendar />
      //     {/* <Button type="primary">Antd Button</Button> */}
      //   </>
    );
    //   }
  }
}
