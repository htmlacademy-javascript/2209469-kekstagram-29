import {getRandomInRange} from './util.js';

const PICTURE_COUNT = 25;

const Avatar = {
  MIN: 1,
  MAX: 6
};

const Likes = {
  MIN: 15,
  MAX: 200
};

const COMMENT_COUNT = 30;

const COMMENTS_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Это фото — произведение искусства... Прекрасный фон, красивый антураж!',
  'Я просто прямой потомок грандиозности.',
  'Мир начинается с улыбки. #helloWorld',
  'Жизнь слишком коротка. Поэтому не забывайте улыбаться, пока ваши зубы все еще на месте.',
  'Круто, и так мило.',
  'Норм?',
  'Котики, ну куда же без них? #RedCat #keks',
  'Это фото сделало мой день.',
  'Работать трудно, но помните, что и хорошо погулять не просто. #relax #chill #friends',
  'Я люблю свою работу, особенно тогда, когда наступает отпуск! #chill',
  'Я не ленива. Я просто включила режим энергосбережения.'
];

const names = ['Александра', 'Кекс', 'Антон', 'Игорь', 'Владислав', 'Андрей'];

const pictures = [];

const picture = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: descriptions[getRandomInRange(0, descriptions.length - 1)],
  likes: getRandomInRange(Likes.MIN, Likes.MAX),
  comments: generateComments()
});

const addPictures = () => {
  for (let i = 1; i <= PICTURE_COUNT; i++) {
    pictures.push(picture(i));
  }
};


function generateComments () {
  const comments = [];
  for (let i = 0; i <= getRandomInRange(0, COMMENT_COUNT); i++) {
    comments.push({
      id: i,
      avatar: `img/avatar-${getRandomInRange(Avatar.MIN, Avatar.MAX)}.svg`,
      message: COMMENTS_LINES[getRandomInRange(0, COMMENTS_LINES.length - 1)],
      name: names[getRandomInRange(0, names.length - 1)]
    });
  }
  return comments;
}

const createPictures = () => Array.from({length: PICTURE_COUNT}, (_, id) =>
  picture(id + 1));

addPictures();

export { createPictures };
