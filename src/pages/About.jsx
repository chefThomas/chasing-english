import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';
import '../stylesheets/css/main.css';
import Footer from '../components/Footer';

import text from '../text/paragraph';

const { Content } = Layout;

class About extends Component {
  render() {
    return (
      <>
        <Layout>
          <Content>
            <p>{text.about1}</p>
            <p>{text.about2}</p>
            <p>{text.about3}</p>
          </Content>
        </Layout>
        <Footer mod="About-footer" />
      </>
    );
  }
}
export default withRouter(About);
