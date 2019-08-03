import React, { Component } from "react";
import "../stylesheets/css/main.css";

export default class SignupForm extends Component {
  state = {
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    studentName: "",
    coursePreference: "group"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = e => {
    this.props.toggle();
  };

  handleSubmit = e => {
    e.preventDefault();
    //db logic goes here

    // reset state
    this.setState({
      parentFirstName: "",
      parentLastName: "",
      parentEmail: "",
      studentName: "",
      coursePreference: "group"
    });
  };

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        {/* <i class="fa fa-times" aria-hidden="true" onClick={this.handleToggle} /> */}
        <h2 className="SignupForm-header">Request Free Consultation</h2>
        <label htmlFor="parentFirstName">First Name</label>
        <input
          required
          className="text-input"
          name="parentFirstName"
          id="parentFirstName"
          type="text"
          value={this.state.parentFirstName}
          onChange={this.handleChange}
        />
        <label htmlFor="parentLastName">Last Name</label>
        <input
          required
          className="text-input"
          name="parentLastName"
          id="parentLastName"
          type="text"
          value={this.state.parentLastName}
          onChange={this.handleChange}
        />
        <label htmlFor="parentLastName">Student's Name</label>
        <input
          required
          className="text-input"
          name="studentName"
          id="studentName"
          type="text"
          value={this.state.studentName}
          onChange={this.handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          className="text-input"
          name="parentEmail"
          id="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label className="radio-group-label" htmlFor="course">
          Course of interest?
        </label>
        <div className="radio-choice">
          Group
          <input
            type="radio"
            name="course"
            value="groupPreference"
            checked={this.state.coursePreference === "group"}
            className="group-radio"
          />
        </div>
        <div className="radio-choice">
          Individual
          <input
            type="radio"
            name="course"
            value="individual"
            checked={this.state.coursePreference === "individual"}
            className="group-radio"
          />
        </div>

        {/* <label htmlFor="message">Message</label> */}
        <input
          // className="ContactForm-submit NavButton dark-on-dark"
          type="submit"
        />
      </form>
    );
  }
}
