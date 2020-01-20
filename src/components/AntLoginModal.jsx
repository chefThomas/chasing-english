import React from "react";
import { Modal, Button } from "antd";
import WrappedNormalLoginForm from "./AntLogin";
import "../stylesheets/css/main.css";

class AntLoginModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button
          className="NavButton dark-on-dark navbar"
          onClick={this.showModal}
        >
          Login
        </Button>
        <Modal
          title="Welcome Back"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <WrappedNormalLoginForm />
        </Modal>
      </div>
    );
  }
}

export default AntLoginModal;
