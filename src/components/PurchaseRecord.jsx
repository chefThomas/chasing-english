import React, { Component } from 'react';
import { Modal, Table } from 'antd';

class PurchaseRecord extends Component {
  state = {
    showPurchaseRecord: false,
  };
  closeRoster = () => {
    this.props.closepurchaseRecord();
  };
  cols = [
    {
      title: 'Program title',
      dataIndex: 'title',
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

  getGuardianPurchaseData = () => {
    const { guardianPurchaseHistory } = this.props;

    return guardianPurchaseHistory.map(el => {
      const dateBegin = this.formatDate(el.dateBegin);
      const dateEnd = this.formatDate(el.dateEnd);

      return {
        key: el.id,
        title: el.title,
        dateBegin,
        dateEnd,
        status: el.status,
      };
    });
  };

  render() {
    return (
      <Modal
        title="Purchase Record"
        visible={this.props.showGuardianPurchases}
        onOk={this.props.closeRoster}
        onCancel={this.props.closeRoster}
      >
        <Table
          bordered
          dataSource={this.getGuardianPurchaseData()}
          columns={this.cols}
        />
      </Modal>
    );
  }
}

export default PurchaseRecord;
