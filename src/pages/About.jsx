import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import Footer from '../components/Footer';

import '../stylesheets/css/main.css';
import text from '../text/paragraph';

import getCredentials from '../utilities/getCredentialsFromLocalStorage.js';
const { Content } = Layout;

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
