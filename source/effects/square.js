export default class Square {

  constructor(x = 0, y = 0) {

    // set position
    this.x = x;
    this.y = y;

    // define lifespan
    this.life = 0;
    this.maxLife = 50;

    // set state
    this.remove = false;

  }

  update(engine) {

    // increment life
    this.life++;

    // remove if past max life
    if (this.life > this.maxLife) {
      this.remove = true;
    }

  }

  draw(engine) {

    // get consts
    const { context } = engine;
    const dist = this.life * 2;

    // set style
    context.strokeStyle = 'rgba(255,255,255,'+(1 - this.life / this.maxLife)+')';
    context.lineWidth = 8;

    // draw path and stroke
    context.beginPath();
    context.moveTo(this.x, this.y - dist);
    context.lineTo(this.x + dist, this.y);
    context.lineTo(this.x, this.y + dist);
    context.lineTo(this.x - dist, this.y);
    context.lineTo(this.x, this.y - dist);
    context.stroke();

  }

}
