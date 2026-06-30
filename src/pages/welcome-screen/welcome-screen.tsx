import { ReactElement, useState } from 'react';
import { AuthorizationStatus } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import PlaceList from '../../components/place-list/place-list.tsx';
import LocationList from '../../components/location-list/location-list.tsx';
import { City } from '../../types/city.ts';
import Map from '../../components/map/map.tsx';

interface WelcomeScreenProps {
  offers: Offer[];
  cities: City[];
  userAuthStatus: AuthorizationStatus;
}

function WelcomeScreen ({
  offers = [],
  cities = [],
  userAuthStatus
}: WelcomeScreenProps): ReactElement {
  const [currentCity, setCurrentCity] = useState<string>(cities[0].name);
  const [selectedPlaceCardTitle, setSelectedPlaceCardTitle] = useState<string | null>(null);

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === currentCity
  );

  const handlePlaceCardHover = (offerId: string | null) => {
    const cardTitle = filteredOffers
      .find(
        (offer) => offer.id === offerId
      )
      ?.title || null;

    setSelectedPlaceCardTitle(cardTitle);
  };

  return (
    <div className="page page--gray page--main">
      <Header userAuthStatus={userAuthStatus} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList
              cities={cities}
              activeCityName={currentCity}
              onChangeLocation={
                (selectedCityName) => setCurrentCity(selectedCityName)
              }
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {currentCity}</b>
              <form
                className="places__sorting"
                action="#"
                method="get"
              >
                <span className="places__sorting-caption">Sort by</span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                >
                  Popular
                  <svg
                    className="places__sorting-arrow"
                    width="7"
                    height="4"
                  >
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >Popular
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >Price: low to high
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >Price: high to low
                  </li>
                  <li
                    className="places__option"
                    tabIndex={0}
                  >Top rated first
                  </li>
                </ul>
              </form>

              <PlaceList
                type={'cities'}
                offers={filteredOffers}
                onPlaceCardHover={handlePlaceCardHover}
              />
            </section>

            <div className="cities__right-section">
              <Map
                city={cities.find((city) => city.name === currentCity)!} // Если есть предложения, значит 100% есть города
                points={filteredOffers.map((offer) => ({
                  title: offer.title,
                  latitude: offer.location.latitude,
                  longitude: offer.location.longitude,
                }))}
                selectedPointTitle={selectedPlaceCardTitle}
                className={'cities__map'}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
