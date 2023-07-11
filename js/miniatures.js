const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniaturesCountainer = document.querySelector('.pictures');

const createMiniature = (picture) => {
  const { url, description, likes, comments } = picture;
  const miniature = miniatureTemplate.cloneNode(true);

  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;

  return miniature;
};

const renderMiniature = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniatures = createMiniature(picture);
    fragment.append(miniatures);
  });

  miniaturesCountainer.appendChild(fragment);
};

export { renderMiniature };
