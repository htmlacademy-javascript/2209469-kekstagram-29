import { normalizeString } from './util.js';
import { onCloseFromChange } from './form-picture.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG = 5;
const MAX_HASHTAG_LENGTH = 20;


const ErrorMassage = {
  INVALID_DESCRIPION_LENGTH: `вы ввели максимальное допустимое количество символов - ${MAX_DESCRIPTION_LENGTH}`,
  INVALID_QUANTITY: `нельзя указать больше ${MAX_HASHTAG} хэш-тегов`,
  INVALID_HASHTAG_LENGTH: `максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  INVALID_FIRST_SYMBOL: 'хэш-тег начинается с символа # (решётка)',
  INVALID_REPEAT: 'хэш-теги не должны повторяться',
  INVALID_SEPARATOR: 'хэш-теги разделяются пробелами',
  INVALID_VALUE: 'хэш-тег содержит недопустимые символы'
};


const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const submitBtnElement = formElement.querySelector('.img-upload__submit');


let errorAlert = '';
const error = () => errorAlert;


const hashtagValidator = (inputValue) => {
  errorAlert = '';


  const inputText = normalizeString(inputValue);

  if (!inputText) {
    return true;
  }


  const inputArray = inputText.split(/\s+/);

  if (!inputArray.length) {
    return true;
  }


  const rules = [
    {
      check: inputArray.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: ErrorMassage.INVALID_SEPARATOR,
    },

    {
      check: inputArray.some((hashtag) => hashtag[0] !== '#'),
      error: ErrorMassage.INVALID_FIRST_SYMBOL,
    },

    {
      check: inputArray.some((hashtag, _, array) => array.indexOf(hashtag) !== array.lastIndexOf(hashtag)),
      error: ErrorMassage.INVALID_REPEAT,
    },

    {
      check: inputArray.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH),
      error: ErrorMassage.INVALID_HASHTAG_LENGTH,
    },

    {
      check: inputArray.langth > MAX_HASHTAG,
      error: ErrorMassage.INVALID_QUANTITY,
    },

    {
      check: inputArray.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      error: ErrorMassage.INVALID_VALUE,
    },
  ];


  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorAlert = rule.error;
    }
    return !isInvalid;
  });
};


const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field-validate--invalid',
  successClass: 'field-validate__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form-error'
});


pristine.addValidator(hashtagInputElement, hashtagValidator, error, 2, false);


const onHashtagInput = () => {
  if (pristine.validate()) {
    submitBtnElement.disabled = false;
  } else {
    submitBtnElement.disabled = true;
  }
};


hashtagInputElement.addEventListener('input', onHashtagInput);

const onFormSubmit = () => {
  submitBtnElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    onCloseFromChange();
  });
};

export { onFormSubmit, pristine };
