enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:offerId',
  NotFound = '/404'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
  'Berlin'
];

enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/:offerId',
  OfferComments = '/comments/:offerId',
  NearbyOffers = '/offers/:offerId/nearby',
  OfferFavoriteStatus = '/favorite/:offerId/:status',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout'
}

enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  FavoriteOffers = 'FAVORITE_OFFERS',
  User = 'USER',
  City = 'CITY'
}

export {
  AppRoute,
  AuthorizationStatus,
  CITIES,
  SortType,
  APIRoute,
  NameSpace
};
