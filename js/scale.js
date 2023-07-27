const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const NORMAL_SCALE = 100;


const uploadScale = document.querySelector('.img-upload');
const scaleControlSmaller = uploadScale.querySelector('.scale__control--smaller');
const scaleControlValue = uploadScale.querySelector('.scale__control--value');
const scaleControlBigger = uploadScale.querySelector('.scale__control--bigger');
const uploadImage = uploadScale.querySelector('.img-upload__preview img');


const scaleImage = (value) => {
  uploadImage.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleControlValue.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleControlValue.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);

const resetScale = () => scaleImage(NORMAL_SCALE);

export {resetScale};
