import MovingObject from './moving_object';

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    options.color = '#999';
    options.vel = [options.vel[0] / Bullet.SPEED, options.vel[1] / Bullet.SPEED];
    super(options);
    this.angle = options.angle;
  }
}

Bullet.RADIUS = 3;
Bullet.SPEED = 5;

export default Bullet;