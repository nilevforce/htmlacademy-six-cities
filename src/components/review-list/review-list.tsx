import { ReactElement, useState } from 'react';
import ReviewsForm from '../reviews-form/reviews-form.tsx';
import Review from '../review/review.tsx';
import { Review as ReviewType } from '../../types/review.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../constants.ts';
import { addOfferReviewAction } from '../../store/api-actions.ts';
import { OfferDetails } from '../../types/offer.ts';

interface ReviewListProps {
  offer: OfferDetails;
  reviews: ReviewType[];
}

function ReviewList (props: ReviewListProps): ReactElement {
  const {
    offer,
    reviews,
  } = props;

  const authStatus = useAppSelector((state) => state.authStatus);
  const dispatch = useAppDispatch();
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleOnSubmitForm = (data: {
    review: string;
    rating: number;
  }) => {
    setIsFormDisabled(true);

    dispatch(
      addOfferReviewAction({
        offerId: offer.id,
        review: {
          comment: data.review,
          rating: data.rating
        }
      }))
      .finally(() => {
        setIsFormDisabled(false);
      });
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {
          reviews
            .map(
              (review) => (
                <Review
                  key={review.id}
                  user={{
                    name: review.user.name,
                    avatarUrl: review.user.avatarUrl
                  }}
                  rating={review.rating}
                  text={review.comment}
                  date={new Date(review.date)}
                />
              )
            )
        }
      </ul>

      {
        authStatus === AuthorizationStatus.Auth
        && (
          <ReviewsForm
            onSubmitForm={handleOnSubmitForm}
            isDisabled={isFormDisabled}
          />
        )
      }
    </section>
  );
}

export default ReviewList;
