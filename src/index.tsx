import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offer } from './types/offer.ts';
import App from './components/app/app.tsx';
import { offers } from './mocks/offers.ts';

const OFFER_LIST: Offer[] = structuredClone(offers);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={OFFER_LIST}
      favorites={
        OFFER_LIST.filter((offer) => offer.isFavorite)
      }
    />
  </React.StrictMode>
);
