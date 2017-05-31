import Util from './util';
import MovingObject from './moving_object';

const DEFAULTS = {
	COLOR: "#FF5722",
	RADIUS: 10,
	SEC: 4
};

class Invader extends MovingObject {
  constructor(options) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel ||
                  Util.toCenterVec(options.pos, [249, 249], DEFAULTS.SEC);
    super(options);
  }

}

export default Invader;