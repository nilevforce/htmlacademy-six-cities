import { memo, ReactElement, SyntheticEvent } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';
import { getRatingPercent } from '../../helpers';
import classNames from 'classnames';
import {
  capitalizeFirstLetter
} from '../../helpers/capitalize-first-letter.ts';

const MAX_PLACE_CARD_RATING = 5;

interface PlaceCardProps {
  type: 'cities' | 'near-places' | 'favorites';
  place: {
    id: string;
    imageSrc: string;
    title: string;
    price: number;
    type: string;
    isFavorite?: boolean;
    isPremium?: boolean;
    rating?: number;
  };
  onCardHover?: (evt: SyntheticEvent<HTMLElement>) => void;
  onCardLeave?: (evt: SyntheticEvent<HTMLElement>) => void;
  onFavoriteButtonClick: (element: HTMLButtonElement, placeId: string) => void;
}

function PlaceCard (props: PlaceCardProps): ReactElement {
  const {
    type,
    place,
    onCardHover,
    onCardLeave,
    onFavoriteButtonClick
  } = props;

  const handleFavoriteButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    onFavoriteButtonClick(
      evt.currentTarget,
      place.id
    );
  };

  const mark = place.isPremium ? 'Premium' : null;
  const linkToOffer = generatePath(AppRoute.Offer, { offerId: place.id });

  return (
    <article
      className={
        classNames(
          type === 'cities' && 'cities__card',
          type === 'near-places' && 'near-places__card',
          type === 'favorites' && 'favorites__card',
          'place-card'
        )
      }
      data-js-id={place.id}
      onMouseEnter={onCardHover}
      onMouseLeave={onCardLeave}
    >
      {
        mark && (
          <div className="place-card__mark">
            <span>{mark}</span>
          </div>
        )
      }
      <div
        className={
          classNames(
            type === 'cities' && 'cities__image-wrapper',
            type === 'near-places' && 'near-places__image-wrapper',
            type === 'favorites' && 'favorites__image-wrapper',
            'place-card__image-wrapper'
          )
        }
      >
        <Link to={linkToOffer}>
          <img
            className={
              classNames(
                type === 'near-places' && '',
                'place-card__image'
              )
            }
            src={place.imageSrc}
            width={260}
            height={200}
            alt={place.title}
          />
        </Link>
      </div>
      <div
        className={
          classNames(
            'place-card__info',
            type === 'favorites' && 'favorites__card-info'
          )
        }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={[
              'place-card__bookmark-button',
              'button',
              place.isFavorite && 'place-card__bookmark-button--active',
            ].filter(Boolean).join(' ')}
            type="button"
            onClick={handleFavoriteButtonClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{place.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingPercent(place.rating || 0, MAX_PLACE_CARD_RATING) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkToOffer}>
            {place.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(place.type)}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
