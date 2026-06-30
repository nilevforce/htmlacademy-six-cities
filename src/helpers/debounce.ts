const DEBOUNCE_DELAY: number = 300;

const debounce = <Args extends unknown[]> (
  callback: (...args: Args) => void,
  delay: number = DEBOUNCE_DELAY
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => callback(...args),
      delay
    );
  };
};

export {
  debounce
};
