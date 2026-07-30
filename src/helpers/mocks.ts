import * as faker from 'faker';

import { AuthData } from '../types/auth-data';
import { City } from '../types/city';
import { Location } from '../types/location';
import { MapPoint } from '../types/map-points';
import { Offer, OfferDetails } from '../types/offer';
import { Point } from '../types/point';
import { Review } from '../types/review';
import { ReviewData } from '../types/review-data';
import { UserData } from '../types/user-data';

const OFFER_TYPES = [
  'apartment',
  'room',
  'house',
  'hotel'
];

const GOODS = [
  'Wi-Fi',
  'Heating',
  'Kitchen',
  'Coffee machine',
  'Fridge',
  'Washing machine',
  'Dishwasher',
  'Air conditioning',
  'Baby seat',
  'Towels'
];

export const makeFakeLocation = (): Location => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 8, max: 18 }),
});

export const makeFakeCity = (): City => ({
  name: faker.address.city(),
  location: makeFakeLocation(),
});

export const makeFakePoint = (): Point => ({
  title: faker.address.streetName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
});

export const makeFakeMapPoint = (): MapPoint => ({
  title: faker.address.streetName(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
});

export const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.random.arrayElement(OFFER_TYPES),
  price: faker.datatype.number({ min: 100, max: 1000 }),
  previewImage: faker.image.imageUrl(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({
    min: 1,
    max: 5,
    precision: 0.1,
  }),
});

export const makeFakeOfferDetails = (): OfferDetails => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.random.arrayElement(OFFER_TYPES),
  price: faker.datatype.number({ min: 100, max: 1000 }),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({
    min: 1,
    max: 5,
    precision: 0.1,
  }),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: faker.random.arrayElements(
    GOODS,
    faker.datatype.number({ min: 3, max: GOODS.length })
  ),
  host: {
    name: faker.name.firstName(),
    avatarUrl: faker.internet.avatar(),
    isPro: faker.datatype.boolean(),
  },
  images: Array.from(
    { length: 6 },
    () => faker.image.imageUrl()
  ),
  maxAdults: faker.datatype.number({ min: 1, max: 10 }),
});

export const makeFakeReview = (): Review => ({
  id: faker.datatype.uuid(),
  user: {
    name: faker.name.firstName(),
    avatarUrl: faker.internet.avatar(),
    isPro: faker.datatype.boolean(),
  },
  rating: faker.datatype.float({
    min: 1,
    max: 5,
    precision: 0.1,
  }),
  comment: faker.lorem.sentences(2),
  date: faker.date.recent().toISOString(),
});

export const makeFakeReviewData = (): ReviewData => ({
  comment: faker.lorem.sentences(2),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeUserData = (): UserData => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
});

export const makeFakeAuthData = (): AuthData => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
