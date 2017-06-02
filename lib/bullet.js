import MovingObject from './moving_object';

const DEFAULTS = {
	radius: 3,
	speed: 5,

	color: '#90A4AE',
  borderColor: '#B0BEC5',
  borderWidth: 1,
};

class Bullet extends MovingObject {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);

    options.vel = [options.vel[0] / options.speed, options.vel[1] / options.speed];

    super(options);

    this.angle = options.angle;
  }
}

export default Bullet;