import './form-picture.js';
import './messages.js';
import {renderMiniature } from './miniatures.js';
import { loadData } from './fetch.js';


let picture = [];


const onSuccess = (data) => {
  picture = data.slice();
  renderMiniature(picture);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};


const onError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.textAlign = 'top';
  messageAlert.style.fontSize = '14px';
  messageAlert.style.backgroundColor = '#8B0000';
  messageAlert.style.borderRadius = '10px';
  messageAlert.textContent = 'Ошибка загрузки изображения!';
  document.body.append(messageAlert);
};


loadData(onSuccess, onError);


