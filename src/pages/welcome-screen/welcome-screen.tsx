import { ReactElement, useState } from 'react';
import { AuthorizationStatus, CITIES, SortType } from '../../constants.ts';
import Header from '../../components/header/header.tsx';
import PlaceList from '../../components/place-list/place-list.tsx';
import LocationList from '../../components/location-list/location-list.tsx';
import Map from '../../components/map/map.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action.ts';
import WelcomeScreenEmpty
  from '../welcome-screen-empty/welcome-screen-empty.tsx';
import SortList from '../../components/sort-list/sort-list.tsx';

interface WelcomeScreenProps {
  userAuthStatus: AuthorizationStatus;
}

function WelcomeScreen ({
  userAuthStatus
}: WelcomeScreenProps): ReactElement {
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const [currentSortType, setCurrentSortType] = useState<SortType>(SortType.Popular);
  const [selectedPlaceCardTitle, setSelectedPlaceCardTitle] = useState<string | null>(null);

  const sortTypeList: SortType[] = Object.values(SortType);

  const filteredOffers = offers.filter((offer) => offer.city.name === currentCity);

  if (filteredOffers.length === 0) {
    return (
      <WelcomeScreenEmpty userAuthStatus={userAuthStatus} />
    );
  }

  const getSortedOffers = () => {
    switch (currentSortType) {
      case SortType.PriceLowToHigh:
        return filteredOffers.toSorted((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return filteredOffers.toSorted((a, b) => b.price - a.price);
      case SortType.TopRatedFirst:
        return filteredOffers.toSorted((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  };

  const sortedOffers = getSortedOffers();

  const handlePlaceCardHover = (offerId: string | null) => {
    const cardTitle = filteredOffers.find((offer) => offer.id === offerId)?.title;
    setSelectedPlaceCardTitle(cardTitle || null);
  };

  const handleLocationChange = (city: string) => dispatch(changeCity({ city }));

  const handleSortTypeChange = (sortType: SortType) => {
    if (!sortType) {
      return;
    }

    setCurrentSortType(sortType);
  };

  return (
    <div className="page page--gray page--main">
      <Header userAuthStatus={userAuthStatus} />

      <main className="page__main page__main--index">
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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {currentCity}</b>

              <SortList
                sortTypeList={sortTypeList}
                currentSortType={currentSortType}
                onSortTypeChange={handleSortTypeChange}
              />

              <PlaceList
                type={'cities'}
                offers={sortedOffers}
                onPlaceCardHover={handlePlaceCardHover}
              />
            </section>

            <div className="cities__right-section">
              <Map
                city={filteredOffers[0].city} // Если есть предложения, значит 100% есть города
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
