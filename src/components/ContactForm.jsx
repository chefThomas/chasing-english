import React, { Component } from "react";
import "../stylesheets/css/main.css";

export default class Form extends Component {
  state = {
    name: "",
    email: "",
    message: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // save to db logic goes here

    // reset state
    this.setState({ name: "", email: "", message: "" });
  };

  render() {
    return (
      <>
        <form className="ContactForm" onSubmit={this.handleSubmit}>
          <h3 className="ContactForm-header">Contact Us</h3>
          <label htmlFor="name">Name</label>
          <input
            className="text-input"
            name="name"
            id="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className="text-input"
            name="email"
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="message">Message</label>

          <textarea
            className="text-input text-field"
            name="message"
            id="message"
            type="message"
            value={this.state.message}
            onChange={this.handleChange}
            rows="5"
            cols="5"
          />
          <input
            className="ContactForm-submit NavButton dark-on-dark"
            type="submit"
          />
        </form>
      </>
    );
  }
}
