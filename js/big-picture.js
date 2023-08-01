import { onEscKeyDown } from './util.js';


const COMMENTS_STEP = 5;


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialFooterText = bigPicture.querySelector('.social__footer-text');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');


let commentsCount = COMMENTS_STEP;
let currentComments = [];


const renderComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

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

    newComment.classList.add('social__comment');
    imgComment.classList.add('social__picture');
    textComment.classList.add('sotial__text');

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


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';
};


const onCloseBigPictureClick = () => {
  commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
  bigPictureCancel.removeEventListener('click', onCloseBigPictureClick);

  closeBigPicture();
};


const onPopupEscKeyDown = (evt) => {
  if (onEscKeyDown (evt) &&
  !evt.target.classList.contains('social__footer-text')
  ) {
    document.removeEventListener('keydown', onPopupEscKeyDown);
    commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);

    closeBigPicture();
  }
};


const showBigPicture = (picture) => {
  const { url, likes, description, comments } = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments.slice();

  commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
  document.addEventListener('keydown', onPopupEscKeyDown);
  bigPictureCancel.addEventListener('click', onCloseBigPictureClick);

  renderComments();
};


export { showBigPicture };
