import { memo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import Logo from '../logo/logo.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getAuthStatus,
  getUserEmail
} from '../../store/user/user-selectors.ts';
import {
  getFavoriteOffersCount
} from '../../store/favorite-offers/favorite-offers-selectors.ts';
import { logout } from '../../store/user/user-api-actions.ts';

interface HeaderProps {
  variant?: 'full' | 'minimal';
}

function Header ({
  variant = 'full',
}: HeaderProps): ReactElement {
  const userAuthStatus = useAppSelector(getAuthStatus);
  const userEmail = useAppSelector(getUserEmail);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);

  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {
            variant === 'full' &&
            (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {
                    userAuthStatus === AuthorizationStatus.Auth ? (
                      <>
                        <li className="header__nav-item user">
                          <Link
                            className="header__nav-link header__nav-link--profile"
                            to={AppRoute.Favorites}
                          >
                            <div className="header__avatar-wrapper user__avatar-wrapper">
                            </div>
                            <span className="header__user-name user__name">{userEmail}</span>
                            <span className="header__favorite-count">{favoriteOffersCount}</span>
                          </Link>
                        </li>

                        <li className="header__nav-item">
                          <Link
                            className="header__nav-link"
                            onClick={handleLogoutClick}
                            to={AppRoute.Root}
                          >
                            <span className="header__signout">Sign out</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="header__nav-item user">
                        <Link
                          className="header__nav-link header__nav-link--profile"
                          to={AppRoute.Login}
                        >
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__login">Sign in</span>
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </nav>
            )
          }
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
