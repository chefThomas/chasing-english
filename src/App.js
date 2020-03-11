import React, { Component } from 'react';
import Root from '../src/pages/Root';
import './App.css';
import { StripeProvider, Elements } from 'react-stripe-elements';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: window.Stripe('pk_test_GYVlMxH8rzVT5dlqAo3bjCUm00mcVGw6pl'),
    };
  }
  // state = { stripe: null };

  // componentDidMount() {
  //   this.setState({
  //     stripe: ,
  //   });
  // }

  render() {
    return (
      <div className="App">
        <StripeProvider stripe={this.props.stripe}>
          <Elements>
            <Root />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default App;
