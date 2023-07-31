import './form-picture.js';
import './messages.js';
import {renderMiniature } from './miniatures.js';
import { loadData } from './fetch.js';
import './filters-button.js';
import './push-photos.js';


let picture = [];


const onSuccess = (data) => {
  picture = data.slice();
  renderMiniature(picture);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};


const onError = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = '10px';
  messageAlert.style.top = '12px';
  messageAlert.style.right = '40px';
  messageAlert.style.textAlign = 'center';
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = '#8B0000';
  messageAlert.style.borderRadius = '25px';
  messageAlert.style.minHeight = '50px';
  messageAlert.style.padding = '10px';
  messageAlert.textContent = 'Ошибка загрузки изображения!';
  document.body.append(messageAlert);
};


loadData(onSuccess, onError);


export { picture };
