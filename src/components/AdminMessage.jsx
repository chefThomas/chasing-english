import React, { Component } from 'react';
import { Button, Checkbox, Icon, Spin, Tag } from 'antd';
import '../stylesheets/css/main.css';

class AdminMessage extends Component {
  getMessageHeader = (messageType, id, status) => {
    const header =
      messageType === 'purchase'
        ? 'Enrollment'
        : messageType === 'waitlist'
        ? 'Waitlist'
        : 'Registration';
    const color =
      messageType === 'purchase'
        ? 'green'
        : messageType === 'waitlist'
        ? 'red'
        : 'orange';

    return (
      <div
        className="AdminMessage-header"
        style={{
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>
          <Tag color={status === 'read' ? '#ededed' : color}>{header}</Tag>
        </span>
        <Icon
          className="close-icon"
          type="delete"
          onClick={() => this.props.removeMessage(id)}
        />
      </div>
    );
  };

  handleToggleStatus = (id, status) => {
    this.props.changeMessageReadStatus(id, status);
  };
  render() {
    console.log(this.props);
    const { id, type, body, date, status } = this.props;
    return (
      <>
        <div
          className={
            status === 'unread'
              ? 'AdminMessage-container'
              : 'AdminMessage-container-read'
          }
          style={{
            maxWidth: '600px',
            border: '1px, solid',
            // marginLeft: 'auto',
            marginRight: 'auto',
            padding: '1rem',
          }}
        >
          <div className="AdminMessage-header">
            {this.getMessageHeader(type, id, status)}
          </div>
          <div className="AdminMessage-body" style={{ marginBottom: '0.5rem' }}>
            {body}
          </div>
          <div
            className="AdminMessage-footer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '1rem',
            }}
          >
            <span>{date}</span>
            <span>
              <Checkbox
                checked={status === 'read'}
                onChange={() => this.handleToggleStatus(id, status)}
              />
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default AdminMessage;
