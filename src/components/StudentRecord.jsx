import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import '../stylesheets/css/main.css';

class StudentRecord extends Component {
  cols = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'id',
    },
    {
      title: 'Begin',
      dataIndex: 'dateBegin',
      key: 'dateBegin',
    },
    {
      title: 'End',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  formatDate = date => {
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US');
  };

  getStudentRecordData = () => {
    const { studentRecord } = this.props;

    return studentRecord.map(el => {
      const dateBegin = this.formatDate(el.dateBegin);
      const dateEnd = this.formatDate(el.dateEnd);

      return {
        key: el.id,
        title: el.title,
        type: el.type,
        dateBegin,
        dateEnd,
        status: el.status,
      };
    });
  };

  render() {
    return (
      <Modal
        title="Student Record"
        visible={this.props.showStudentRecord}
        onOk={this.props.closeStudentRecord}
        onCancel={this.props.closeStudentRecord}
        className="StudentRecord"
      >
        <Table
          bordered
          dataSource={this.getStudentRecordData()}
          columns={this.cols}
        />
      </Modal>
    );
  }
}

export default StudentRecord;
