import { ReactElement } from 'react';
import { Offer } from '../../types/offer.ts';
import PlaceCard from '../../components/place-card/place-card.tsx';

interface FavoritesLocationProps {
  cityName: string;
  favorites: Offer[];
}

function FavoritesLocation (props: FavoritesLocationProps): ReactElement {
  const {
    cityName,
    favorites
  } = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favorites.map((offer) => (
          <PlaceCard
            key={offer.id}
            id={offer.id}
            imageSrc={offer.previewImage}
            title={offer.title}
            price={offer.price}
            type={offer.type}
            isPremium={offer.isPremium}
            isFavorite={offer.isFavorite}
            rating={offer.rating}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoritesLocation;
