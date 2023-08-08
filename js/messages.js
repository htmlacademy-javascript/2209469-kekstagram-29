import { isEscKeyDown } from './util.js';
import { onCloseFromChange } from './form-picture.js';
import { uploadData } from './fetch.js';


const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const formUpload = document.querySelector('.img-upload__form');

const closeResultWindow = () => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  popup.remove();
};

const onEscKeyDown = (evt) => {
  if (isEscKeyDown(evt)) {
    closeResultWindow();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const onPopupClick = (evt) => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  if (popup && !evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    evt.preventDefault();
    closeResultWindow();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const showMessage = (message) => {
  message.addEventListener('click', onPopupClick);
  document.body.appendChild(message);
  document.addEventListener('keydown', onEscKeyDown);
};

const showErrorMessage = () => {
  const messageFragment = errorMessage.cloneNode(true);
  const errorButton = messageFragment.querySelector('.error__button');

  showMessage(messageFragment);

  const onErrorEscKeyDown = (evt) => {
    if (isEscKeyDown(evt)) {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.removeEventListener('keydown', onEscKeyDown);
      document.removeEventListener('keydown', onErrorEscKeyDown);
    }
  };
  document.addEventListener('keydown', onErrorEscKeyDown);


  errorButton.addEventListener('click', () => {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('keydown', onErrorEscKeyDown);
    closeResultWindow();
  });
};

const showSuccessMessage = () => {
  const messageFragment = successMessage.cloneNode(true);
  const successButton = messageFragment.querySelector('.success__button');

  showMessage(messageFragment);

  successButton.addEventListener('click', () => {
    onCloseFromChange();
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

  const submitButton = document.querySelector('.img-upload__submit');
  submitButton.disabled = true;

  uploadData(() => {
    onSuccess();
    submitButton.disabled = false;
  }, () => {
    onError();
    submitButton.disabled = false;
  }, 'POST', new FormData(evt.target));
};

formUpload.addEventListener('submit', onUploadSubmit);
