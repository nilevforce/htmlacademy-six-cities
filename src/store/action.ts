import { createAction } from '@reduxjs/toolkit/src';
import { Offer } from '../types/offer.ts';

const changeCity = createAction<{ city: string }>('city/changeCity');
const fillOffers = createAction<{ offers: Offer[] }>('offers/fillOffers');

export {
  changeCity,
  fillOffers
};
