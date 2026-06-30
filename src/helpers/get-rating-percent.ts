function getRatingPercent (rating: number, maxRating: number): string {
  if (rating > maxRating) {
    throw new Error(`Максимальный рейтинг: ${maxRating}`);
  }

  return `${(rating / maxRating) * 100}%`;
}

export {
  getRatingPercent
};
