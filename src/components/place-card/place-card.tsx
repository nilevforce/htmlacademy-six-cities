import { ReactElement, SyntheticEvent } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';
import { getRatingPercent } from '../../helpers';
import classNames from 'classnames';

const MAX_PLACE_CARD_RATING = 5;

interface PlaceCardProps {
  type: 'cities' | 'near-places';
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
}

function PlaceCard (props: PlaceCardProps): ReactElement {
  const {
    type,
    place,
    onCardHover,
    onCardLeave
  } = props;

  const mark = place.isPremium ? 'Premium' : null;
  const linkToOffer = generatePath(AppRoute.Offer, { offerId: place.id });

  return (
    <article
      className={
        classNames(
          type === 'cities' && 'cities__card',
          type === 'near-places' && 'near-places__card',
          'place-card'
        )
      }
      data-offer-id={place.id}
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
      <div className="place-card__info">
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
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
