import React, { Component } from 'react';
import { Layout } from 'antd';

import text from '../text/paragraph';
import '../stylesheets/css/main.css';

const { Content } = Layout;

export default class About extends Component {
  render() {
    return (
      <Layout>
        <Content className="About">
          <p>{text.about1}</p>
          <p>{text.about2}</p>
          <p>{text.about3}</p>
        </Content>
      </Layout>
    );
  }
}
