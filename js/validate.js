import { normalizeString } from './util.js';
import { onCloseFromChange } from './form-picture.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG = 5;
const MAX_HASHTAG_LENGTH = 20;


const ErrorMessage = {
  INVALID_DESCRIPION_LENGTH: `вы ввели максимальное допустимое количество символов - ${MAX_DESCRIPTION_LENGTH}`,
  INVALID_QUANTITY: `нельзя указать больше ${MAX_HASHTAG} хэш-тегов`,
  INVALID_HASHTAG_LENGTH: `максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
  INVALID_FIRST_SYMBOL: 'хэш-тег начинается с символа # (решётка)',
  INVALID_REPEAT: 'хэш-теги не должны повторяться',
  INVALID_SEPARATOR: 'хэш-теги разделяются пробелами',
  INVALID_VALUE: 'хэш-тег содержит недопустимые символы',
};


const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');


let errorAlert = '';
const err = () => errorAlert;


const commentValidated = (inputValue) => {
  const normalizedText = normalizeString(inputValue);

  if (normalizedText.length <= MAX_DESCRIPTION_LENGTH) {
    return true;
  }
  return false;
};


const hashtagValidated = (inputValue) => {
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
      error: ErrorMessage.INVALID_SEPARATOR,
    },

    {
      check: inputArray.some((hashtag) => hashtag[0] !== '#'),
      error: ErrorMessage.INVALID_FIRST_SYMBOL,
    },

    {
      check: inputArray.some((hashtag, _, array) => array.indexOf(hashtag) !== array.lastIndexOf(hashtag)),
      error: ErrorMessage.INVALID_REPEAT,
    },

    {
      check: inputArray.some((hashtag) => hashtag.length > MAX_HASHTAG_LENGTH),
      error: ErrorMessage.INVALID_HASHTAG_LENGTH,
    },

    {
      check: inputArray.length > MAX_HASHTAG,
      error: ErrorMessage.INVALID_QUANTITY,
    },

    {
      check: inputArray.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      error: ErrorMessage.INVALID_VALUE,
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
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form-error'
});


pristine.addValidator(hashtagInputElement, hashtagValidated, err, 2, false);
pristine.addValidator(descriptionInputElement, commentValidated, ErrorMessage.INVALID_DESCRIPION_LENGTH);


const onHashtagInput = () => {
  if (pristine.validate()) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
};

hashtagInputElement.addEventListener('input', onHashtagInput);
descriptionInputElement.addEventListener('input', onHashtagInput);


const onFormSubmit = () => {
  submitButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    onCloseFromChange();
  });
};

const resetPristine = () => pristine.reset();

export { onFormSubmit, resetPristine };
