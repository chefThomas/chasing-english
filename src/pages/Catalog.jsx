import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Alert,
  Badge,
  Button,
  Col,
  Divider,
  Drawer,
  Icon,
  Layout,
  message,
  Modal,
  Row,
  Table,
  Tag,
  Tooltip,
} from 'antd';

import checkCourseAvailability from '../utilities/checkCourseAvailability.js';

import getCredentials from '../utilities/getCredentialsFromLocalStorage.js';
import purchase from '../utilities/purchase';

import '../stylesheets/css/main.css';

import Footer from '../components/Footer';
import RefundPolicy from '../components/RefundPolicy';

import text from '../text/paragraph';
import laptop from '../static/undraw_youtube_tutorial_2gn3.png';
import group from '../static/undraw_Group_chat_unwm.png';
import workshop from '../static/undraw_researching_22gp.png';
import { getDefaultFormatCodeSettings } from 'typescript';

const { Content } = Layout;

class Catalog extends Component {
  state = {
    cart: [],
    cartVisible: false,
    courseDescriptionBody: '',
    courseTitle: '',
    descriptionModalVisible: false,
    buttonLoading: false,
    fullCourseDialogMessages: [],
    fullCourseDialogVisible: false,
    fullCourses: [],
    showPolicyModal: false,
  };

  handleCartWaitlist = () => {
    this.props.cartWaitlist(this.state.fullCourses);
  };

  displayFullCourseMessage = (fullCourses) => {
    const fullCourseDialogMessages = fullCourses.map(({ data }) => {
      return `${data.title} is no longer available and has been removed from the cart`;
    });
    this.setState({ fullCourseDialogMessages, fullCourseDialogVisible: true });
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

  handleCloseDescription = (e) => {
    this.setState({
      descriptionModalVisible: false,
    });
  };

  handleDisplayCourseDescription = (e) => {
    const courseId = e.target.getAttribute('courseId');
    const { title, description } = this.props.programs.find(
      (program) => program.id === courseId
    );

    this.setState({
      descriptionModalVisible: true,
      courseTitle: title,
      courseDescriptionBody: description,
    });
  };

  handleCartWaitlist = (courseId) => {
    if (typeof courseId === 'string') {
      this.props.addGuardianToWaitlist(courseId, this.props.user.id);
    } else {
      this.props.addGuardianToArrayOfProgramWaitlists(
        this.state.fullCourses,
        this.props.user.id
      );
    }

    // this.props.add;
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCheckout = async () => {
    // display loading icon in checkout button
    this.setState({ buttonLoading: true });

    // returns array of programs that may have become full after enrollment, but before checkout
    const fullCoursesArr = await checkCourseAvailability(
      this.state.cart,
      this.props.userToken
    );
    // show user which courses in cart are full
    if (fullCoursesArr.length) {
      this.displayFullCourseMessage(fullCoursesArr);
      // stop loading icon in button and set full course state
      const fullCourses = fullCoursesArr.map((course) => course.data);
      this.setState({ buttonLoading: false, fullCourses });
      // extract ids of full courses
      const fullCourseIds = fullCoursesArr.map(({ data: { id } }) => {
        return id;
      });
      // filter out full courses
      const coursesRemainingInCart = this.state.cart.filter((item) => {
        return !fullCourseIds.includes(item.id);
      });

      this.setState({ cart: coursesRemainingInCart });
      // remove full courses from cart, and ask user to waitlist
    } else {
      // purchase programs
      const {
        data: { id },
      } = await purchase(this.props.user.customerId, this.state.cart);

      const stripePublicKey =
        process.env.NODE_ENV === 'development'
          ? 'pk_test_GYVlMxH8rzVT5dlqAo3bjCUm00mcVGw6pl'
          : 'pk_live_llGvTLf3V1DL20DVCLFm9o0G00Q6juyUss';
      console.log(id);
      const stripe = await loadStripe(stripePublicKey);

      try {
        console.log(id);
        await stripe
          .redirectToCheckout({
            sessionId: id,
          })
          .then((res) => {
            console.log('redirect to checkout successful');
            this.setState({ buttonLoading: false });
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleEnroll = (courseId) => {
    //check if user logged in
    if (!this.props.userToken) {
      this.handleMessage('You must be logged-in to enroll');
      return;
    }

    // check if course already in cart to prevent double purchase
    const course = this.state.cart.find((course) => courseId === course.id);
    if (course) {
      this.handleMessage('This may already be in your cart');
      return;
    }
    // find course in Root state
    let { type, id, title, price } = this.props.programs.find(
      (program) => program.id === courseId
    );

    const formattedPrice = this.formatPrice(price);

    type =
      type === 'intensive'
        ? 'Workshop'
        : type === 'individual'
        ? 'Individual Coaching'
        : 'Group';

    const program = { type, id, key: id, price: formattedPrice, title };

    this.setState((prevState) => ({ cart: prevState.cart.concat(program) }));
    this.handleMessage('Added to cart!');
  };

  handleOk = (e) => {
    this.setState({
      descriptionModalVisible: false,
    });
  };

  makeProgramButton = (record) => {
    if (!this.props.user && record.enrolled >= record.capacity) {
      return (
        <Button onClick={() => message.error('Please log in first')}>
          Add to Waitlist
        </Button>
      );
    }

    if (!this.props.user) {
      return (
        <Button
          onClick={() => message.error('Please log in first')}
          type="primary"
        >
          Enroll
        </Button>
      );
    }

    const { onWaitlists, coursesPurchased, userType } = this.props.user;

    if (userType !== 'guardian') {
      return (
        <Button
          onClick={() => message.error('Please log in first')}
          type="primary"
        >
          Enroll
        </Button>
      );
    }

    const courseIsFull = record.enrolled >= record.capacity;
    const userIsWaitlisted = onWaitlists.includes(record.id);
    const studentIsEnrolled = coursesPurchased.includes(record.id);

    // student id
    if (studentIsEnrolled) {
      return (
        <Tooltip
          placement="topLeft"
          title="Course details will be emailed to you soon"
        >
          <Tag color="green" type="success">
            Enrolled
          </Tag>
        </Tooltip>
      );
    }

    if (userIsWaitlisted) {
      return (
        <Tooltip
          placement="topLeft"
          title="We'll let you know ASAP if a spot opens up"
        >
          <Tag color="volcano">On waitlist</Tag>
        </Tooltip>
      );
    }
    if (courseIsFull && !userIsWaitlisted) {
      return (
        <Button onClick={() => this.handleCartWaitlist(record.id)}>
          Add to waitlist
        </Button>
      );
    }

    return (
      <Button onClick={() => this.handleEnroll(record.id)} type="primary">
        Enroll
      </Button>
    );
  };

  handleMessage = (msg) => {
    message.info(msg);
  };

  handleRemoveFromCart = (e) => {
    const courseId = e.target.getAttribute('courseId');
    const cartItems = this.state.cart.filter((item) => courseId !== item.id);
    this.setState({ cart: cartItems });
  };

  individualProgramsColsUser = [
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => <span>{this.makeProgramButton(record)}</span>,
    },
  ];

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
      render: (text, record) => <span>{this.makeProgramButton(record)}</span>,
    },
  ];

  groupProgramsColsUser = [
    {
      title: 'Title',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => <span>{this.makeProgramButton(record)}</span>,
    },
  ];

  groupProgramsCols = [
    {
      title: 'Title',
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
      render: (text, record) => <span>{this.makeProgramButton(record)}</span>,
    },
  ];

  intensiveColsUser = [
    {
      title: 'Title',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => <span>{this.makeProgramButton(record)}</span>,
    },
  ];

  intensiveCols = [
    {
      title: 'Title',
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
      render: (text, record) => <span>{this.makeProgramButton(record)}</span>,
    },
  ];

  cartCols = [
    {
      title: 'Program',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
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

  formatPrice = (num) => num.toFixed(2);

  getTotal = () =>
    this.state.cart.reduce((total, item) => total + Number(item.price), 0);

  getCartData = () => {
    console.log('get cart data');
    const cart = this.state.cart.map((item) => {
      const price = this.formatPrice(item.price);
      return {
        name: item.type,
        amount: price,
      };
    });

    this.setState({ cart });
  };

  getGroupSessionData = (season) => {
    let groupPrograms = this.props.programs.filter((program) => {
      // filter active group
      return program.type === 'group' && program.status === 'active';
    });

    // filter  by season
    const result = groupPrograms.filter((program) => {
      const earlyFallStart = new Date('2020-09-14');
      // const earlyFallEnd = new Date('2020-10-16')
      const lateFallStart = new Date('2020-10-19');
      // const lateFallEnd = new Date('2020-11-20')
      const earlyWinterStart = new Date('2020-11-30');
      // const earlyWinterEnd = new Date('2020-12-18')

      const dateBegin = new Date(program.dateBegin);
      // const dateEnd = new Date(program.dateEnd);

      if (season === 'earlyFall') {
        return dateBegin >= earlyFallStart && dateBegin < lateFallStart;
      }

      if (season === 'lateFall') {
        return dateBegin >= lateFallStart && dateBegin < earlyWinterStart;
      }

      if (season === 'earlyWinter') {
        return dateBegin >= earlyWinterStart;
      }
    });

    return result
      .map((program) => {
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
          waitlistedGuardians: program.waitlistedGuardians,
          roster: program.roster,
          price: `$${program.price}`,
        };
      })
      .sort((a, b) => new Date(a.dateBegin) - new Date(b.dateBegin));
  };

  formatMongoDate = (date) => {
    const dateMoment = moment(date);
    const dayNumber = dateMoment.weekday();
    const day = moment().day(dayNumber).format('ddd');
    return day;
  };

  async componentDidMount() {
    const { user } = this.props;
    const credentials = getCredentials();
    console.log(user, credentials);
    if (!user && credentials) {
      this.props.login(credentials);
    }
  }

  render() {
    const {
      courseDescriptionBody,
      courseTitle,
      descriptionModalVisible,
    } = this.state;
    return (
      <>
        <Modal
          visible={descriptionModalVisible}
          title={courseTitle}
          onCancel={this.handleCloseDescription}
          // onOk={this.handleOk}
        >
          {courseDescriptionBody}
        </Modal>
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
                  loading={this.state.buttonLoading}
                  disabled={this.state.cart.length === 0}
                  onClick={this.handleCheckout}
                  style={{
                    marginLeft: 'auto',
                    marginBottom: '1rem',
                    width: '6rem',
                  }}
                >
                  {this.state.buttonLoading ? '' : 'Checkout'}
                </Button>
              </div>
              {/* <div style={{ display: 'flex' }}>
                <Button
                  type="link"
                  onClick={() => this.setState({ showPolicyModal: true })}
                  style={{ marginLeft: 'auto' }}
                >
                  Refund Policy
                </Button>
              </div> */}
              <RefundPolicy />
              <p></p>
            </>
          ) : (
            <Alert
              message="Click the blue 'Enroll' button to place a course in your shopping cart"
              type="success"
              showIcon
            />
          )}
          <div
            style={{
              display: this.state.fullCourseDialogVisible ? 'block' : 'none',
            }}
            className="FullClassAlert"
          >
            <Divider />
            {this.state.fullCourseDialogMessages.map((msg) => (
              <Alert
                style={{ marginBottom: '0.5rem' }}
                message={msg}
                type="info"
                key={msg}
              />
            ))}
            <br></br>
            <div>
              Click the waitlist button below if you would like to be added to
              the course not, go ahead and finish checking out if you have other
              programs in your cart.
            </div>
            <br></br>
            <div>
              <Button
                style={{ marginRight: '1.5rem' }}
                onClick={() => this.handleCartWaitlist(this.state.waitlist)}
                type="primary"
              >
                Waitlist
              </Button>
              <Button onClick={this.handleCartClose}>Cancel</Button>
            </div>
          </div>
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

        <Content>
          <h1>Group Programs</h1>
          <Row className="Catalog-banner flex">
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
                <p>{text.groupp1}</p>
                <p>{text.groupp2}</p>
              </div>
            </Col>
          </Row>
          {/* <div className="table-title">
            <h2 style={{ display: 'inline-block', marginRight: '1rem' }}>
              Early Fall
            </h2>
            9/14/20 through 10/16/20
          </div>

          <Table
            className="Catalog-program-table"
            dataSource={this.getGroupSessionData('earlyFall')}
            columns={
              this.props.user
                ? this.groupProgramsColsUser
                : this.groupProgramsCols
            }
            pagination={{ pageSize: 4 }}
          /> */}
          <div className="table-title">
            <h2 style={{ display: 'inline-block', marginRight: '1rem' }}>
              Late Fall
            </h2>
            10/19/20 through 11/20/20
          </div>
          <Table
            className="Catalog-program-table"
            dataSource={this.getGroupSessionData('lateFall')}
            columns={
              this.props.user
                ? this.groupProgramsColsUser
                : this.groupProgramsCols
            }
            pagination={{ pageSize: 4 }}
          />
          <div className="table-title">
            <h2 style={{ display: 'inline-block', marginRight: '1rem' }}>
              Early Winter
            </h2>
            11/30/20 through 12/18/20
          </div>
          <Table
            className="Catalog-program-table"
            dataSource={this.getGroupSessionData('earlyWinter')}
            columns={
              this.props.user
                ? this.groupProgramsColsUser
                : this.groupProgramsCols
            }
            pagination={{ pageSize: 4 }}
          />
        </Content>
        <Footer />
      </>
    );
  }
}

export default withRouter(Catalog);
