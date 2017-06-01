const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;

    this.radius = options.radius;

    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA ;

    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  }

  collideWith(otherObject) {

  }

  isCollidedWith(otherObject) {

  }

  remove() {
    this.game.remove(this);
  }
}

export default MovingObject;
