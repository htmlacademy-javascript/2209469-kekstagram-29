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


const checkTime = (startWork, endWork, meetingStart, meetingDuration) => {
  const MINUTES_IN_HOUR = 60;

  const getInMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * MINUTES_IN_HOUR + minutes;
  };

  const startWorkTime = getInMinutes(startWork);
  const endWorkTime = getInMinutes(endWork);
  const meetingStartTime = getInMinutes(meetingStart);
  const meetingEndTime = meetingStartTime + meetingDuration;

  return !(meetingStartTime < startWorkTime || meetingEndTime > endWorkTime || meetingEndTime > endWorkTime);
};

console.log(checkTime('08:00', '17:30', '14:00', 90));
console.log(checkTime('8:0', '10:0', '8:0', 120));
console.log(checkTime('08:00', '14:30', '14:00', 90));
console.log(checkTime('14:00', '17:30', '08:0', 90));
console.log(checkTime('8:00', '17:30', '08:00', 900));


export {stringLengt, isPalindrom, extractNumber};
