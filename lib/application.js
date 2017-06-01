import Game from './game';
import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');

  gameCanvas.width = Game.DIM_X;
  gameCanvas.height = Game.DIM_Y;

  const ctx = gameCanvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});