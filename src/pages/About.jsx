import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Layout } from 'antd';

import Footer from '../components/Footer';

import '../stylesheets/css/main.css';
import text from '../text/paragraph';

import self from '../static/Kendra.jpg';

import getCredentials from '../utilities/getCredentialsFromLocalStorage.js';
const { Content } = Layout;
const { Meta } = Card;

class About extends Component {
  componentDidMount() {
    // relogin on refresh
    const { user } = this.props;
    const credentials = getCredentials();
    console.log(user, credentials);
    if (!user && credentials) {
      this.props.login(credentials);
    }
  }

  render() {
    return (
      <>
        <Row style={{ padding: '5rem' }} justify="space-around" align="middle">
          <Col sm={24} md={10}>
            <Card
              center
              hoverable
              style={{
                width: '80%',
                margiLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '3rem',
              }}
              cover={<img alt="example" src={self} />}
            >
              <Meta title="Kendra Dixon" description="English and Literature" />
            </Card>
          </Col>
          <Col m={24} md={10}>
            <p>{text.about1}</p>
            <p>{text.about2}</p>
            <p>{text.about3}</p>
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}
export default withRouter(About);
