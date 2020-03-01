import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Alert,
  Badge,
  Button,
  Col,
  Drawer,
  Icon,
  Layout,
  message,
  Modal,
  Row,
  Table,
  Typography,
} from 'antd';

import text from '../text/paragraph';
import laptop from '../static/undraw_youtube_tutorial_2gn3.png';
import group from '../static/undraw_Group_chat_unwm.png';
import workshop from '../static/undraw_researching_22gp.png';

const { Title } = Typography;
const { Content } = Layout;

const prices = {
  individual: 125,
  group: 395,
  intensive: 125,
};
class Catalog extends Component {
  state = {
    cart: [],
    cartVisible: false,
    courseDescriptionBody: '',
    courseTitle: '',
    descriptionModalVisible: false,
    fetching: false,
  };

  handleCartClose = () => {
    this.setState({ cartVisible: false });
  };

  handleCartOpen = () => {
    this.setState({ cartVisible: true });
  };

  handleCloseAlert = () => {
    this.setState({ showAlert: false });
  };

  handleCloseDescription = e => {
    console.log(e);
    this.setState({
      descriptionModalVisible: false,
    });
  };

  handleDisplayCourseDescription = e => {
    const courseId = e.target.getAttribute('courseId');
    const { title, description } = this.props.programs.find(
      program => program.id === courseId
    );

    this.setState({
      descriptionModalVisible: true,
      courseTitle: title,
      courseDescriptionBody: description,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCheckout = () => {
    this.props.checkout(this.state.cart);
  };

  handleEnroll = e => {
    //check if user logged in
    if (!this.props.userToken) {
      this.handleMessage('You must be logged-in to enroll');
      return;
    }

    const courseId = e.target.getAttribute('courseId');

    // check if course already in cart to prevent double purchase
    const course = this.state.cart.find(course => courseId === course.id);
    if (course) {
      this.handleMessage('This course is already in your cart');
      return;
    }
    // find course in Root state
    let { type, id } = this.props.programs.find(
      program => program.id === courseId
    );

    const price = this.formatPrice(prices[type]);

    type =
      type === 'intensive'
        ? 'Workshop'
        : type === 'individual'
        ? 'Individual Coaching'
        : 'Group';

    const program = { type, id, key: id, price };

    this.setState(prevState => ({ cart: prevState.cart.concat(program) }));
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      descriptionModalVisible: false,
    });
  };

  handleMessage = msg => {
    message.info(msg);
  };

  handleRemoveFromCart = e => {
    const courseId = e.target.getAttribute('courseId');
    const cartItems = this.state.cart.filter(item => courseId !== item.id);
    this.setState({ cart: cartItems });
  };

  individualProgramsCols = [
    {
      title: 'Start',
      dataIndex: 'dateBegin',
      key: 'dateBegin',
    },
    {
      title: 'End',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Day',
      dataIndex: 'meetingDay',
      key: 'meetingDay',
    },
    {
      title: 'Time',
      dataIndex: 'meetingTime',
      key: 'meetingTime',
    },
    {
      title: 'Duration (hrs)',
      dataIndex: 'duration',
      key: 'duration',
    },

    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          {record.enrolled === record.capacity ? (
            <Button courseid={record.id} onClick={this.handleAddToWaitlist}>
              Add to Waitlist
            </Button>
          ) : (
            <Button
              courseid={record.id}
              onClick={this.handleEnroll}
              type="primary"
            >
              Enroll
            </Button>
          )}
        </span>
      ),
    },
  ];

  groupProgramsCols = [
    {
      title: 'Title',
      // dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button
          courseid={record.id}
          onClick={this.handleDisplayCourseDescription}
          type="link"
        >
          {record.title}
        </Button>
      ),
    },
    {
      title: 'Start',
      dataIndex: 'dateBegin',
      key: 'dateBegin',
    },
    {
      title: 'End',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Day',
      dataIndex: 'meetingDay',
      key: 'meetingDay',
    },
    {
      title: 'Time',
      dataIndex: 'meetingTime',
      key: 'meetingTime',
    },
    {
      title: 'Duration (hrs)',
      dataIndex: 'duration',
      key: 'duration',
    },

    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          {record.capacity === record.enrolled ? (
            <Button courseid={record.id} onClick={this.handleWaitlist}>
              Waitlist
            </Button>
          ) : (
            <Button
              courseid={record.id}
              onClick={this.handleEnroll}
              type="primary"
            >
              Enroll
            </Button>
          )}
        </span>
      ),
    },
  ];

  intensiveCols = [
    {
      title: 'Title',
      // dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button
          courseid={record.id}
          onClick={this.handleDisplayCourseDescription}
          type="link"
        >
          {record.title}
        </Button>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'dateBegin',
      key: 'dateBegin',
    },
    {
      title: 'Day',
      dataIndex: 'meetingDay',
      key: 'meetingDay',
    },
    {
      title: 'Time',
      dataIndex: 'meetingTime',
      key: 'meetingTime',
    },
    {
      title: 'Duration (hrs)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          {record.capacity === record.enrolled ? (
            <Button courseid={record.id} onClick={this.handleWaitlist}>
              Waitlist
            </Button>
          ) : (
            <Button
              courseid={record.id}
              onClick={this.handleEnroll}
              type="primary"
            >
              Enroll
            </Button>
          )}
        </span>
      ),
    },
  ];

  cartCols = [
    {
      title: 'Program',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Button courseid={record.id} onClick={this.handleRemoveFromCart}>
          <Icon type="close" />
        </Button>
      ),
    },
  ];

  formatPrice = num => num.toFixed(2);

  getTotal = () =>
    this.state.cart.reduce((total, item) => total + Number(item.price), 0);

  getCartData = () => {
    console.log('get cart data');
    const cart = this.state.cart.map(item => {
      const price = this.formatPrice(item.price);
      return {
        name: item.type,
        amount: price,
      };
    });

    this.setState({ cart });
  };

  getGroupSessionData = () => {
    const groupPrograms = this.props.programs.filter(program => {
      return program.type === 'group' && program.status === 'active';
    });

    return groupPrograms.map(program => {
      return {
        key: program.id,
        id: program.id,
        type: program.type,

        title: program.title,
        dateBegin: program.dateBegin,
        dateEnd: program.dateEnd,
        meetingTime: program.meetingTime,
        meetingDay: program.meetingDay,
        capacity: program.capacity,
        enrolled: program.enrolled,
        duration: program.duration,
      };
    });
  };

  getIndividualSessionData = () => {
    const indyPrograms = this.props.programs.filter(program => {
      return program.type === 'individual' && program.status === 'active';
    });

    return indyPrograms.map(program => {
      return {
        key: program.id,
        id: program.id,
        type: program.type,
        dateBegin: program.dateBegin,
        dateEnd: program.dateEnd,
        meetingTime: program.meetingTime,
        meetingDay: program.meetingDay,
        capacity: program.capacity,
        enrolled: program.enrolled,
        duration: program.duration,
      };
    });
  };

  formatMongoDate = date => {
    const dateMoment = moment(date);
    const dayNumber = dateMoment.weekday();
    const day = moment()
      .day(dayNumber)
      .format('ddd');
    return day;
  };

  getIntensivesData = () => {
    const intensivePrograms = this.props.programs.filter(program => {
      return program.type === 'intensive' && program.status === 'active';
    });

    return intensivePrograms.map(program => {
      const meetingDay = this.formatMongoDate(program.dateBegin);
      return {
        key: program.id,
        title: program.title,
        description: program.description,
        id: program.id,
        type: program.type,
        duration: program.duration,
        dateBegin: program.dateBegin,
        meetingTime: program.meetingTime,
        meetingDay,
        capacity: program.capacity,
        enrolled: program.enrolled,
      };
    });
  };

  componentDidMount() {
    //retrieve program data on page load
    this.getIndividualSessionData();
    this.getGroupSessionData();
    this.getIntensivesData();
  }

  render() {
    const {
      courseDescriptionBody,
      courseTitle,
      descriptionModalVisible,
    } = this.state;
    return (
      <>
        {this.state.descriptionModalVisible ? (
          <Modal
            visible={descriptionModalVisible}
            title={courseTitle}
            onCancel={this.handleCloseDescription}
            // onOk={this.handleOk}
          >
            {courseDescriptionBody}
          </Modal>
        ) : null}
        <Drawer
          title="Shopping Cart"
          width={500}
          onClose={this.handleCartClose}
          visible={this.state.cartVisible}
          bodyStyle={{ paddingBottom: 80 }}
          zIndex={3000}
        >
          {this.state.cart.length > 0 ? (
            <>
              <Table
                columns={this.cartCols}
                dataSource={this.state.cart}
                pagination={false}
              ></Table>
              <p
                style={{
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>
                  Total ${this.getTotal()}
                </span>
              </p>
              <div
                style={{
                  padding: '0 15px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type="primary"
                  loading={this.props.fetching}
                  disabled={this.state.cart.length === 0}
                  onClick={this.handleCheckout}
                  style={{ marginLeft: 'auto', width: '6rem' }}
                >
                  {this.props.fetching ? '' : 'Checkout'}
                </Button>
              </div>
            </>
          ) : (
            <Alert
              message="Click the blue 'Enroll' button to place a course in your shopping cart"
              type="success"
              showIcon
            />
          )}
        </Drawer>
        <div className="Cart">
          <Badge
            className="cart-counter"
            count={this.state.cart.length}
            style={{ backgroundColor: '#1890ff' }}
          >
            <Button
              id="shopping-cart"
              shape="circle"
              icon="shopping-cart"
              size="large"
              onClick={this.handleCartOpen}
            />
          </Badge>
        </div>

        <Content style={{ padding: '0 2rem' }}>
          <Title style={{ marginBottom: '3rem', marginTop: '3rem' }} level={2}>
            Programs
          </Title>
          <Row>
            <Col sm={24} md={12}>
              <div className="ImageWithTextOverlay-text-block">
                <Title level={3}>Individual Coaching</Title>
                <p>{text.indCoachp1}</p>
                <p>{text.indCoachp2}</p>
                <p>
                  <i>{text.indCoachp3}</i>
                </p>
              </div>
              {this.props.userToken ? (
                <p>
                  <i>$125 per week</i>
                </p>
              ) : null}
            </Col>
            <Col
              sm={24}
              md={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={laptop} alt="laptop on desk" style={{ width: '85%' }} />
            </Col>
          </Row>

          <Table
            className="Catalog-program-table"
            dataSource={this.getIndividualSessionData()}
            columns={this.individualProgramsCols}
            pagination={false}
          />
          <Row>
            <Col
              sm={24}
              md={12}
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={group} alt="reading group" style={{ width: '85%' }} />
            </Col>
            <Col sm={24} md={12}>
              <div className="ImageWithTextOverlay-text-block">
                <Title level={3}>Group</Title>
                <p>{text.groupp1}</p>
                <p>{text.groupp2}</p>
                <p>{text.groupp3}</p>
              </div>
              {this.props.userToken ? (
                <p>
                  <i>$395 per 4-week program</i>
                </p>
              ) : null}
            </Col>
          </Row>
          <Table
            className="Catalog-program-table"
            dataSource={this.getGroupSessionData()}
            columns={this.groupProgramsCols}
            pagination={false}
          />
          <Row>
            <Col sm={24} md={12}>
              <div className="ImageWithTextOverlay-text-block">
                <Title level={3}>Single-day Workshop</Title>
                <p>{text.workshopp1}</p>
                <p>{text.workshopp2}</p>
              </div>
              {this.props.userToken ? (
                <p>
                  <i>$125 per 2-hour workshop</i>
                </p>
              ) : null}
            </Col>
            <Col
              className="imageDisplay"
              sm={24}
              md={12}
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={workshop}
                alt="reading group"
                style={{ width: '85%' }}
              />
            </Col>
          </Row>

          <Table
            className="Catalog-program-table"
            dataSource={this.getIntensivesData()}
            columns={this.intensiveCols}
            pagination={false}
          />
        </Content>
      </>
    );
  }
}

export default withRouter(Catalog);
