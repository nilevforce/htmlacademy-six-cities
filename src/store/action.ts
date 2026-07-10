import { createAction } from '@reduxjs/toolkit/src';
import { Offer, OfferDetails } from '../types/offer.ts';
import { AuthorizationStatus } from '../constants.ts';
import { State } from '../types/state.ts';
import { Review } from '../types/review.ts';
import { ReviewData } from '../types/review-data.ts';

const changeCity = createAction<{ city: string }>('city/changeCity');

const fillOffers = createAction<{ offers: Offer[] }>('data/fillOffers');

const fillFavoriteOffers = createAction<{
  offers: Offer[];
}>('data/fillFavoriteOffers');

const fillCurrentOffer = createAction<{
  offer: OfferDetails;
}>('data/fillCurrentOffer');

const fillCurrentOfferReviews = createAction<{
  reviews: Review[];
}>('data/fillCurrentOfferReviews');

const fillNearbyOffers = createAction<{
  offers: Offer[];
}>('data/fillNearbyOffers');

const changeOfferFavoriteStatus = createAction<{
  offer: OfferDetails;
}>('data/changeOfferFavoriteStatus');

const addOfferReview = createAction<{
  offerId: string;
  review: ReviewData;
}>('data/addOfferReview');

const requireAuthorization = createAction<{
  authStatus: AuthorizationStatus;
  user?: State['user'];
}>('user/requireAuthorization');

export {
  changeCity,
  fillOffers,
  addOfferReview,
  fillCurrentOffer,
  fillNearbyOffers,
  fillFavoriteOffers,
  requireAuthorization,
  fillCurrentOfferReviews,
  changeOfferFavoriteStatus,
};
