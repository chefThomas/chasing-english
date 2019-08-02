import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import NavButton from "../components/NavButton";
import TextBlock from "../components/TextBlock";
import Image from "../components/Image";
import ContactForm from "../components/ContactForm";
import Grid from "../components/Grid";
import Testimonial from "../components/Testimonial";
import ServiceCard from "../components/ServiceCard";

import icon from "../static/logo.svg";

import textData from "../text/paragraph";
import books from "../static/group-read.jpg";
import personal from "../static/personal.jpg";
import group from "../static/kendrasLovesThisPic.jpg";

import "../stylesheets/css/main.css";

class Home extends Component {
  testimonials = [
    <Testimonial name="Jill Withers" body={textData.body} type="Parent" />,
    <Testimonial name="Jane Thompson" body={textData.body} type="Student" />,
    <Testimonial name="Laura Parsons" body={textData.body} type="Parent" />,
    <Testimonial name="John Smith" body={textData.body} type="Student" />,
    <Testimonial name="Olivia Bellevue" body={textData.body} type="Student" />
  ];

  render() {
    return (
      <div className="Home">
        <section id="title-section" className="Home-top-segment dark">
          <div className="icon-container">
            <img className="icon-full" src={icon} alt="icon" />
            <h1 className="motto">
              <span className="line1">Chasing</span>
              <span className="line2">English</span>{" "}
              <span className="line3">writing support for the future</span>{" "}
            </h1>
          </div>
        </section>
        <section id="mission-section" className="Home-mid-segment light">
          <h2 className="section-header">mission</h2>
          <div className="what-we-do-container">
            <div className="text-and-image-container">
              <div className="text-container">
                <TextBlock
                  header={"Help students grow"}
                  text={textData.body + textData.body}
                />
                <TextBlock
                  header={"Help students succeed"}
                  text={textData.body + textData.body}
                />
              </div>
              <div className="col-4-lg img-container">
                <div className="img-container">
                  <Image class="Image" source={group} alt="smiling students" />
                </div>
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
          <h2 className="section-header">testimonials</h2>
          <Grid
            class="testimonials-grid-container"
            gridItems={this.testimonials}
          />
          <NavButton
            class="NavButton light-on-light fixed-width center"
            label="View Services"
            to="/info"
          />
        </section>
        <section id="services-section" className="services">
          <h2 className="section-header">services</h2>
          <div className="service-card-container">
            <ServiceCard
              mainHeader="Group"
              subHeader="social learning"
              body={textData.group}
              noteText="peer to peer"
              alt="group course"
            />
            <div className="img-container">
              <Image class="service-image" source={books} alt="group reading" />
            </div>
            <ServiceCard
              mainHeader="Personal"
              subHeader="individual learning"
              body={textData.personal}
              noteText="one-on-one"
              alt="g"
            />{" "}
            <div className="img-container">
              <Image
                class="service-image"
                source={personal}
                alt="student studying"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NavButton
              class="NavButton light-on-light fixed-width center"
              label="Learn More"
              to="/info"
            />
          </div>
        </section>
        {/* FOOTER */}
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
