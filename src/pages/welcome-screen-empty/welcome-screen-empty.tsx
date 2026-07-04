import { ReactElement } from 'react';
import {
  AuthorizationStatus,
  CITIES
} from '../../constants.ts';
import Header from '../../components/header/header.tsx';
import LocationList from '../../components/location-list/location-list.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action.ts';

interface WelcomeScreenEmptyProps {
  userAuthStatus: AuthorizationStatus;
}

function WelcomeScreenEmpty (props: WelcomeScreenEmptyProps): ReactElement {
  const {
    userAuthStatus,
  } = props;

  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const handleLocationChange = (city: string) => {
    dispatch(changeCity({ city }));
  };

  return (
    <div className="page page--gray page--main">
      <Header userAuthStatus={userAuthStatus} />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList
              cities={CITIES}
              activeCity={currentCity}
              onChangeLocation={handleLocationChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreenEmpty;
