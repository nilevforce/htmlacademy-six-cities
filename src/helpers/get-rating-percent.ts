function getRatingPercent (rating: number = 0, maxRating: number = 5): string {
  if (rating > maxRating) {
    throw new Error(`Максимальный рейтинг: ${maxRating}`);
  }

  return `${(rating / maxRating) * 100}%`;
}

export {
  getRatingPercent
};
