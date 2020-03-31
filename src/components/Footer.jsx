import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/css/main.css';

const Footer = props => {
  return (
    <section id="footer-section" className={`footer-section Home ${props.mod}`}>
      <footer className="footer">
        <div className="site-map-grid">
          <div className="home-page-map footer-col">
            <span className="site-map-link head" to="/">
              Home
            </span>
            <a className="site-map-link" href="#mission-section">
              Mission
            </a>
            <a className="site-map-link" href="#testimonials-section">
              Testimonials
            </a>
          </div>
          <div className="services-page-map footer-col">
            <span className="site-map-link head">Programs</span>
            <a className="site-map-link" href="#services-section">
              Group
            </a>
            <a className="site-map-link" href="#services-section">
              Individual
            </a>
          </div>
          <div className="book-page-map footer-col">
            <span className="site-map-link head">Catalog</span>
            <Link className="site-map-link" to="/catalog">
              Programs
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
            <span className="site-map-link">
              chasingenglishtutoring@gmail.com
            </span>
            <span className="site-map-link">(208) 805-0519</span>
          </div>
        </div>
        <div className="social-media">
          <div>© Chasing English 2020</div>
          {/* <div className="social-icons">
            <h4 className="social-media-header">Follow Us</h4>
            <i className="fab fa-twitter-square" />
            <i className="fab fa-linkedin" />
            <i className="fab fa-instagram" />
          </div> */}
        </div>
      </footer>
    </section>
  );
};

export default Footer;
