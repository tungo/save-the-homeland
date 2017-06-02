import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');

  const ctx = gameCanvas.getContext("2d");
  const gameView = new GameView(ctx);
  gameView.ready();


  const startButton = document.getElementById('start');
  startButton.addEventListener('click', () => gameView.start());

  const pauseButton = document.getElementById('pause');
  pauseButton.addEventListener('click', () => {
    gameView.pause();
    updatePause(pauseButton, gameView);
  });

  const stopButton = document.getElementById('stop');
  stopButton.addEventListener('click', () => gameView.stop());

  document.addEventListener('keypress', () => {
    updatePause(pauseButton, gameView);
  });
  document.addEventListener('click', () => {
    updatePause(pauseButton, gameView);
  });
});

const updatePause = (pauseButton, gameView) => {
  pauseButton.innerText = (gameView.game.pause ? 'Resume' : 'Pause');
};