import MovingObject from './moving_object';

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    options.color = '#FFF';
    super(options);
    this.isWrappable = false;
    this.angle = options.angle;
  }

  draw(ctx) {
    ctx.save();

    super.draw(ctx);

    ctx.restore();
  }

}

Bullet.RADIUS = 3;
Bullet.SPEED = 15;

export default Bullet;