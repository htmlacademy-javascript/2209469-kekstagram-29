const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

const onEscKeyDown = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const normalizeString = (str) => str.toLowerCase().trim();


export { onEscKeyDown };
export { normalizeString };
