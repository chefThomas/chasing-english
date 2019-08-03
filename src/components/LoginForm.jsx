import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/css/main.css";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    console.log();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = e => {
    this.props.toggle();
  };

  handleToggleSignup = e => {
    this.props.toggleSignup();
  };

  handleSubmit = e => {
    e.preventDefault();
    //db logic goes here

    // reset state
    this.setState({
      email: "",
      password: ""
    });
  };

  text = e => {
    console.log("test fired");
  };

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        {/* <i class="fa fa-times" aria-hidden="true" onClick={this.handleToggle} /> */}
        <h2 className="LoginForm-header">Login</h2>
        <div className="email-input">
          <label htmlFor="email">Email</label>
          <input
            required
            className="text-input"
            name="email"
            id="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password</label>
          <input
            required
            className="text-input bottom"
            name="password"
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <Link className="link">Forgot password ? </Link>
        <Link className="link register" onClick={this.handleToggleSignup}>
          Register
        </Link>
        <input
          className="NavButton dark-on-light"
          type="submit"
          onClick={this.test}
        />
      </form>
    );
  }
}
