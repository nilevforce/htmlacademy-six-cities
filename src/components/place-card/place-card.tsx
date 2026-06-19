import {PlaceType} from '../../constants.ts';

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

interface PlaceCardProps {
  imageSrc: string;
  mark?: string;
  name: string;
  price: number;
  type: PlaceType;
  inBookmarks?: boolean;
  rating?: Rating;
}

const RatingWidth: Record<Rating, string> = {
  0: '0%',
  1: '20%',
  2: '40%',
  3: '60%',
  4: '80%',
  5: '100%'
};

function PlaceCard({ imageSrc, mark, name, price, type, inBookmarks = false, rating = 0 }: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {
        mark && (
          <div className="place-card__mark">
            <span>{mark}</span>
          </div>
        )
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={imageSrc}
            width={260}
            height={200}
            alt={name}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={[
              'place-card__bookmark-button',
              'button',
              inBookmarks && 'place-card__bookmark-button--active',
            ].filter(Boolean).join(' ')}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{inBookmarks ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: RatingWidth[rating] }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
