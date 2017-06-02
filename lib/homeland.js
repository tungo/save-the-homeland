import Util from './util';
import Bullet from './bullet';

const DEFAULTS = {
  radius: 30,
  angle: 0,

  color: '#4FC3F7',
  borderColor: '#FFFFFF',
  borderWidth: 2,

  gunColor: '#FFEE58',
};

class Homeland {
  constructor(options) {
    options = Object.assign({}, DEFAULTS, options);

    this.game = options.game;

    this.pos = options.game.center;
    this.radius = options.radius;
    this.angle = options.angle;

    this.color = options.color;
    this.borderColor = options.borderColor;
    this.borderWidth = options.borderWidth;
    this.gunColor = options.gunColor;
  }

  draw(ctx) {
    this.drawGuns(ctx);

    const [x, y] = this.pos;

    ctx.fillStyle = this.borderColor;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.radius - this.borderWidth, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  drawGuns(ctx) {
    const pos = this.getGunPos();

    ctx.fillStyle = this.gunColor;

    ctx.beginPath();
    ctx.moveTo(...pos[0]);
    for (let i = 1; i < 8; i ++) {
      ctx.lineTo(...pos[i]);
    }
    ctx.fill();
  }

  getGunPos() {
    const length = this.radius + 15;
    const cos = length * Math.cos(this.angle);
    const sin = length * Math.sin(this.angle);
    const cosIn = length / 3 * Math.cos(this.angle + (45 * Math.PI / 180));
    const sinIn = length / 3 * Math.sin(this.angle + (45 * Math.PI / 180));
    const [x, y] = this.pos;

    return [
      [x + cos, y + sin],
      [x + cosIn, y + sinIn],
      [x - sin, y + cos],
      [x - sinIn, y + cosIn],
      [x - cos, y - sin],
      [x - cosIn, y - sinIn],
      [x + sin, y - cos],
      [x + sinIn, y - cosIn],
    ];
  }

  getBullets() {
    const gunPos = this.getGunPos();
    const [x, y] = this.pos;
    const bullets = [];

    gunPos.forEach((gpos, idx) => {
      if (idx % 2 === 0) {
        bullets.push({pos: gpos, vel: [gpos[0] - x, gpos[1] - y]});
      }
    });

    return bullets;
  }

  move(timeDelta) {

  }

  spin(clockwise = true) {
    if (clockwise) {
      this.angle += 3 * Math.PI / 180;
    } else {
      this.angle -= 3 * Math.PI / 180;
    }
  }

  fireBullets() {
    const bullets = this.getBullets();

    bullets.forEach((bullet) => {
      this.game.add(new Bullet({
        pos: bullet.pos,
        vel: bullet.vel,
        game: this.game,
        angle: this.angle
      }));
    });
  }
}

export default Homeland;