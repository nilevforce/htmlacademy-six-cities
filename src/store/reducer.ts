import { CITIES } from '../constants.ts';
import offers from '../mocks/offers.ts';
import { createReducer } from '@reduxjs/toolkit/src';
import { changeCity, fillOffers } from './action.ts';

const initialState = {
  city: CITIES[0],
  offers: offers,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload.offers;
    });
});

export {
  appReducer
};
