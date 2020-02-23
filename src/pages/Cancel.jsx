import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Layout, Typography } from 'antd';

import NavButton from '../components/NavButton';

import '../stylesheets/css/main.css';

import cancel from '../static/undraw_empty_cart_co35.svg';

const { Content } = Layout;
const { Title } = Typography;

class CancelPage extends Component {
  render() {
    return (
      <Layout className="CancelPage">
        <Content className="content" style={{ padding: ' 50px' }}>
          <img
            src={cancel}
            style={{ width: '20%', marginBottom: '2rem' }}
            alt="empty shopping cart"
          />
          <Title style={{ marginBottom: '2rem' }} level={3}>
            Purchase canceled
          </Title>
          <NavButton
            class="top-margin-lg NavButton dark-on-light center-inline"
            to="/catalog"
            label="Return to catalog"
          />
        </Content>
      </Layout>
    );
  }
}

export default withRouter(CancelPage);
