import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
ReactDOM.render(
  <BrowserRouter>
    <App stripe={window.Stripe('pk_test_GYVlMxH8rzVT5dlqAo3bjCUm00mcVGw6pl')} />
  </BrowserRouter>,
  document.getElementById('root')
);
