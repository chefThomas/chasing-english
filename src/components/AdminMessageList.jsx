import React, { Component } from 'react';
import { List, Card, Icon, Spin } from 'antd';
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

  getMessageHeader = (messageType, id, date) => {
    console.log(messageType, date);
    const header =
      messageType === 'purchase'
        ? 'New Enrollment'
        : messageType === 'waitlist'
        ? 'New Waitlisting'
        : 'New Registrant';

    return (
      <div className="message-header">
        <span>{header}</span>
        <Icon type="close" onClick={() => this.handleDelete(id)} />
      </div>
    );
  };

  render() {
    return (
      <List
        style={{ margin: '2rem' }}
        itemLayout="vertical"
        size="large"
        dataSource={this.props.messages}
        renderItem={item => {
          return (
            <List.Item>
              <Card
                title={this.getMessageHeader(item.type, item.id, item.date)}
                hoverable
              >
                <div className="message-body">{item.body}</div>
                <div className="message-footer">
                  <span>{item.date}</span>
                  <span className="message-read-status">
                    <a
                      onClick={() =>
                        this.handleReadStatus(item.id, item.status)
                      }
                    >
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
