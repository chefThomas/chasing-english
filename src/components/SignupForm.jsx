import React, { Component } from 'react';
import '../stylesheets/css/main.css';

export default class SignupForm extends Component {
  state = {
    guardianFirstName: '',
    guardianLastName: '',
    guardianEmail: '',
    password: '',
    childName: '',
    childEmail: '',
  };

  handleChange = e => {
    console.log();
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
      guardianFirstName: '',
      guardianLastName: '',
      guardianEmail: '',
      password: '',
      childName: '',
      childEmail: '',
    });
  };

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
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
        <label htmlFor="parentEmail">Email</label>
        <input
          required
          className="text-input"
          name="parentEmail"
          id="parentEmail"
          type="email"
          value={this.state.parentEmail}
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

        <label className="radio-group-label" htmlFor="course">
          Course of interest?
        </label>
        <div className="radio-choice">
          Group
          <input
            onChange={this.handleChange}
            type="radio"
            name="coursePreference"
            value="group"
            defaultChecked={this.state.coursePreference === 'group'}
            className="group-radio"
          />
        </div>
        <div className="radio-choice bottom">
          Individual
          <input
            onChange={this.handleChange}
            type="radio"
            name="coursePreference"
            value="individual"
            className="group-radio"
          />
        </div>
        <input className="NavButton dark-on-light" type="submit" />
      </form>
    );
  }
}
