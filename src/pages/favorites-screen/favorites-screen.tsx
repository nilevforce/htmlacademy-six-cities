import { ReactElement } from 'react';
import { AuthorizationStatus } from '../../constants.ts';
import { Offer } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import FavoritesLocation from '../favorites-location/favorites-location.tsx';

interface FavoritesScreenProps {
  userAuthStatus: AuthorizationStatus;
  favorites: Offer[];
}

function FavoritesScreen (props: FavoritesScreenProps): ReactElement {
  const {
    userAuthStatus,
    favorites
  } = props;

  const favoriteCityNames = new Set<string>();
  favorites.forEach((favorite) => favoriteCityNames.add(favorite.city.name));

  const favoritesByCity = [...favoriteCityNames]
    .map((name) => ({
      name,
      favorites: favorites.filter((favorite) => favorite.city.name === name)
    }));

  return (
    <div className="page">
      <Header userAuthStatus={userAuthStatus} />

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
