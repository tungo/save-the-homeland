import Util from './util';

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
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  remove() {
    this.game.remove(this);
  }
}

export default MovingObject;
