import { resetPristine } from './validate.js';
import { isEscKeyDown } from './util.js';
import { resetScale } from './scale.js';
import { resetSlider } from './effects.js';


const uploadElement = document.querySelector('.img-upload');
const fileUploadElement = uploadElement.querySelector('#upload-file');
const formUpladElement = uploadElement.querySelector('.img-upload__form');
const overlayUploadElement = uploadElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadElement.querySelector('#upload-cancel');
const submitButtonElement = uploadElement.querySelector('.img-upload__submit');
const textHashtags = uploadElement.querySelector('.text__hashtags');
const textDescription = uploadElement.querySelector('.text__description');

const onCloseFromChange = () => {
  resetScale();
  formUpladElement.reset();
  resetPristine();
  resetSlider();
  submitButtonElement.disabled = true;
  overlayUploadElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};


const onFormEscKeyDown = (evt) => {
  if (isEscKeyDown(evt)) {
    evt.preventDefault();
    onCloseFromChange();
    document.removeEventListener('keydown', onFormEscKeyDown);
  }
};

uploadCancelElement.addEventListener('click', onCloseFromChange);


const onOpenFormChange = () => {
  overlayUploadElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeyDown);
};

fileUploadElement.addEventListener('change', onOpenFormChange);


const onKeyStopListener = (evt) => {
  if (isEscKeyDown(evt)) {
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', onKeyStopListener);
textDescription.addEventListener('keydown', onKeyStopListener);


export { onCloseFromChange };
