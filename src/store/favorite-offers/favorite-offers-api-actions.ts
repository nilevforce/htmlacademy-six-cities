import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../../types/offer.ts';
import {
  APIRoute, AppRoute,
  AuthorizationStatus,
  NameSpace
} from '../../constants.ts';
import type { RootState } from '../../types/state.ts';
import { AxiosInstance } from 'axios';
import router from '../../router.ts';
import { toast } from 'react-toastify';

const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined, {
  state: RootState;
  extra: {
    api: AxiosInstance;
  };
}>(
  'favoriteOffers/fetchOffers',
  async (_arg, {
    getState,
    rejectWithValue,
    extra: { api }
  }) => {
    const state = getState();
    const authStatus = state[NameSpace.User].auth.status;

    if (authStatus !== AuthorizationStatus.Auth) {
      return rejectWithValue('Not authorized');
    }

    const { data } = await api.get<Offer[]>(APIRoute.Favorites);

    return data;
  }
);

const changeOfferFavoriteStatus = createAsyncThunk<
  Offer, {
  offerId: string;
  status: boolean;
}, {
  state: RootState;
  extra: {
    api: AxiosInstance;
  };
}
>(
  'favoriteOffers/changeStatus',
  async ({ offerId, status }, {
    getState,
    extra: { api },
    rejectWithValue
  }) => {
    const state = getState();
    const authStatus = state[NameSpace.User].auth.status;
    if (authStatus !== AuthorizationStatus.Auth) {
      await router.navigate(AppRoute.Login);
      return rejectWithValue('Not authorized');
    }

    const endpoint = APIRoute
      .OfferFavoriteStatus
      .replace(':offerId', offerId)
      .replace(':status', String(Number(status)));

    const { data } = await api.post<OfferDetails>(endpoint);

    const updatedOffer = state[NameSpace.Offers].offers.find((offer) => offer.id === data.id);

    if (!updatedOffer) {
      return rejectWithValue('Not found offer in list');
    }

    const message = data.isFavorite
      ? '✨ Added to favorites! It won’t get lost.'
      : '👋 Removed from favorites.';
    toast.info(message);

    return {
      ...updatedOffer,
      isFavorite: data.isFavorite
    };
  }
);

export {
  fetchFavoriteOffers,
  changeOfferFavoriteStatus
};

