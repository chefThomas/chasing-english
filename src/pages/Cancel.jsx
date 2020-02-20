import React, { Component } from 'react';
import { Result, Layout } from 'antd';

import NavButton from '../components/NavButton';

const { Content } = Layout;

class Cancel extends Component {
  render() {
    return (
      <Layout>
        <Content>
          <Result
            title="Purchase Cancelled"
            status="warning"
            extra={
              <NavButton
                class="top-margin-lg NavButton dark-on-light navbar center-inline"
                to="/catalog"
                label="Return to Catalog"
              />
            }
          ></Result>
        </Content>
      </Layout>
    );
  }
}

export default Cancel;
