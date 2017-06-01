import Util from './util';
import Bullet from './bullet';

class Homeland {

  constructor(options) {
    this.pos = [250, 250];
    this.radius = 35;
    this.angle = 0;
    this.color = '#4FC3F7';
    this.gunColor = '#FFEE58';
    this.game = options.game;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);

    ctx.fillStyle = this.gunColor;
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(40, 0);
    ctx.lineTo(0, 40);
    ctx.lineTo(-40, 0);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.restore();
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
    const bullets = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ];

    // bullets.forEach((bullet) => {
    //   this.game.add({
    //     pos:
    //   });
    // });

    const bullet = new Bullet({
      pos: [0, 0],
      vel: [0, -1],
      color: this.color,
      game: this.game,
      angle: this.angle
    });

    this.game.add(bullet);
  }

}

export default Homeland;