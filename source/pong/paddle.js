export default class Paddle {

  constructor({height, speed, engine, computer} = {
    height: 100,
    speed: 1,
    engine: {},
    computer: false,
  }) {

    // set size
    this.height = height;
    this.width = 20;

    // set spacing
    this.spacing = 20;

    // set speed
    this.speed = speed;

    // set position
    this.x = computer ? (engine.width - this.width - this.spacing) : this.spacing;
    this.y = engine.height/2 - this.height/2;

    // set velocity
    this.vy = 0;

    // set if computer
    this.computer = computer;

  }

  update(engine, balls) {

    const { keyboard, height, mouse } = engine;

    let y = this.y;

    if(this.computer) {

      let closest = Infinity;
      let y = 0;
      let theball = null;

      balls.forEach(ball => {
        if(this.x - ball.x < closest){
          closest = this.x - ball.x;
          y = ball.y;
          theball = ball;
        }
      });

      this.y -= (this.y + this.height/2 - y) * 0.4;

    } else {

      if(keyboard.isPressed(keyboard.key.ARROW_UP || keyboard.isPressed())){
        this.y -= this.speed;
      }

      if(keyboard.isPressed(keyboard.key.ARROW_DOWN)){
        this.y += this.speed;
      }

      this.y = (mouse.y) - this.height/2;

    }


    if(this.y < 0) {
      this.y = 0;
    }

    if(this.y + this.height > height){
      this.y = height - this.height;
    }

    this.vy = this.y - y;

  }

  draw(engine) {

    const { height, context } = engine;

    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);

  }

}
