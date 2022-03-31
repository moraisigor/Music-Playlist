import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoadingPage from './pages/loading/loading-page';
import AdminSignInPage from './pages/sign-in/admin/admin-sign-in-page';
import ClientsSignInPage from './pages/sign-in/clients/clients-sign-in-page';

ReactDOM.render(
  <React.StrictMode>
    <ClientsSignInPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
