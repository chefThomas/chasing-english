import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import '../stylesheets/css/main.css';

import HamburgerMenu from './HamburgerMenu';
import { Drawer } from 'antd';

class Navbar extends Component {
  state = {
    showLogin: false,
  };
  handleClick = (e) => {
    console.log('click burger');
    // display mobile nav
  };

  showLogin = (e) => {
    this.setState({ showLogin: true });
  };

  hideLogin = (e) => {
    this.setState({ showLogin: false });
  };

  handleLogout = (e) => {
    this.props.logout();
  };

  // handleSignupClick = e => {
  //   this.props.toggleSignup();
  //   // push sign up form into v
  // };

  render() {
    const location = this.props.history.location.pathname;
    return (
      <div className="Navbar">
        <Drawer
          visible={this.props.showSideNav}
          onClose={this.props.closeSideNav}
          placement="left"
          width={300}
          zIndex={0}
          height={20}
        >
          <div style={{ color: 'black' }}>
            <div className="side-nav-link-container">
              <NavLink
                exact
                className="side-nav-link"
                activeClassName="side-nav-link-active"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                exact
                className="side-nav-link"
                activeClassName="side-nav-link-active"
                to="/catalog"
              >
                {' '}
                Group
              </NavLink>
              <NavLink
                exact
                className="side-nav-link"
                activeClassName="side-nav-link-active"
                to="/one-on-one"
              >
                Individual
              </NavLink>
              <NavLink
                exact
                className="side-nav-link"
                activeClassName="side-nav-link-active"
                to="/about"
              >
                About
              </NavLink>
              {this.props.user && this.props.user.userType === 'admin' ? (
                <NavLink
                  exact
                  className="side-nav-link"
                  activeClassName="side-nav-link-active"
                  to="/admin"
                >
                  Admin
                </NavLink>
              ) : null}
            </div>
          </div>
        </Drawer>
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
            Group
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="side-nav-link-active"
            to="/one-on-one"
          >
            Individual
          </NavLink>
          <NavLink
            exact
            className="Navbar-link"
            activeClassName="NavLink-active"
            to="/about"
          >
            About
          </NavLink>
          {this.props.user && this.props.user.userType === 'admin' ? (
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
        <HamburgerMenu
          showSideNav={this.props.showSideNav}
          openSideNav={this.props.openSideNav}
          closeSideNav={this.props.closeSideNav}
        />
        <div
          className={
            location === '/catalog'
              ? 'Navbutton-container nav-item-shift-left'
              : 'Navbutton-container'
          }
        >
          {this.props.user ? (
            <>
              <span className="welcome-user">
                {`Welcome, ${
                  this.props.user.firstName || this.props.user.guardianFirstName
                }!`}
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
          <Link to={this.props.user ? '' : '/guardian-registration'}>
            <button
              className="NavButton dark-on-dark navbar"
              label="Sign up"
              onClick={this.props.user ? this.handleLogout : null}
            >
              {this.props.user ? 'Log out' : 'Sign Up'}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
