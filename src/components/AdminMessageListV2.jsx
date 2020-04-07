import React, { Component } from 'react';
import '../stylesheets/css/main.css';
import AdminMessage from '../components/AdminMessage';

class AdminMessageListV2 extends Component {
  removeMessage = (id) => {
    console.log(id);
    this.props.remove(id, 'admin-messages');
  };

  render() {
    return (
      <div>
        {this.props.messages
          .sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate - aDate;
          })
          .map((message) => (
            <AdminMessage
              {...message}
              removeMessage={this.removeMessage}
              changeMessageReadStatus={this.props.changeMessageReadStatus}
              status={message.status}
              key={message.id}
            />
          ))}
      </div>
    );
  }
}

export default AdminMessageListV2;
