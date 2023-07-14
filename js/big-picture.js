import { onEscKeyDown } from './util.js';

const COMMENTS_STEP = 5;


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');


// const commentsCount = bigPicture.querySelector('.comments-count.');


const socialCommentCount = bigPicture.querySelector('.social__comment-count');


let commentsCount = COMMENTS_STEP;
let currentComments = [];

const renderComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  socialCommentCount.textContent = `${commentsCount} из ${currentComments.length} коментариев.`;

  const commentsContainer = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const newComment = document.createElement('li');
    const imgComment = document.createElement('img');
    const textComment = document.createElement('p');

    newComment.classList.add('.social__comment');
    imgComment.classList.add('.social__picture');
    textComment.classList.add('.sotial__text');

    imgComment.src = comment.avatar;
    imgComment.alt = comment.name;
    textComment.textContent = comment.message;

    newComment.appendChild(imgComment);
    newComment.appendChild(textComment);

    commentsContainer.appendChild(newComment);
  });
  socialComments.appendChild(commentsContainer);
};


const onCommentsLoaderButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const onPopupEscKeyDown = (evt) => {
  if (onEscKeyDown(evt)) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeyDown);
  }
};

const onClosePicture = () => {
  bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
    document.removeEventListener('keydown', onPopupEscKeyDown);
  });
};


const showBigPicture = (picture) => {
  const { url, likes, description, comments } = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeyDown);

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments.slice();

  renderComments();
  onClosePicture();
};


export { showBigPicture };
