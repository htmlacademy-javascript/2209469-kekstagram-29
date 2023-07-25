const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const onEscKeyDown = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const normalizeString = (str) => str.toLowerCase().trim();

export { getRandomInRange };
export { onEscKeyDown };
export { normalizeString };
