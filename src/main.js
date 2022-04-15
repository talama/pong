import Controller from './controller.js';
import Model from './model.js';
import View from './view.js';

// Game parameters
const cvs = document.getElementById('pong');
const ballRadius = 10;
const [playerWidth, playerLength] = [20, 75];
const [gameWidth, gameHeight] = [cvs.clientWidth, cvs.clientHeight];
const [ballColor, playerColor, aiColor] = ['red', 'orange', 'green'];

const updateRate = 1000 / 100;

const pongModel = new Model(
  gameWidth,
  gameHeight,
  playerWidth,
  playerLength,
  ballRadius,
  updateRate,
);

const pongView = new View(
  cvs,
  gameWidth,
  gameHeight,
  playerWidth,
  playerLength,
  ballColor,
  playerColor,
  aiColor,
);

const pongApp = new Controller(pongModel, pongView);
pongApp.run();
