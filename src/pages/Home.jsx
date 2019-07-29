import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import NavButton from "../components/NavButton";
import TextBlock from "../components/TextBlock";
import Image from "../components/Image";
import ContactForm from "../components/ContactForm";

import icon from "../static/logo.svg";

import body from "../mock-data/paragraph";
import img1 from "../mock-data/img1.jpg";

import "../stylesheets/css/main.css";
import Testimonial from "../components/Testimonial";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <section id="title-section" className="Home-top-segment">
          <div className="icon-container">
            <img className="icon-full" src={icon} alt="icon" />
            <h1 className="motto">
              <span className="line1">Chasing</span>
              <span className="line2">English</span>{" "}
              <span className="line3">writing support for the future</span>{" "}
            </h1>
          </div>
        </section>
        <section id="mission-section" className="Home-mid-segment">
          <div className="what-we-do-container">
            <div className="text-and-image-container">
              <div className="text-container">
                <TextBlock
                  header={"Helping students grow"}
                  text={body.body + body.body}
                />
                <TextBlock
                  header={"Helping students succeed"}
                  text={body.body + body.body}
                />
              </div>
              <div className="col-4-lg img-container">
                <Image class="Image" source={img1} alt="trumptopod" />
              </div>
            </div>
            <NavButton
              class="NavButton light-on-light center"
              label="Find Out More"
              to="/info"
            />
          </div>
        </section>
        <section id="testimonials-section" className="testimonials">
          <h2 className="header">testimonials</h2>
          <div className="testimonials-grid-container">
            <Testimonial name="Jill Withers" body={body.body} type="Parent" />
            <Testimonial name="Jane Thompson" body={body.body} type="Student" />
            <Testimonial name="Laura Parsons" body={body.body} type="Parent" />
            <Testimonial name="John Smith" body={body.body} type="Student" />
            <Testimonial
              name="Olivia Bellevue"
              body={body.body}
              type="Student"
            />
          </div>
          <NavButton
            class="NavButton light-on-light fixed-width center"
            label="View Services"
            to="/info"
          />
        </section>
        <section id="footer-section">
          <footer className="footer">
            <div className="site-map-grid">
              <div className="home-page-map footer-col">
                <Link className="site-map-link head" to="/">
                  Home
                </Link>
                <Link className="site-map-link" to="/#mission-section">
                  Mission
                </Link>
                <Link className="site-map-link" to="/#testimonials-section">
                  Testimonials
                </Link>
              </div>
              <div className="services-page-map footer-col">
                <Link className="site-map-link head" to="/info">
                  Services
                </Link>
                <Link className="site-map-link" to="/info/#group-section">
                  Group
                </Link>
                <Link
                  className="site-map-link"
                  to="/info/#individual-formatted-section"
                >
                  Individual
                </Link>
                <Link className="site-map-link" to="/info/#custom-section">
                  Custom
                </Link>
              </div>
              <div className="book-page-map footer-col">
                <Link
                  className="site-map-link head"
                  to="/schedule#intro-section"
                >
                  Calendar
                </Link>
                <Link className="site-map-link" to="/schedule#calendar-section">
                  Request Tutor
                </Link>
              </div>
              <div className="about-page-map footer-col">
                <Link className="site-map-link head" to="/about">
                  About
                </Link>
                <Link className="site-map-link" to="/about#bio">
                  Bio
                </Link>
              </div>
              <div className="contact-form">
                <ContactForm />
              </div>
            </div>
            <div className="social-media">
              <div className>©Chasing English 2019</div>
              <div className="social-icons">
                <h4 className="social-media-header">Follow Us</h4>
                <i class="fab fa-twitter-square" />
                <i class="fab fa-linkedin" />
                <i class="fab fa-instagram" />
              </div>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default withRouter(Home);
