import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Root from '../src/pages/Root';
import './App.css';

function App() {
  return (
    <div className="App">
      <StripeProvider apiKey="pk_test_GYVlMxH8rzVT5dlqAo3bjCUm00mcVGw6plK">
        <Elements>
          <Root />
        </Elements>
      </StripeProvider>
    </div>
  );
}

export default App;
