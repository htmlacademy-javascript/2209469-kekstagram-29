const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const onEscKeyDown = (evt) => evt.key === 'Escape';

export { getRandomInRange };
export { onEscKeyDown };
