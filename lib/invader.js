import Util from './util';
import MovingObject from './moving_object';
import Homeland from './homeland';
import Bullet from './bullet';

const DEFAULTS = {
	radius: 10,
	secToCenter: 2,

	color: '#F44336',
  borderColor: '#EF9A9A',
  borderWidth: 2,
};

class Invader extends MovingObject {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);

    options.pos = options.pos || options.game.randomPosition();

    options.vel = options.vel ||
                  Util.toCenterVec(
                    options.pos,
                    options.game.center,
                    options.secToCenter
                  );

    super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof Homeland) {
      this.remove();
      this.game.health--;
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