const stringLengt = (string, length) => string.length <= length;
stringLengt('проверяемая строка', 20);


const isPalindrom = (unediteSdtring) => {
  const string = unediteSdtring.replaceAll(' ', '').toLowerCase();

  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString === string;
};
isPalindrom('топот');


const extractNumber = (unediteSdtring) => {
  const string = unediteSdtring;
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};
extractNumber('2023 год');

export {stringLengt, isPalindrom, extractNumber};
