const LAG = 500;

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const onEscKeyDown = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const normalizeString = (str) => str.toLowerCase().trim();

const debounce = (cb) => {
  let lastTimeout = null;
  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, LAG);
  };
};

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }
  return array;
};

export { onEscKeyDown };
export { normalizeString };
export { debounce };
export { shuffleArray };
