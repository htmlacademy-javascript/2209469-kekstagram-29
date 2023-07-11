import { showBigPicture } from './big-picture.js';

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesCountainer = document.querySelector('.pictures');

const createMiniature = (picture) => {
  const { url, description, likes, comments } = picture;
  const miniatureElement = miniatureTemplate.cloneNode(true);

  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__img').alt = description;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.querySelector('.picture__comments').textContent = comments.length;

  const noMiniatureElementClick = (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  };

  miniatureElement.addEventListener('click', noMiniatureElementClick);

  return miniatureElement;
};

const renderMiniature = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(createMiniature(picture));
  });

  miniaturesCountainer.appendChild(fragment);
};

export { renderMiniature };
