import Util from './util';
import Bullet from './bullet';

class Homeland {

  constructor(options) {
    this.pos = [250, 250];
    this.radius = 30;
    this.angle = 0;

    this.health = 3;
    this.score = 0;

    this.color = '#4FC3F7';
    this.borderColor = '#FFF';
    this.gunColor = '#FFEE58';
    this.textColor = '#FFF';
    this.textFont = '16px san-serif';

    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.gunColor;

    this.drawGuns(ctx);

    ctx.fillStyle = this.borderColor;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius - 2, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.textColor;
    ctx.font = this.textFont;
    ctx.fillText(`Score: ${this.game.score}`, 20, 20);
    ctx.fillText(`Health: ${this.health}`, 420, 20);
  }

  drawGuns(ctx) {
    const pos = this.getGunPos();

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