enum PlaceType {
  Room = 'Room',
  Apartment = 'Apartment'
}

enum AppRoute {
  Root = '/',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorites',
  Offer = '/offer/:offerId'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export {
  PlaceType,
  AppRoute,
  AuthorizationStatus
};
