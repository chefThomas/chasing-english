import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
ReactDOM.render(
  <BrowserRouter>
    <App stripe={window.Stripe('pk_live_llGvTLf3V1DL20DVCLFm9o0G00Q6juyUss')} />
  </BrowserRouter>,
  document.getElementById('root')
);
