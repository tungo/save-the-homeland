import MovingObject from './moving_object';

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
    this.angle = options.angle;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(250, 250);
    ctx.rotate(this.angle);

    super.draw(ctx);

    ctx.restore();
  }

}

Bullet.RADIUS = 3;
Bullet.SPEED = 15;

export default Bullet;