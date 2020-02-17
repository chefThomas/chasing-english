import React, { Component } from 'react';
import Root from '../src/pages/Root';
import './App.css';
import { StripeProvider, Elements } from 'react-stripe-elements';

class App extends Component {
  state = { stripe: null };

  componentDidMount() {
    this.setState({
      stripe: window.Stripe('pk_test_GYVlMxH8rzVT5dlqAo3bjCUm00mcVGw6pl'),
    });
  }

  render() {
    return (
      <div className="App">
        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <Root />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default App;
