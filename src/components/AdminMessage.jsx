import React, { Component } from 'react';
import { Button, Icon, Spin, Tag } from 'antd';

class AdminMessage extends Component {
  getMessageHeader = (messageType, id, date) => {
    console.log(messageType, id, date);
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
        : 'blue';

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
          <Tag color={color}>{header}</Tag>
        </span>
        <Icon type="close" onClick={() => this.props.removeMessage(id)} />
      </div>
    );
  };

  handleToggleStatus = (id, status) => {
    this.props.changeMessageReadStatus(id, status);
  };
  render() {
    console.log(this.props);
    const { id, type, body, date, status, loading } = this.props;
    return (
      <>
        <div
          className="AdminMessage-container"
          style={{
            maxWidth: '600px',
            border: '1px, solid',
            // marginLeft: 'auto',
            marginRight: 'auto',
            padding: '1rem',
          }}
        >
          <div className="AdminMessage-header">
            {this.getMessageHeader(type, id, date)}
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
              {loading ? (
                <Spin size="small" />
              ) : (
                <Button
                  type="link"
                  onClick={() => this.handleToggleStatus(id, status)}
                >
                  {status}
                </Button>
              )}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default AdminMessage;
