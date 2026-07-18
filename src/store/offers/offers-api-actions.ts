import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Offer } from '../../types/offer.ts';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../constants.ts';

const fetchOffers = createAsyncThunk<
  Offer[],
  undefined, {
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/fetchOffers',
  async (_arg, { extra: { api } }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export {
  fetchOffers
};
