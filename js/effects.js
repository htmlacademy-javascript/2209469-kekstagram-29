const EFFECTS = {
  none: {
    name: 'none',
    min: 1,
    max: 100,
    step: 1,
    start: 100,
  },

  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};


const NORMAL_EFFECT = EFFECTS['none'];


const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const picture = uploadForm.querySelector('.img-upload__preview img');
const effectLevel = uploadForm.querySelector('.effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');


let selectedEffect = NORMAL_EFFECT;


const showSlider = () => {
  effectLevelSlider.classList.remove('hidden');
  effectLevel.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.max,
  });


  if (selectedEffect === NORMAL_EFFECT) {
    effectLevelSlider.classList.add('hidden');
    effectLevel.classList.add('hidden');
  }
};


const onEffectsListClick = (evt) => {
  if (evt.target.type === 'radio') {
    selectedEffect = EFFECTS[evt.target.value];
    showSlider();
  }
};


noUiSlider.create((effectLevelSlider), {
  range: {
    min: NORMAL_EFFECT.min,
    max: NORMAL_EFFECT.max,
  },
  step: NORMAL_EFFECT.step,
  start: NORMAL_EFFECT.max,
  content: 'lower',
});


const onEffectSliderShow = () => {
  picture.style.filter = 'none';
  picture.className = '';
  effectLevelValue.value = '';
  if (selectedEffect === NORMAL_EFFECT) {
    return;
  }
  const sliderEffectValue = effectLevelSlider.noUiSlider.get();
  picture.style.filter = `${selectedEffect.style}(${sliderEffectValue}${selectedEffect.unit})`;
  picture.classList.add(`effects__preview--${selectedEffect.name}`);
  effectLevelValue.value = sliderEffectValue;
};


showSlider();


effectsList.addEventListener('click', onEffectsListClick);
effectLevelSlider.noUiSlider.on('update', onEffectSliderShow);


const resetSlider = () => {
  selectedEffect = NORMAL_EFFECT;
  showSlider();
};


export { resetSlider };
