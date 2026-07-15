import { ReactElement } from 'react';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import FavoritesLocation from '../favorites-location/favorites-location.tsx';
import { useAppSelector } from '../../hooks';
import FavoritesScreenEmpty
  from '../favorites-screen-empty/favorites-screen-empty.tsx';
import {
  getFavoriteOffers
} from '../../store/favorite-offers/favorite-offers-selectors.ts';

function FavoritesScreen (): ReactElement {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  if (favoriteOffers.length === 0) {
    return <FavoritesScreenEmpty />;
  }

  const favoriteCityNames = new Set<string>();
  favoriteOffers.forEach((favorite) => favoriteCityNames.add(favorite.city.name));

  const favoritesByCity = [...favoriteCityNames]
    .map((name) => ({
      name,
      favorites: favoriteOffers.filter((favorite) => favorite.city.name === name)
    }));

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favoritesByCity.map(
                  (city): ReactElement => (
                    <FavoritesLocation
                      key={city.name}
                      cityName={city.name}
                      favorites={city.favorites}
                    />
                  ))
              }
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
