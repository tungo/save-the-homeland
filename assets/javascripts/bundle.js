/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(3);


const DEFAULTS = {
	radius: 3,
	speed: 5,

	color: '#90A4AE',
  borderColor: '#B0BEC5',
  borderWidth: 1,
};

class Bullet extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);

    options.vel = [options.vel[0] / options.speed, options.vel[1] / options.speed];

    super(options);

    this.angle = options.angle;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Util = {
  toCenterVec(pos, center, sec) {
    // fps is 60
    return [
      (center[0] - pos[0]) / sec / 60,
      (center[1] - pos[1]) / sec / 60
    ];
  },

  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(0);



const DEFAULTS = {
  radius: 30,
  angle: 0,

  color: '#4FC3F7',
  borderColor: '#FFFFFF',
  borderWidth: 2,

  gunColor: '#FFEE58',
};

class Homeland {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);

    this.game = options.game;

    this.pos = options.game.center;
    this.radius = options.radius;
    this.angle = options.angle;

    this.color = options.color;
    this.borderColor = options.borderColor;
    this.borderWidth = options.borderWidth;
    this.gunColor = options.gunColor;
  }

  draw(ctx) {
    this.drawGuns(ctx);

    const [x, y] = this.pos;

    ctx.fillStyle = this.borderColor;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.radius - this.borderWidth, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  drawGuns(ctx) {
    const pos = this.getGunPos();

    ctx.fillStyle = this.gunColor;

    ctx.beginPath();
    ctx.moveTo(...pos[0]);
    for (let i = 1; i < 8; i ++) {
      ctx.lineTo(...pos[i]);
    }
    ctx.fill();
  }

  getGunPos() {
    const length = this.radius + 15;
    const cos = length * Math.cos(this.angle);
    const sin = length * Math.sin(this.angle);
    const cosIn = length / 3 * Math.cos(this.angle + (45 * Math.PI / 180));
    const sinIn = length / 3 * Math.sin(this.angle + (45 * Math.PI / 180));
    const [x, y] = this.pos;

    return [
      [x + cos, y + sin],
      [x + cosIn, y + sinIn],
      [x - sin, y + cos],
      [x - sinIn, y + cosIn],
      [x - cos, y - sin],
      [x - cosIn, y - sinIn],
      [x + sin, y - cos],
      [x + sinIn, y - cosIn],
    ];
  }

  getBullets() {
    const gunPos = this.getGunPos();
    const [x, y] = this.pos;
    const bullets = [];

    gunPos.forEach((gpos, idx) => {
      if (idx % 2 === 0) {
        bullets.push({pos: gpos, vel: [gpos[0] - x, gpos[1] - y]});
      }
    });

    return bullets;
  }

  move(timeDelta) {

  }

  spin(clockwise = true) {
    if (clockwise) {
      this.angle += 3 * Math.PI / 180;
    } else {
      this.angle -= 3 * Math.PI / 180;
    }
  }

  fireBullets() {
    const bullets = this.getBullets();

    bullets.forEach((bullet) => {
      this.game.add(new __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */]({
        pos: bullet.pos,
        vel: bullet.vel,
        game: this.game,
        angle: this.angle
      }));
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Homeland);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);


class MovingObject {
  constructor(options) {
    this.game = options.game;

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;

    this.color = options.color;
    this.borderColor = options.borderColor;
    this.borderWidth = options.borderWidth;
  }

  draw(ctx) {
    ctx.fillStyle = this.borderColor;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius - this.borderWidth, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  move(timeDelta) {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  remove() {
    this.game.remove(this);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(6);


class GameView {
  constructor(ctx) {
    this.ctx = ctx;

    this.leftHeld = false;
    this.rightHeld = false;
    this.shootHelf = false;

    this.bulletTime = 20; //fps 60 = 1/1s
    this.bulletNext = 0;
    this.blur = false;

    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
    window.onfocus = this.handleFocus.bind(this);
    window.onblur = this.handleBlur.bind(this);
  }

  ready() {
    this.drawReady();
    this.game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](this.ctx);
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
      this.game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](this.ctx);
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
    requestAnimationFrame(this.animate.bind(this));
    this.game.spawnInvaders();
  }
  handleBlur(e) {
    this.game.blur = true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(4);


document.addEventListener('DOMContentLoaded', () => {
  const gameCanvas = document.getElementById('game-canvas');

  const ctx = gameCanvas.getContext("2d");
  const gameView = new __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* default */](ctx);
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

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__homeland__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__invader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(0);




const DEFAULTS = {
  dimX: 500,
  dimY: 500,
  center: [250, 250],

  score: 0,
  health: 3,

  textColor: '#FFFFFF',
  textFont: '16px lora',
  bgColor: "#000000"
};

class Game {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);
    this.homelands = [];
    this.invaders = [];
    this.bullets = [];

    this.dimX = options.dimX;
    this.dimY = options.dimY;
    this.center = options.center;

    this.score = options.score;
    this.health = options.health;

    this.textColor = options.textColor;
    this.textFont = options.textFont;
    this.bgColor = options.bgColor;

    this.start = false;
    this.pause = false;
    this.lost = false;
    this.won = false;

    this.spawnInvaders();
  }


  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__homeland__["a" /* default */]) {
      this.homelands.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__invader__["a" /* default */]) {
      this.invaders.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) {
      this.bullets.push(object);
    } else {
      throw "ObjectTypeError";
    }
  }

  addHomeland() {
    const homeland = new __WEBPACK_IMPORTED_MODULE_0__homeland__["a" /* default */]({
      game: this
    });

    this.add(homeland);

    return homeland;
  }

  spawnInvaders() {
    if (this.start && !this.pause) {
      this.add(new __WEBPACK_IMPORTED_MODULE_1__invader__["a" /* default */]({
        game: this
      }));
    }
    if (!this.isOver() && !this.blur) {
      setTimeout(this.spawnInvaders.bind(this), 750);
    }
  }

  allObjects() {
    return [].concat(this.homelands, this.invaders, this.bullets);
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0 ||
            pos[1] < 0 ||
            pos[0] > this.dimX ||
            pos[1] > this.dimY);
  }

  checkCollisions() {
    const invaders = this.invaders;
    const targets = [].concat(this.homelands, this.bullets);

    for (let i = 0; i < invaders.length; i++) {
      for (let j = 0; j < targets.length; j++) {
        const obj1 = invaders[i];
        const obj2 = targets[j];

        if (!obj1 || !obj2) {
          continue;
        }

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) continue;
        }
      }
    }
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  randomPosition() {
    const pos = [
      this.dimX * Math.random(),
      this.dimY * Math.random()
    ];

    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0:
        return [0, pos[1]];
      case 1:
        return [this.dimX, pos[1]];
      case 2:
        return [pos[0], 0];
      case 3:
        return [pos[0], this.dimY];
      default:
        return [0, 0];
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);

    ctx.fillStyle = this.textColor;
    ctx.font = this.textFont;
    ctx.fillText(`Score: ${this.score}`, 20, 20);
    ctx.fillText(`Health: ${this.health}`, 420, 20);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();

    if (this.health === 0) {
      this.lost = true;
    }
    if (this.score >= 100) {
      this.won = true;
    }
  }

  remove(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_1__invader__["a" /* default */]) {
      this.invaders.splice(this.invaders.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else {
      throw "ObjectTypeError";
    }
  }

  isOver() {
    return this.lost || this.won;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moving_object__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homeland__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bullet__ = __webpack_require__(0);





const DEFAULTS = {
	radius: 10,
	secToCenter: 2,

	color: '#F44336',
  borderColor: '#EF9A9A',
  borderWidth: 2,
};

class Invader extends __WEBPACK_IMPORTED_MODULE_1__moving_object__["a" /* default */] {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);

    options.pos = options.pos || options.game.randomPosition();

    options.vel = options.vel ||
                  __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].toCenterVec(
                    options.pos,
                    options.game.center,
                    options.secToCenter
                  );

    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof __WEBPACK_IMPORTED_MODULE_2__homeland__["a" /* default */]) {
      this.remove();
      this.game.health--;
      return true;
    } else if (otherObject instanceof __WEBPACK_IMPORTED_MODULE_3__bullet__["a" /* default */]) {
      this.remove();
      otherObject.remove();
      this.game.score++;
      return true;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Invader);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map