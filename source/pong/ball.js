import Square from '../effects/square';

export default class Ball {

  constructor({engine, size, speed} = {
    engine: {},
    size: 10,
    speed: 10,
  }) {

    this.speed = speed;
    this.size = size;

    this.startX = engine.width/2 - this.size/2;
    this.startY = engine.height/2 - this.size/2;

    this.x = this.startX;
    this.y = this.startY;

    this.vx = this.speed;
    this.vy = 0;

  }

  colliding(obj) {

    return(
      this.x < obj.x + obj.width &&
      this.x + this.size > obj.x &&
      this.y < obj.y + obj.height &&
      this.size + this.y > obj.y
    );

  }

  reset(dir = 1) {

    this.x = this.startX;
    this.y = this.startY;

    this.vx = this.speed * dir;
    this.vy = 0;

  }

  update(engine, pong) {

    // get consts
    const { player, computer, score } = pong;
    const { width, height, sound } = engine;

    // update position
    this.x += this.vx;
    this.y += this.vy;

    // check collision with player
    if(this.colliding(player)) {

      // reposition x
      this.x = player.x + player.width;

      // update velocity
      this.vx = Math.abs(this.vx);
      this.vy -= ((player.y + player.height/2 - this.y - this.size/2) / (player.height/2)) * 5;
      this.vy += player.vy * 0.5;

      // add effect
      pong.effects.push(new Square(this.x, this.y));

      // play sound
      sound.play('pong-paddle-left');

    }

    // check collision with computer
    if(this.colliding(computer)) {

      // reposition x
      this.x = computer.x - this.size;

      // update velocity
      this.vx = Math.abs(this.vx) * -1;
      this.vy -= ((computer.y + computer.height/2 - this.y - this.size/2) / (computer.height/2)) * 5;
      this.vy += computer.vy * 0.5;

      // add effect
      pong.effects.push(new Square(this.x, this.y));

      // play sound
      sound.play('pong-paddle-right');

    }

    // check left collision
    if(this.x + this.size > width) {

      // reset ball
      this.reset(-1);

      // update score
      score[0]++;

      // reset pong timer
      pong.resetTimer();

      // play sound
      sound.play('pong-wall');

    }

    if(this.x < 0) {

      // reset ball
      this.reset(1);

      // update score
      score[1]++;

      // reset pong timer
      pong.resetTimer();

      // play sound
      sound.play('pong-wall');

    }

    if(this.y < 0) {

      this.y = 0;
      this.vy = Math.abs(this.vy);

      pong.effects.push(new Square(this.x, this.y));

      sound.play('pong-wall');
    }

    if(this.y + this.size > height) {

      this.y = height - this.size;
      this.vy = Math.abs(this.vy) * -1;

      pong.effects.push(new Square(this.x, this.y));

      sound.play('pong-wall');
    }

  }

  draw(engine) {

    const { context } = engine;

    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.size, this.size);

  }

}
