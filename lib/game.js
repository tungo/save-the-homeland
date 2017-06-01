import Homeland from './homeland';
import Invader from './invader';
import Bullet from './bullet';

class Game {
  constructor() {
    this.homelands = [];
    this.invaders = [];
    this.bullets = [];

    setInterval(this.spawnInvaders.bind(this), 1000);
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
    this.add(new Invader({
      game: this
    }));
  }

  allObjects() {
    return [].concat(this.homelands, this.invaders, this.bullets);
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0 ||
            pos[1] < 0 ||
            pos[0] > Game.DIM_X ||
            pos[1] > Game.DIM_Y);
  }

  checkCollisions() {
    const invaders = this.invaders;
    const targets = [].concat(this.homelands, this.bullets);

    for (let i = 0; i < invaders.length; i++) {
      for (let j = 0; j < targets.length; j++) {
        const obj1 = invaders[i];
        const obj2 = targets[j];

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
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];

    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0:
        return [0, pos[1]];
      case 1:
        return [Game.DIM_X, pos[1]];
      case 2:
        return [pos[0], 0];
      case 3:
        return [pos[0], Game.DIM_Y];
      default:
        return [0, 0];
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
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

}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.CENTER = [250, 250];
Game.BG_COLOR = "#000";

export default Game;