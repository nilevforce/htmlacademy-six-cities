import { capitalizeFirstLetter } from './capitalize-first-letter.ts';
import { debounce } from './debounce.ts';
import { getRandomArrayItem } from './get-random-array-item.ts';
import { getRatingPercent } from './get-rating-percent.ts';

describe('Helpers', () => {
  describe('getRatingPercent', () => {
    it('should return rating percent', () => {
      const rating = 4;
      const maxRating = 5;
      const expectedResult = '80%';

      const result = getRatingPercent(rating, maxRating);

      expect(result).toBe(expectedResult);
    });

    it('should return zero percent with default rating', () => {
      const expectedResult = '0%';

      const result = getRatingPercent();

      expect(result).toBe(expectedResult);
    });

    it('should throw error when rating is greater than max rating', () => {
      const rating = 6;
      const maxRating = 5;

      expect(() => getRatingPercent(rating, maxRating))
        .toThrow(`Максимальный рейтинг: ${maxRating}`);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter', () => {
      const str = 'apartment';
      const expectedResult = 'Apartment';

      const result = capitalizeFirstLetter(str);

      expect(result).toBe(expectedResult);
    });

    it('should return empty string', () => {
      const str = '';

      const result = capitalizeFirstLetter(str);

      expect(result).toBe(str);
    });
  });

  describe('getRandomArrayItem', () => {
    it('should return first array item when Math.random returns zero', () => {
      const items = ['first', 'second', 'third'];
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

      const result = getRandomArrayItem(items);

      expect(result).toBe(items[0]);

      randomSpy.mockRestore();
    });

    it('should return last array item when Math.random returns value close to one', () => {
      const items = ['first', 'second', 'third'];
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.99);

      const result = getRandomArrayItem(items);

      expect(result).toBe(items[2]);

      randomSpy.mockRestore();
    });
  });

  describe('debounce', () => {
    it('should call callback after passed delay', () => {
      vi.useFakeTimers();
      const callback = vi.fn();
      const delay = 500;
      const debouncedCallback = debounce(callback, delay);

      debouncedCallback('test');
      vi.advanceTimersByTime(delay);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('test');

      vi.useRealTimers();
    });

    it('should call callback once with last arguments when called several times', () => {
      vi.useFakeTimers();
      const callback = vi.fn();
      const delay = 500;
      const debouncedCallback = debounce(callback, delay);

      debouncedCallback('first');
      debouncedCallback('second');
      vi.advanceTimersByTime(delay);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('second');

      vi.useRealTimers();
    });
  });
});
