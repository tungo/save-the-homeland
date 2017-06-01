class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.homeland = this.game.addHomeland();
  }

  start() {
    this.bindKeyHandlers();

    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    const homeland = this.homeland;

    key('a, left', () => homeland.spin(false));
    key('d, right', () => homeland.spin(true));
    key('space', () => homeland.fireBullets());
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;