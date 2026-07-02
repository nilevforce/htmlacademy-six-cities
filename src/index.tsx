import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Offer } from './types/offer.ts';
import { City } from './types/city.ts';
import offers from './mocks/offers.ts';
import cities from './mocks/cities.ts';
import reviews from './mocks/reviews.ts';
import App from './components/app/app.tsx';
import { Review } from './types/review.ts';
import store from './store/store.ts';

const OFFER_LIST: Offer[] = structuredClone(offers);
const CITY_LIST: City[] = cities;
const REVIEW_LIST: Review[] = reviews;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={OFFER_LIST}
        cities={CITY_LIST}
        reviews={REVIEW_LIST}
        favorites={
          OFFER_LIST.filter((offer) => offer.isFavorite)
        }
      />
    </Provider>
  </React.StrictMode>
)
;
