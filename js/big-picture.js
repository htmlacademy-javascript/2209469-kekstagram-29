import { onEscKeyDown } from './util.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');


// const commentsCount = bigPicture.querySelector('.comments-count.');


// const socialComments = bigPicture.querySelector('.social__comments');

// const socialCommentCount = bigPicture.querySelector('.social__comment-count');
// const commentsLoader = bigPicture.querySelector('.comments-loader');

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
    document.removeEventListener('keydown', onPopupEscKeyDown);
  });
};


const showBigPicture = (picture) => {
  const { url, likes, description } = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeyDown);

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  onClosePicture();
};


export { showBigPicture };
