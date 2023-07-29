import { onEscKeyDown } from './util.js';
import { onCloseFromChange } from './form-picture.js';
import { uploadData } from './fetch.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const formUpload = document.querySelector('.img-upload__form');

const closeResultWindow = () => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  if (popup) {
    popup.remove();
  }
};

const onEscKeydown = (evt) => {
  if (onEscKeyDown(evt)) {
    closeResultWindow();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const onPopupClick = (evt) => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  if (popup && !evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeResultWindow();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const showMessage = (message) => {
  message.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onEscKeydown);
  document.body.appendChild(message);
};

const showErrorMessage = () => {
  const messageFragment = errorMessage.cloneNode(true);
  const errorButton = messageFragment.querySelector('.error__button');

  showMessage(messageFragment);

  errorButton.addEventListener('click', () => {
    closeResultWindow();
  });
};

const showSuccessMessage = () => {
  const messageFragment = successMessage.cloneNode(true);
  const successButton = messageFragment.querySelector('.success__button');

  showMessage(messageFragment);

  successButton.addEventListener('click', () => {
    closeResultWindow();
  });
};

const onSuccess = () => {
  onCloseFromChange();
  showSuccessMessage();
};

const onError = () => {
  showErrorMessage();
};

const onUploadSubmit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onError, 'POST', new FormData(evt.target));
};

formUpload.addEventListener('submit', onUploadSubmit);
