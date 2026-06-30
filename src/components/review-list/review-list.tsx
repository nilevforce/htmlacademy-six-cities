import { ReactElement } from 'react';
import ReviewsForm from '../reviews-form/reviews-form.tsx';
import Review from '../review/review.tsx';
import { Review as ReviewType } from '../../types/review.ts';

interface ReviewListProps {
  reviews: ReviewType[];
}

function ReviewList (props: ReviewListProps): ReactElement {
  const { reviews } = props;

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
                  text={review.text}
                  date={new Date(review.date)}
                />
              )
            )
        }
      </ul>

      <ReviewsForm />
    </section>
  );
}

export default ReviewList;
