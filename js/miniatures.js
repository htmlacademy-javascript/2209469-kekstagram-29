import { showBigPicture } from './big-picture.js';


const miniatureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesCountainerElement = document.querySelector('.pictures');


const createMiniature = (picture) => {
  const { url, description, likes, comments } = picture;
  const miniatureElement = miniatureTemplateElement.cloneNode(true);

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
  pictures.forEach((item) => {
    fragment.append(createMiniature(item));
  });

  miniaturesCountainerElement.appendChild(fragment);
};

const removeMiniature = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures) {
    pictures.forEach((picture) => picture.remove());
  }
};

export { renderMiniature, removeMiniature };
