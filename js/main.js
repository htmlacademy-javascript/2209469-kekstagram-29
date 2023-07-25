import './form-picture.js';


import {createPictures} from './data.js';
import {renderMiniature} from './miniatures.js';
import {onFormSubmit} from './validate.js';


renderMiniature(createPictures());
onFormSubmit();


