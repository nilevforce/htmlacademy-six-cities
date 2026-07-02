enum AppRoute {
  Root = '/',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorites',
  Offer = '/offer/:offerId',
  UserProfile = '/me',
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
  'Dusseldorf'
];

export {
  AppRoute,
  AuthorizationStatus,
  CITIES
};
