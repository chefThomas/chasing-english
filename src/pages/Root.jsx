import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "./Home";
import Book from "./Book";
import About from "./About";

export default class Root extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <Home {...routeProps} />}
          />
          <Route
            exact
            path="/schedule"
            render={routeProps => <Book {...routeProps} />}
          />
          <Route
            exact
            path="/about"
            render={routeProps => <About {...routeProps} />}
          />
        </Switch>
      </div>
    );
  }
}
