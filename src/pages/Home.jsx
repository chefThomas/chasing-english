import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import NavButton from "../components/NavButton";
import TextBlock from "../components/TextBlock";
import Image from "../components/Image";
import icon from "../static/logo.svg";

import body from "../mock-data/paragraph";
import img1 from "../mock-data/img1.jpg";

import "../stylesheets/css/main.css";
import Testimonial from "../components/Testimonial";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <section className="Home-top-segment">
          <div className="icon-container">
            <img className="icon-full" src={icon} alt="icon" />
            <h1 className="motto">
              <span className="line1">Chasing</span>
              <span className="line2">English</span>{" "}
              <span className="line3">writing support for the future</span>{" "}
            </h1>
          </div>
        </section>
        <section className="Home-mid-segment">
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
              class="NavButton light-on-light button-mid-segment"
              label="Find Out More"
              to="/info"
            />
          </div>
        </section>
        <section className="testimonials">
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
        </section>
        <footer>footer</footer>
      </div>
    );
  }
}

export default withRouter(Home);
