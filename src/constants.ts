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

export {
  AppRoute,
  AuthorizationStatus
};
