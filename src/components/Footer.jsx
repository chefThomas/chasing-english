import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/css/main.css';

const Footer = (props) => {
  return (
    <section id="footer-section" className={`footer-section Home ${props.mod}`}>
      <footer className="footer">
        <div className="site-map-grid">
          <div className="home-page-map footer-col">
            <span className="site-map-link head" to="/">
              Home
            </span>
            <a className="site-map-link" href="/#mission-section">
              Mission
            </a>
            <a className="site-map-link" href="/#testimonials-section">
              Testimonials
            </a>
          </div>
          {/* <div className="services-page-map footer-col">
            <span className="site-map-link head">Programs</span>
            <a className="site-map-link" href="/#services-section">
              Group
            </a>
            <a className="site-map-link" href="/#services-section">
              Individual
            </a>
          </div> */}
          <div className="book-page-map footer-col">
            <span className="site-map-link head">Course Catalog</span>
            <Link className="site-map-link" to="/catalog">
              Schedule
            </Link>
          </div>
          <div className="about-page-map footer-col">
            <span className="site-map-link head">About</span>
            <Link className="site-map-link" to="/about">
              Bio
            </Link>
          </div>
          <div className="about-page-map footer-col">
            <span className="site-map-link head">Contact</span>
            <span className="site-map-link">kendra@chasingenglish.com</span>
          </div>
        </div>
        <div className="social-media">
          <div>© Chasing English 2020</div>
          <div className="social-icons">
            <h4 className="social-media-header">Connect</h4>
            {/* <i className="fab fa-twitter-square" /> */}
            <a href="https://www.instagram.com/chasing_english/">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.linkedin.com/in/kendra-dixon-2791b076/">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
