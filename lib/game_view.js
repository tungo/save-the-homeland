class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.homeland = this.game.addHomeland();

    this.leftHeld = false;
    this.rightHeld = false;
    this.shootHelf = false;
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (this.leftHeld) {
      this.homeland.spin(false);
    }
    if (this.rightHeld) {
      this.homeland.spin(true);
    }
    if (this.shootHeld) {
      this.homeland.fireBullets();
    }

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  handleKeyDown(e) {
    if (!e) {
      e = window.event;
    }

    switch (e.keyCode) {
      case 32:
        this.shootHeld = true;
        return;
      case 65:
      case 37:
        this.leftHeld = true;
        return;
      case 68:
      case 39:
        this.rightHeld = true;
        return;
    }
  }

  handleKeyUp(e) {
    if (!e) {
      e = window.event;
    }

    switch (e.keyCode) {
      case 32:
        this.shootHeld = false;
        return;
      case 65:
      case 37:
        this.leftHeld = false;
        return;
      case 68:
      case 39:
        this.rightHeld = false;
        return;
    }
  }
}

export default GameView;