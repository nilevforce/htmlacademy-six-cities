import { ReactElement } from 'react';
import { Offer } from '../../types/offer.ts';
import PlaceCard from '../../components/place-card/place-card.tsx';
import { changeOfferFavoriteStatusAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';

interface FavoritesLocationProps {
  cityName: string;
  favorites: Offer[];
}

function FavoritesLocation (props: FavoritesLocationProps): ReactElement {
  const {
    cityName,
    favorites
  } = props;

  const dispatch = useAppDispatch();

  const handleFavoriteButtonClick = (
    element: HTMLButtonElement,
    offerId: string,
  ) => {
    element.disabled = true;
    dispatch(changeOfferFavoriteStatusAction({
      offerId,
      status: !favorites.find((offer) => offer.id === offerId)?.isFavorite
    })).finally(() => {
      element.disabled = false;
    });
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={`${AppRoute.Root}?city=${cityName}`}
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {favorites.map((offer) => (
          <PlaceCard
            key={offer.id}
            type={'favorites'}
            place={{
              id: offer.id,
              imageSrc: offer.previewImage,
              title: offer.title,
              price: offer.price,
              type: offer.type,
              isPremium: offer.isPremium,
              isFavorite: offer.isFavorite,
              rating: offer.rating
            }}
            onFavoriteButtonClick={handleFavoriteButtonClick}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoritesLocation;
