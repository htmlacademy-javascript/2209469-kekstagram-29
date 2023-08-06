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

const onCloseFromChange = () => {
  overlayUploadElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeyDown);
  uploadCancelElement.removeEventListener('click', onCloseFromChange);
  submitButtonElement.disabled = false;
  formUpladElement.reset();
  resetPristine();
  resetScale();
  resetSlider();
};


function onFormEscKeyDown(evt) {
  if (isEscKeyDown (evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')
  ) {
    onCloseFromChange();
    document.removeEventListener('keydown', onFormEscKeyDown);
  }
}


const onOpenFormChange = () => {
  overlayUploadElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeyDown);
  uploadCancelElement.addEventListener('click', onCloseFromChange);
};

fileUploadElement.addEventListener('change', onOpenFormChange);

export { onCloseFromChange };
