import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../../types/offer.ts';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../constants.ts';
import { Review } from '../../types/review.ts';
import { ReviewData } from '../../types/review-data.ts';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../../types/state.ts';

const fetchOfferById = createAsyncThunk<OfferDetails, Offer['id'], {
  extra: {
    api: AxiosInstance;
  };
}>(
  'offer/fetchOfferById',
  async (id, { extra: { api } }) => {
    const endpoint = APIRoute.Offer.replace(':offerId', id);
    const { data } = await api.get<OfferDetails>(endpoint);
    return data;
  }
);

const fetchOfferReviews = createAsyncThunk<Review[], Offer['id'], {
  extra: {
    api: AxiosInstance;
  };
}>(
  'offer/fetchOfferReviews',
  async (offerId, { extra: { api } }) => {
    const endpoint = APIRoute.OfferComments.replace(':offerId', offerId);
    const { data } = await api.get<Review[]>(endpoint);
    return data;
  }
);

const fetchNearbyOffers = createAsyncThunk<Offer[], Offer['id'], {
  extra: {
    api: AxiosInstance;
  };
}>(
  'offer/fetchNearbyOffers',
  async (offerId, { extra: { api } }) => {
    const endpoint = APIRoute.NearbyOffers.replace(':offerId', offerId);
    const { data } = await api.get<Offer[]>(endpoint);
    return data;
  }
);

const addOfferReview = createAsyncThunk<Review, {
  offerId: string;
  review: ReviewData;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offer/addOfferReview',
  async ({ offerId, review }, { extra: { api } }) => {
    const endpoint = APIRoute.OfferComments.replace(':offerId', offerId);

    const { data } = await api.post<Review>(endpoint, {
      comment: review.comment,
      rating: review.rating,
    });

    toast.success('⭐ Review successfully added!');

    return data;
  }
);

export {
  fetchOfferById,
  fetchOfferReviews,
  fetchNearbyOffers,
  addOfferReview
};
