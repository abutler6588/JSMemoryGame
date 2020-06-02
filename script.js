const cardsArray = [{
    'name': 'shell',
    'img': 'img/06f0a3ea53641a3817a33c1a5e430e9f.gif',
  },
  {
    'name': 'star',
    'img': 'img/68770.gif',
  },
  {
    'name': 'bobomb',
    'img': 'img/1549456304_4YrO.gif',
  },
  {
    'name': 'mario',
    'img': 'img/BlueEvilIguanodon-size_restricted.gif',
  },
  {
    'name': 'luigi',
    'img': 'img/mk2.gif',
  },
  {
    'name': 'peach',
    'img': 'img/mk.gif',
  },
  {
    'name': '1up',
    'img': 'img/images.jpeg',
  },
  {
    'name': 'mushroom',
    'img': 'img/mortal-kombat-friendship-gif-11.gif',
  },
  {
    'name': 'thwomp',
    'img': 'img/smoke-mortal-kombat-gif.gif',
  },
  {
    'name': 'bulletbill',
    'img': 'img/source.gif',
  },
  {
    'name': 'coin',
    'img': 'img/tenor.gif',
  },
  {
    'name': 'goomba',
    'img': 'img/WBzI6W.gif',
  },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});