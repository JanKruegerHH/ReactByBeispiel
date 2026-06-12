import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CrudDashboard from "./CrudDashboard";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CrudDashboard disableCustomTheme={true} />
  </React.StrictMode>
);

