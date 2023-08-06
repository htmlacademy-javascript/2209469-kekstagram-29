const Url = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram1',
};


const sendData = (onSuccess, onError, method, body) => {
  fetch(
    Url[method],
    {
      method: method,
      body: body,
    },
  )
    .then ((responce) => responce.json())
    .then ((data) => {
      onSuccess(data);
    })
    .catch ((err) => {
      onError(err);
    });
};


const loadData = (onSuccess, onError, method = 'GET') =>
  sendData(onSuccess, onError, method);

const uploadData = (onSuccess, onError, method = 'POST', body) =>
  sendData(onSuccess, onError, method, body);

export { loadData, uploadData };
