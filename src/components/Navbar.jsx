import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import '../stylesheets/css/main.css';

import HamburgerMenu from './HamburgerMenu';

class Navbar extends Component {
  state = {
    showLogin: false,
  };
  handleClick = e => {
    console.log('click burger');
    // display mobile nav
  };

  showLogin = e => {
    this.setState({ showLogin: true });
  };

  hideLogin = e => {
    this.setState({ showLogin: false });
  };

  logout = e => {
    this.props.logout();
  };

  // handleSignupClick = e => {
  //   this.props.toggleSignup();
  //   // push sign up form into v
  // };

  render() {
    // const { showDropdownNav } = this.state;
    return (
      <div className="Navbar">
        <div className="Navbar-links-container">
          <NavLink
            exact
            className="Navbar-link "
            activeClassName="NavLink-active"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/catalog"
          >
            Catalog
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/about"
          >
            About
          </NavLink>
          {this.props.loggedInUserType === 'admin' ? (
            <NavLink
              exact
              className="Navbar-link"
              activeClassName="NavLink-active"
              to="/admin"
            >
              Admin
            </NavLink>
          ) : null}
        </div>
        <HamburgerMenu />
        <div className="Navbutton-container">
          {this.props.loggedInUsername ? (
            <>
              <Icon type="mail" />
              <span className="welcome-user">
                Welcome, {this.props.loggedInUsername}!
              </span>
            </>
          ) : (
            <button
              className="NavButton dark-on-dark navbar"
              label="Log in"
              onClick={this.props.showLogin}
            >
              Log In
            </button>
          )}
          <Link
            to={this.props.loggedInUsername ? '' : '/guardian-registration'}
          >
            <button
              className="NavButton dark-on-dark navbar"
              label="Sign up"
              onClick={this.props.loggedInUsername ? this.logout : null}
            >
              {this.props.loggedInUsername ? 'Log out' : 'Register'}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
