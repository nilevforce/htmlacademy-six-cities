import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../constants.ts';
import {
  changeOfferFavoriteStatus,
  fillCurrentOffer,
  fillCurrentOfferReviews,
  fillFavoriteOffers,
  fillNearbyOffers,
  fillOffers,
  requireAuthorization,
} from './action.ts';
import { Offer, OfferDetails } from '../types/offer.ts';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user-data.ts';
import { dropToken, getToken, setToken } from '../services/token.ts';
import router from '../router.ts';
import { Review } from '../types/review.ts';
import { toast } from 'react-toastify';
import { ReviewData } from '../types/review-data.ts';

const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/fetchFavoriteOffersAction',
  async (_arg, { dispatch, extra: { api } }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(fillFavoriteOffers({ offers: data }));
  }
);

const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/fetchOffersAction',
  async (_arg, { dispatch, getState, extra: { api } }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(fillOffers({ offers: data }));

    const { authStatus } = getState();
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }
);

const fetchOfferByIdAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/fetchOfferByIdAction',
  async (id, { dispatch, extra: { api } }) => {
    const endpoint = APIRoute.Offer.replace(':offerId', id);
    const { data } = await api.get<OfferDetails>(endpoint);
    dispatch(fillCurrentOffer({ offer: data }));
  }
);

const fetchOfferReviewsAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/fetchOfferReviewsAction',
  async (offerId, { dispatch, extra: { api } }) => {
    const endpoint = APIRoute.OfferComments.replace(':offerId', offerId);
    const { data } = await api.get<Review[]>(endpoint);
    dispatch(fillCurrentOfferReviews({ reviews: data }));
  }
);

const fetchNearbyOffersAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/fetchNearbyOffersAction',
  async (offerId, { dispatch, extra: { api } }) => {
    const endpoint = APIRoute.NearbyOffers.replace(':offerId', offerId);
    const { data } = await api.get<Offer[]>(endpoint);
    dispatch(fillNearbyOffers({ offers: data }));
  }
);

const changeOfferFavoriteStatusAction = createAsyncThunk<void, {
  offerId: string;
  status: boolean;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/changeOfferFavoriteStatusAction',
  async ({ offerId, status }, { dispatch, getState, extra: { api } }) => {
    if (getState().authStatus !== AuthorizationStatus.Auth) {
      await router.navigate(AppRoute.Login);
      return;
    }

    const endpoint = APIRoute
      .OfferFavoriteStatus
      .replace(':offerId', offerId)
      .replace(':status', String(Number(status)));
    const { data } = await api.post<OfferDetails>(endpoint);

    const message = data.isFavorite
      ? '✨ Added to favorites! It won’t get lost.'
      : '👋 Removed from favorites.';
    toast.success(message);

    dispatch(changeOfferFavoriteStatus({ offer: data }));
  }
);

const checkUserAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'user/checkUserAuthAction',
  async (_arg, { dispatch, extra: { api } }) => {
    try {
      const token = getToken();

      if (!token) {
        dispatch(requireAuthorization({ authStatus: AuthorizationStatus.NoAuth }));
        return;
      }

      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization({
        authStatus: AuthorizationStatus.Auth,
        user: {
          email: data.email,
          name: data.name,
          isPro: data.isPro,
          avatarUrl: data.avatarUrl
        }
      }));
    } catch {
      dispatch(requireAuthorization({ authStatus: AuthorizationStatus.NoAuth }));
    }
  }
);

const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'user/loginAction',
  async ({ email, password }, { dispatch, extra: { api } }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password
    });

    setToken(data.token);

    dispatch(requireAuthorization({
      authStatus: AuthorizationStatus.Auth,
      user: {
        email: data.email,
        name: data.name,
        isPro: data.isPro,
        avatarUrl: data.avatarUrl
      }
    }));

    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());

    await router.navigate(AppRoute.Root);
  }
);

const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'user/logoutAction',
  async (_arg, { dispatch, extra: { api } }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization({ authStatus: AuthorizationStatus.NoAuth }));
    await router.navigate(AppRoute.Login);
  }
);

const addOfferReviewAction = createAsyncThunk<void, {
  offerId: string;
  review: ReviewData;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: {
    api: AxiosInstance;
  };
}>(
  'offers/addOfferReviewAction',
  async ({ offerId, review }, { dispatch, extra: { api } }) => {
    const endpoint = APIRoute.OfferComments.replace(':offerId', offerId);

    await api.post<Review[]>(endpoint, {
      comment: review.comment,
      rating: review.rating,
    });

    dispatch(fetchOfferReviewsAction(offerId));

    toast.success('⭐ Review successfully added!');
  }
);

export {
  loginAction,
  logoutAction,
  fetchOffersAction,
  checkUserAuthAction,
  fetchOfferByIdAction,
  addOfferReviewAction,
  fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  fetchFavoriteOffersAction,
  changeOfferFavoriteStatusAction,
};
