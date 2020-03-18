import React, { Component } from 'react';
import { List, Card } from 'antd';

class AdminMessageList extends Component {
  data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];

  render() {
    return (
      <List
        style={{ margin: '2rem' }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          //   xl: 6,
          //   xxl: 3,
        }}
        dataSource={this.data}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    );
  }
}

export default AdminMessageList;
