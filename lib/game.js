import Homeland from './homeland';
import Invader from './invader';
import Bullet from './bullet';

const DEFAULT = {
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
    options = Object.assign(DEFAULT, options);
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
    if (object instanceof Homeland) {
      this.homelands.push(object);
    } else if (object instanceof Invader) {
      this.invaders.push(object);
    } else if (object instanceof Bullet) {
      this.bullets.push(object);
    } else {
      throw "ObjectTypeError";
    }
  }

  addHomeland() {
    const homeland = new Homeland({
      game: this
    });

    this.add(homeland);

    return homeland;
  }

  spawnInvaders() {
    if (this.start && !this.pause) {
      this.add(new Invader({
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
    if (object instanceof Invader) {
      this.invaders.splice(this.invaders.indexOf(object), 1);
    } else if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else {
      throw "ObjectTypeError";
    }
  }

  isOver() {
    return this.lost || this.won;
  }
}

export default Game;