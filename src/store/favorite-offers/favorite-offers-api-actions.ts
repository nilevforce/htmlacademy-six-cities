import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../../types/offer.ts';
import {
  APIRoute, AppRoute,
  AuthorizationStatus,
  NameSpace
} from '../../constants.ts';
import { State } from '../../types/state.ts';
import { AxiosInstance } from 'axios';
import router from '../../router.ts';
import { toast } from 'react-toastify';

const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined, {
  extra: {
    api: AxiosInstance;
  };
}>(
  'favoriteOffers/fetchOffer',
  async (_arg, {
    getState,
    rejectWithValue,
    extra: { api }
  }) => {
    const state = getState() as State;
    const authStatus = state[NameSpace.User].auth.status;

    if (authStatus !== AuthorizationStatus.Auth) {
      return rejectWithValue('Not authorized');
    }

    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    return data;
  }
);

// TODO:
//  Мне нужно, чтобы этот метод возвращал Offer.
//  Сейчас эндпоит возвращает OfferDetails.
//  Это нужно, чтобы потом внутри слайса в редьюсере можно было добавить оффер
//  в список избранных оффеов, а иначе придется руками собирать в редьюсере тип Offer.
//  И сейчас, когда я обращаюсь к глобальному состоянию, делаю поиск оффера
const changeOfferFavoriteStatus = createAsyncThunk<
  // Тут возвращаемый тип надо тоже менять на Offer
  OfferDetails, {
  offerId: string;
  status: boolean;
}, {
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
    const state = getState() as State;
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

    // Поиск оффера в слайсе OFFERS
    const updatedOffer = state[NameSpace.Offers].offers.find((offer) => offer.id === data.id);

    if (!updatedOffer) {
      return rejectWithValue('Not found offer in list');
    }

    // Делаем поверхностную копию найденного объекта
    // обновляем isFavorite, чтобы вернуть обновленный оффер с типом Offer
    // const updatedOfferForReturn = {
    //   ...updatedOffer,
    //   isFavorite: data.isFavorite
    // };

    const message = data.isFavorite
      ? '✨ Added to favorites! It won’t get lost.'
      : '👋 Removed from favorites.';
    toast.info(message);

    // ПРОБЛЕМА. Если возвращать значение updatedOfferForReturn,
    // то появляется ошибка цикла у typ State
    return data;
  }
);

export {
  fetchFavoriteOffers,
  changeOfferFavoriteStatus
};

