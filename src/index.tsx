import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app.tsx';

const TOTAL_COUNT_PLACES = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      totalCountPlaces={TOTAL_COUNT_PLACES}
    />
  </React.StrictMode>
);
