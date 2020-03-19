import React, { Component } from 'react';
import { List, Card, Icon, Divider } from 'antd';
import moment from 'moment';

class AdminMessageList extends Component {
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
        dataSource={this.props.messages}
        renderItem={item => {
          const date = moment(item.date).format('MM/DD/YYYY');
          return (
            <List.Item>
              <Card hoverable title={item.title}>
                {item.type === 'purchase' ? (
                  <Icon
                    style={{ fontSize: '24px', color: '#08c' }}
                    type="dollar"
                  />
                ) : null}
                {date}
                <Divider />
                {item.body}
              </Card>
            </List.Item>
          );
        }}
      />
    );
  }
}

export default AdminMessageList;
