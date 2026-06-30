const reviews = [
  {
    'id': 'ff143b7f-a756-4c54-a438-8f000b3b0644',
    'comment': 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    'date': '2026-06-06T21:00:00.140Z',
    'rating': 2,
    'user': {
      'name': 'Mollie',
      'avatarUrl': 'https://16.design.htmlacademy.pro/static/avatar/8.jpg',
      'isPro': false
    }
  },
  {
    'id': '4b021f83-14eb-4dd1-9bfc-b3e3018a659b',
    'comment': 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    'date': '2026-06-04T21:00:00.140Z',
    'rating': 3,
    'user': {
      'name': 'Kendall',
      'avatarUrl': 'https://16.design.htmlacademy.pro/static/avatar/9.jpg',
      'isPro': true
    }
  }
];

export default reviews.map((review) => ({
  id: review.id,
  text: review.comment,
  date: review.date,
  rating: review.rating,
  user: {
    name: review.user.name,
    avatarUrl: review.user.avatarUrl,
    isPro: review.user.isPro
  }
}));
