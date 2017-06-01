import MovingObject from './moving_object';

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    options.color = '#FFF';
    options.vel = [options.vel[0] / 6, options.vel[1] / 6]
    super(options);
    this.angle = options.angle;
  }
}

Bullet.RADIUS = 3;
Bullet.SPEED = 15;

export default Bullet;