import React, { Component } from 'react';
import Root from '../src/pages/Root';
import './App.css';
import { StripeProvider, Elements } from 'react-stripe-elements';

class App extends Component {
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
