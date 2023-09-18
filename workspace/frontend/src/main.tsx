import React from 'react';
import ReactDOM from 'react-dom/client';
import PageLayout from 'layout/PageLayout/PageLayout';
import App from './App.tsx';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout>
      <App />
    </PageLayout>
  </React.StrictMode>,
);
