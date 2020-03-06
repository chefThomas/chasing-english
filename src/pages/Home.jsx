import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Typography } from 'antd';

import NavButton from '../components/NavButton';
import Image from '../components/Image';

import Grid from '../components/Grid';
import Testimonial from '../components/Testimonial';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';

import icon from '../static/logo.svg';

import text from '../text/paragraph';
import books from '../static/undraw_in_sync_xwsa.png';
import personal from '../static/undraw_freelancer_b0my.png';
import writing from '../static/undraw_teacher_35j2.png';

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
      <div className="Home">
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
                  The central mission of Chasing English is to encourage, guide,
                  and support students as they navigate the writing process,
                  hone their critical thinking skills, and develop competence
                  and therefore confidence through an engaging digital platform
                  that can be accessed anywhere.
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
            <button
              class="NavButton light-on-light fixed-width center"
              label="Find Out More"
              to="/catalog"
            >
              Find Out More
            </button>
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
            label="Learn More"
            to="/catalog"
          />
        </section>
        <section id="services-section" className="services">
          <Title name="services" style={{ marginLeft: '3rem' }}>
            Programs
          </Title>
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
              className="NavButton light-on-light fixed-width center"
              label="Learn More"
              to="/catalog"
            />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
