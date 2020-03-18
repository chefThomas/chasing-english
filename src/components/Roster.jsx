import React, { Component } from 'react';
import { Modal, Table } from 'antd';

class Roster extends Component {
  closeRoster = () => {
    this.props.closeRoster();
  };
  rosterCols = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  getRosterData = () => {
    return this.props.roster.map(student => {
      return {
        key: student.id,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
      };
    });
  };

  render() {
    return (
      <Modal
        title={`${this.props.rosterCourseTitle} roster`}
        visible={this.props.showRoster}
        onOk={this.closeRoster}
        onCancel={this.closeRoster}
      >
        <Table
          bordered
          dataSource={this.getRosterData()}
          columns={this.rosterCols}
        />
      </Modal>
    );
  }
}

export default Roster;
