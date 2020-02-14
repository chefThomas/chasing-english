import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Tabs,
  Button,
  Table,
  Typography,
  Icon,
  Drawer,
  Badge,
  Alert,
  message,
} from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { TabPane } = Tabs;

const Style = {
  padLeftReg: { paddingLeft: '10px' },
};

const prices = {
  individual: 200,
  group: 300,
  intensive: 100,
};

class Catalog extends Component {
  state = {
    showCart: false,
    cart: [],
  };
  handleCartOpen = () => {
    this.setState({ showCart: true });
  };

  handleCartClose = () => {
    this.setState({ showCart: false });
  };

  handleCheckout = () => {
    console.log('cart contents: ', this.state.cart);
  };

  handleRemoveFromCart = e => {
    const courseId = e.target.getAttribute('courseId');
    const cartItems = this.state.cart.filter(item => courseId !== item.id);
    this.setState({ cart: cartItems });
  };
  handleEmptyCart = () => {
    this.setState({ cart: [] });
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
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Enrolled',
      dataIndex: 'enrolled',
      key: 'enrolled',
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
      dataIndex: 'title',
      key: 'title',
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
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Enrolled',
      dataIndex: 'enrolled',
      key: 'enrolled',
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
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Enrolled',
      dataIndex: 'enrolled',
      key: 'enrolled',
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
    const cart = this.state.cart.map(item => {
      const price = this.formatPrice(item.price);
      return {
        type: item.type,
        price,
        id: item.id,
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

    // get day from dateBegin

    return intensivePrograms.map(program => {
      const meetingDay = this.formatMongoDate(program.dateBegin);
      return {
        key: program.id,
        id: program.id,
        type: program.type,

        dateBegin: program.dateBegin,
        meetingTime: program.meetingTime,
        meetingDay,
        capacity: program.capacity,
        enrolled: program.enrolled,
      };
    });
  };

  handleMessage = msg => {
    message.info(msg);
  };

  handleEnroll = e => {
    //check if user logged in
    if (!this.props.userToken) {
      this.handleMessage('You must be logged-in to enroll');
      return;
    }

    const courseId = e.target.getAttribute('courseId');

    // check if course already in cart to prevent double charge
    const course = this.state.cart.find(course => courseId === course.id);
    if (course) {
      this.handleMessage('This course is already in your cart');
      return;
    }
    // find course in root
    const { type, id } = this.props.programs.find(
      program => program.id === courseId
    );
    const price = this.formatPrice(prices[type]);
    const program = { type, price, id, key: id };

    this.setState(prevState => ({ cart: prevState.cart.concat(program) }));
  };

  componentDidMount() {
    //retrieve program data on page load
    this.getIndividualSessionData();
    this.getGroupSessionData();
    this.getIntensivesData();
    this.getCartData();
  }

  render() {
    return (
      <>
        <Drawer
          title="Shopping Cart"
          width={500}
          onClose={this.handleCartClose}
          visible={this.state.showCart}
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
                  disabled={this.state.cart.length === 0}
                  onClick={this.handleCheckout}
                  style={{ marginLeft: 'auto' }}
                >
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <Alert
              message="Click the blue 'Enroll' button to place a course in the cart"
              type="success"
              showIcon
            />
          )}
        </Drawer>
        <Button
          shape="circle"
          style={{
            fontSize: '2rem',
            border: 'none',
            zIndex: '2000',
            position: 'absolute',
            top: '78px',
            right: '25px',
            // outline: 'none',
            backgroundColor: 'rgba(0,0,0,0)',
          }}
          onClick={this.handleCartOpen}
        >
          <Badge count={this.state.cart.length}>
            <Icon style={{ fontSize: '2rem' }} type="shopping-cart" />
          </Badge>
        </Button>

        <Tabs type="card">
          <TabPane tab="Programs" key="1">
            <Title style={Style.padLeftReg} level={3}>
              Individual Coaching
            </Title>
            <Table
              dataSource={this.getIndividualSessionData()}
              columns={this.individualProgramsCols}
            />
            <Title style={Style.padLeftReg} className="Table_title" level={3}>
              Group Programs
            </Title>
            <Table
              dataSource={this.getGroupSessionData()}
              columns={this.groupProgramsCols}
            />
            <Title style={Style.padLeftReg} className="Table_title" level={3}>
              Single-day Workshop
            </Title>
            <Table
              dataSource={this.getIntensivesData()}
              columns={this.intensiveCols}
            />
          </TabPane>
          <TabPane tab="My Schedule" key="2">
            <Title style={Style.padLeftReg} level={3}>
              Individual Coaching
            </Title>
            <Table
              dataSource={this.getIndividualSessionData()}
              columns={this.individualProgramsCols}
            />
            <Title style={Style.padLeftReg} className="Table_title" level={3}>
              Group Programs
            </Title>

            <Table
              dataSource={this.getGroupSessionData()}
              columns={this.groupProgramsCols}
            />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default withRouter(Catalog);
