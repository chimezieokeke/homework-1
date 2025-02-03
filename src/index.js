// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TimersDashboard from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TimersDashboard />
  </React.StrictMode>
);