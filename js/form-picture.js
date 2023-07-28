import { onEscKeyDown } from './util.js';
import { resetScale } from './scale.js';
import { resetSlider } from './effects.js';


const upload = document.querySelector('.img-upload');
const fileUpload = upload.querySelector('#upload-file');
const formUplad = upload.querySelector('.img-upload__form');
const overlayUpload = upload.querySelector('.img-upload__overlay');
const uploadCancel = upload.querySelector('#upload-cancel');

const onCloseFromChenge = () => {
  overlayUpload.classList.add('hidden');
  document.body.classList.remove('mdoal-open');
  document.removeEventListener('keydown', onFormEscKeyDown);
  uploadCancel.removeEventListener('click', onCloseFromChenge);
  resetScale();
  resetSlider();
  formUplad.reset();
  Pristine.reset();
};


function onFormEscKeyDown(evt) {
  if (onEscKeyDown (evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')
  ) {
    onCloseFromChenge();
    document.removeEventListener('keydown', onFormEscKeyDown);
  }
}


const onOpenFormChange = () => {
  overlayUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeyDown);
  uploadCancel.addEventListener('click', onCloseFromChenge);
};

fileUpload.addEventListener('change', onOpenFormChange);

export {fileUpload, onCloseFromChenge};
