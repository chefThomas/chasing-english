import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Typography } from 'antd';

import NavButton from '../components/NavButton';
import Image from '../components/Image';
import ContactForm from '../components/ContactForm';
import Grid from '../components/Grid';
import Testimonial from '../components/Testimonial';
import ServiceCard from '../components/ServiceCard';

import icon from '../static/logo.svg';

import text from '../text/paragraph';
import books from '../static/group-read.jpg';
import personal from '../static/personal.jpg';
import writing from '../static/writing.png';

import '../stylesheets/css/main.css';

const { Title } = Typography;

class Home extends Component {
  testimonials = [
    <Testimonial name="Ann M." body={text.am} type="Parent" />,
    <Testimonial name="Sarah B." body={text.sb} type="Student" />,
    <Testimonial name="Janet K." body={text.jk} type="Parent" />,
    <Testimonial name="Ann G." body={text.ag} type="Student" />,
    <Testimonial name="Bob C." body={text.bc} type="Head of School" />,
    <Testimonial name="Joe W." body={text.jw} type="Middle School Director" />,
  ];

  state = {
    showForm: false,
  };
  render() {
    return (
      <div
        className={
          this.props.showSignup ||
          this.props.showLogin ||
          this.props.showSideNav
            ? 'shift-left'
            : 'Home'
        }
      >
        <section id="title-section" className="Home-top-segment dark">
          <div className="icon-container">
            <img className="icon-full" src={icon} alt="icon" />
            <h1 className="motto">
              <span className="line1">Chasing</span>
              <span className="line2">English</span>{' '}
              {/* <span className="line3">writing support for the future</span>{" "} */}
            </h1>
          </div>
        </section>
        <section id="mission-section" className="Home-mid-segment light">
          <div className="what-we-do-container">
            <div className="text-and-image-container">
              <div className="text-container">
                <Title>Mission Statement</Title>
                <p>
                  The central mission of Chasing English is to <i>encourage</i>,{' '}
                  <i>guide</i>, and <i>support</i> students as they navigate the
                  writing process, hone their critical thinking skills, and
                  develop competence and therefore confidence through an
                  engaging digital platform that can be accessed anywhere.
                </p>
                <p>
                  In support of this mission, Chasing English fosters the
                  individual through personalized writing coaching;
                  community-based group courses; and single-day workshops, all
                  which seek to engage and ignite middle and high school-aged
                  learners.{' '}
                </p>
              </div>
              <div className="col-4-lg img-container">
                <div className="img-container">
                  <Image class="Image" source={writing} alt="student writing" />
                </div>
              </div>
            </div>
            <NavButton
              class="NavButton light-on-light center"
              label="Find Out More"
              to="/catalog"
            />
          </div>
        </section>
        <section id="testimonials-section" className="testimonials">
          <Title style={{ marginLeft: '3rem' }}>Testimonials</Title>
          <Grid
            class="testimonials-grid-container"
            gridItems={this.testimonials}
          />
          <NavButton
            class="NavButton light-on-light fixed-width center"
            label="View Services"
            to="/catalog"
          />
        </section>
        <section id="services-section" className="services">
          <h2 className="section-header">services</h2>
          <div className="service-card-container">
            <ServiceCard
              mainHeader="Group"
              subHeader="social learning"
              body={text.group}
              noteText="peer to peer"
              alt="group course"
            />
            <div className="img-container">
              <Image class="service-image" source={books} alt="group reading" />
            </div>
            <ServiceCard
              mainHeader="Personal"
              subHeader="individual learning"
              body={text.personal}
              noteText="one-on-one"
              alt="g"
            />{' '}
            <div className="img-container">
              <Image
                class="service-image"
                source={personal}
                alt="student studying"
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NavButton
              class="NavButton light-on-light fixed-width center"
              label="Learn More"
              to="/catalog"
            />
          </div>
        </section>
        {/* FOOTER */}
        <section id="footer-section" className="footer-section">
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
              <div>©Chasing English 2019</div>
              <div className="social-icons">
                <h4 className="social-media-header">Follow Us</h4>
                <i className="fab fa-twitter-square" />
                <i className="fab fa-linkedin" />
                <i className="fab fa-instagram" />
              </div>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

export default withRouter(Home);
