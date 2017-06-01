import Util from './util';
import Bullet from './bullet';

class Homeland {

  constructor(options) {
    this.pos = [250, 250];
    this.radius = 35;
    this.angle = 0;
    this.health = 3;

    this.color = '#4FC3F7';
    this.gunColor = '#FFEE58';
    this.textColor = '#FFF';
    this.textFont = '16px san-serif';

    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.gunColor;

    const gunPos = this.getGunPos();

    ctx.beginPath();
    ctx.moveTo(...gunPos[0]);
    ctx.lineTo(...gunPos[1]);
    ctx.lineTo(...gunPos[2]);
    ctx.lineTo(...gunPos[3]);
    ctx.fill();

    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.fillStyle = this.textColor;
    ctx.font = this.textFont;
    ctx.fillText(`Health: ${this.health}`, 420, 20);
  }

  getGunPos() {
    const cos = (this.radius + 5) * Math.cos(this.angle);
    const sin = (this.radius + 5) * Math.sin(this.angle);

    return [
      [this.pos[0] + cos, this.pos[1] + sin],
      [this.pos[0] - sin, this.pos[1] + cos],
      [this.pos[0] - cos, this.pos[1] - sin],
      [this.pos[0] + sin, this.pos[1] - cos],
    ];
  }

  getBullets() {
    const gunPos = this.getGunPos();

    return [
      {pos: gunPos[0], vel: [gunPos[0][0] - this.pos[0], gunPos[0][1] - this.pos[1]]},
      {pos: gunPos[1], vel: [gunPos[1][0] - this.pos[0], gunPos[1][1] - this.pos[1]]},
      {pos: gunPos[2], vel: [gunPos[2][0] - this.pos[0], gunPos[2][1] - this.pos[1]]},
      {pos: gunPos[3], vel: [gunPos[3][0] - this.pos[0], gunPos[3][1] - this.pos[1]]}
    ];
  }

  move(timeDelta) {

  }

  spin(clockwise = true) {
    if (clockwise) {
      this.angle = this.angle + (5 * Math.PI / 180);
    } else {
      this.angle = this.angle - (5 * Math.PI / 180);
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