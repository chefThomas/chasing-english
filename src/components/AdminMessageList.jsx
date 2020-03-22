import React, { Component } from 'react';
import { List, Card, Icon } from 'antd';
import '../stylesheets/css/main.css';

class AdminMessageList extends Component {
  handleReadStatus = (id, read) => {
    console.log(read);
    this.props.changeMessageReadStatus(id, read);
  };

  handleDelete = id => {
    console.log(id);
    this.props.remove(id, 'admin-messages');
  };

  getMessageHeader = (messageType, id) => {
    switch (messageType) {
      case 'purchase':
        return (
          <div className="message-header">
            <span>ENROLLMENT</span>
            <Icon
              type="close"
              color="red"
              onClick={() => this.handleDelete(id)}
            />
          </div>
        );
      case 'waitlist':
        return (
          <div className="message-header">
            <span>User Waitlisted</span>
            <Icon type="close" onClick={() => this.handleDelete(id)} />
          </div>
        );
      case 'register':
        return (
          <div className="message-header">
            <span>User Waitlisted</span>
            <Icon type="close" onClick={() => this.handleDelete(id)} />
          </div>
        );
    }
  };

  render() {
    return (
      <List
        style={{ margin: '2rem' }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
        }}
        dataSource={this.props.messages}
        renderItem={item => {
          return (
            <List.Item>
              <Card
                onClick={() => this.handleReadStatus(item.id, item.status)}
                title={this.getMessageHeader(item.type, item.id)}
                hoverable
              >
                <div className="message-body">{item.body}</div>
                <div className="message-footer">
                  <span>{item.date}</span>
                  <span className="message-read-status">
                    <a onClick={() => this.handleReadStatus(item.id)}>
                      {item.status === 'unread' ? 'unread' : 'read'}
                    </a>
                  </span>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
    );
  }
}

export default AdminMessageList;
