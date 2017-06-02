import Util from './util';
import MovingObject from './moving_object';
import Homeland from './homeland';
import Bullet from './bullet';

const DEFAULTS = {
	COLOR: "#F44336",
	RADIUS: 10,
	SEC: 2
};

class Invader extends MovingObject {
  constructor(options) {
    options.color = DEFAULTS.COLOR;
    options.border = '#EF9A9A';
    options.pos = options.pos || options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel ||
                  Util.toCenterVec(options.pos, [250, 250], DEFAULTS.SEC);
    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Homeland) {
      this.remove();
      otherObject.health--;
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      this.game.score++;
      return true;
    }
  }
}

export default Invader;