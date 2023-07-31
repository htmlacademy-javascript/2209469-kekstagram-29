import { picture } from './main.js';
import { renderMiniature, removeMiniature } from './miniatures.js';
import { debounce, shuffleArray } from './util.js';

const ACTIVE_CLASS = 'img-filters__button--active';
const NUMBER_RANDOM_FILTER = 10;


const filtersForm = document.querySelector('.img-filters');
const filtersButton = filtersForm.querySelector('.img-filters__form');

const Filters = {
  'filter-default': () => picture.slice(),
  'filter-random': () => shuffleArray(picture.slice()).slice(0, NUMBER_RANDOM_FILTER),
  'filter-discussed': () => picture.slice().sort((firstPicture, secondPicture) =>
    secondPicture.comments.length - firstPicture.comments.length),
};

const onFitlersButtonClick = debounce((evt) => {
  if (evt.target.tagName === 'BUTTON') {
    const selectedButton = filtersButton.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }

    evt.target.classList.add(ACTIVE_CLASS);

    removeMiniature();

    renderMiniature(Filters[evt.target.id]());
  }
});

filtersButton.addEventListener('click', onFitlersButtonClick);
