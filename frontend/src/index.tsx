import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AdminPlansListPage from './pages/admin-dashboard/plans/list/admin-plans-list-page';
import AdminPlansEditPage from './pages/admin-dashboard/plans/edit/admin-plans-edit-page';

ReactDOM.render(
  <React.StrictMode>
    <AdminPlansEditPage isNew={false} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
