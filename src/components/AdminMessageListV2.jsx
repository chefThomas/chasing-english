import React, { Component } from 'react';
import '../stylesheets/css/main.css';
import AdminMessage from '../components/AdminMessage';

class AdminMessageListV2 extends Component {
  removeMessage = id => {
    console.log(id);
    this.props.remove(id, 'admin-messages');
  };

  render() {
    return (
      <div>
        {this.props.messages.map(message => (
          <AdminMessage
            {...message}
            removeMessage={this.removeMessage}
            changeMessageReadStatus={this.props.changeMessageReadStatus}
            status={message.status}
          />
        ))}
      </div>
    );
  }
}

export default AdminMessageListV2;
