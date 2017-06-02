import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;

    this.leftHeld = false;
    this.rightHeld = false;
    this.shootHelf = false;

    this.bulletTime = 15; //fps 60 = 1/1s
    this.bulletNext = 0;
    this.blur = false;

    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
    window.onfocus = this.handleFocus.bind(this);
    window.onblur = this.handleBlur.bind(this);
  }

  ready() {
    this.drawReady();
    this.game = new Game(this.ctx);
    this.homeland = this.game.addHomeland();
  }

  start() {
    if (!this.game.start) {
      this.game.start = true;
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  restart() {
    if (this.game.isOver()) {
      this.game = new Game(this.ctx);
      this.homeland = this.game.addHomeland();
      this.start();
    }
  }

  pause() {
    if (this.game.start) {
      if (this.game.pause) {
        requestAnimationFrame(this.animate.bind(this));
      }
      this.game.pause = !this.game.pause;
    }
  }

  stop() {
    this.ready();
  }

  animate(time) {
    // const timeDelta = time - this.lastTime;
    // this.lastTime = time;

    if (!this.game.start || this.game.pause || this.game.isOver() || this.game.blur) {
      return;
    }

    if (this.leftHeld) {
      this.homeland.spin(false);
    }
    if (this.rightHeld) {
      this.homeland.spin(true);
    }
    if (this.shootHeld) {
      if (this.bulletNext <= 0) {
        this.homeland.fireBullets();
        this.bulletNext = this.bulletTime;
      }
    }
    this.bulletNext--;

    this.game.step();
    this.game.draw(this.ctx);

    if (this.game.won) {
      this.drawWon();
    }
    if (this.game.lost) {
      this.drawLost();
    }

    requestAnimationFrame(this.animate.bind(this));
  }

  drawReady() {
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px san-serif';
    this.ctx.fillText('Press Enter to start the game', 140, 240);
  }

  drawWon() {
    this.ctx.fillStyle = '#000';
    this.ctx.globalAlpha = 0.75;
    this.ctx.fillRect(0, 0, 500, 500);
    this.ctx.globalAlpha = 1.0;
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px san-serif';
    this.ctx.fillText('Congratulation! YOU WON!', 140, 230);
    this.ctx.fillText('Press Enter to restart the game', 140, 260);
  }

  drawLost() {
    this.ctx.fillStyle = '#000';
    this.ctx.globalAlpha = 0.75;
    this.ctx.fillRect(0, 0, 500, 500);
    this.ctx.globalAlpha = 1.0;
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px san-serif';
    this.ctx.fillText('You lost!', 220, 230);
    this.ctx.fillText('Press Enter to restart the game', 140, 260);
  }

  handleKeyDown(e) {
    if (!e) {
      e = window.event;
    }

    if (e.keyCode === 13) {
      if (this.game.isOver()) {
        this.restart();
      } else if (!this.game.start) {
        this.start();
      } else {
        this.pause();
      }
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

  handleFocus(e) {
    this.game.blur = false;
  }
  handleBlur(e) {
    this.game.blur = true;
  }

  easyMode(enable) {
    this.bulletTime = enable ? 0 : 15;
  }
}

export default GameView;