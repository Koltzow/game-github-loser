import Ball from './ball';
import Paddle from './paddle';

export default class Pong {

  constructor(engine) {

    // set title
    this.title = 'Pong';

    // set state
    this.unlocked = true;

    // add level info
    this.levels = [
      {
        title: 'small ball',
        image: '',
        unlocked: true,
        properties: {
          player: {
            height: 200,
            speed: 10,
          },
          computer: {
            height: 100,
            speed: 2,
          },
          ball: {
            count: 1,
            speed: 20,
            size: 30,
          }
        }
      },
      {
        title: 'big ball',
        image: '',
        unlocked: false,
        properties: {
          player: {
            height: 100,
            speed: 2,
          },
          computer: {
            height: 400,
            speed: 20,
          },
          ball: {
            count: 1,
            speed: 20,
            size: 60,
          }
        }
      }
    ];

    // set default properties
    this.properties = this.levels[0];

    // define effects
    this.effects = [];

    // set score
    this.score = [0, 0];

    // set countdown
    this.countdown = 3000;

    // set win-lose threshhold
    this.winMax = 3;
    this.loseMax = 3;

    // add paddles
    this.player = null;
    this.computer = null;

    // add ball
    this.balls = [];

    // create manifest with required sounds
    const manifest = [
      {id: 'pong-wall', src: './source/pong/sounds/pong-wall.wav'},
      {id: 'pong-paddle-left', src: './source/pong/sounds/pong-paddle-left.wav'},
      {id: 'pong-paddle-right', src: './source/pong/sounds/pong-paddle-right.wav'},
      {id: 'pong-3', src: './source/pong/sounds/pong-3.wav'},
      {id: 'pong-2', src: './source/pong/sounds/pong-2.wav'},
      {id: 'pong-1', src: './source/pong/sounds/pong-1.wav'},
      {id: 'pong-go', src: './source/pong/sounds/pong-go.wav'},
    ];

    // load sounds
    engine.sound.load(manifest);

  }

  resetTimer() {

    // reset timer
    this.countdown = 60*3;

  }

  resetScore() {

    // reset score
    this.score = [0, 0];

  }

  reset() {

    // reset score
    this.resetScore();

    // reset timer
    this.resetTimer();

    // empty arrays
    this.balls = [];
    this.effects = [];

    // null players
    this.player = null;
    this.computer = null;

  }

  setup(engine) {

    // get consts
    const { currentLevelIndex } = engine;

    // reset game
    this.reset();

    // set level properties
    this.properties = this.levels[currentLevelIndex].properties;

    // define player
    this.player = new Paddle({
      engine: engine,
      height: this.properties.player.height,
      speed: this.properties.player.speed,
      computer: false,
    });

    // define computer
    this.computer = new Paddle({
      engine: engine,
      height: this.properties.computer.height,
      speed: this.properties.computer.speed,
      computer: true,
    });

    // add balls
    for (var i = 0; i < this.properties.ball.count; i++) {
      this.balls.push(
        new Ball({
          engine: engine,
          size: this.properties.ball.size,
          speed: this.properties.ball.speed,
        })
      );
    }

  }

  update(engine) {

    // check is player has won
    if(this.score[0] >= this.winMax) {

      // change state back to level select
      engine.setState('LEVELS');

      // return to stop further execution
      return;

    }

    // check is computer has won
    if(this.score[1] >= this.loseMax) {

      // unlock next level if more
      if(engine.currentLevelIndex < this.levels.length - 1){
        this.levels[engine.currentLevelIndex+1].unlocked = true;
      }

      // check for last level and more games
      if(
        engine.currentLevelIndex >= this.levels.length &&
        engine.currentGameIndex < engine.games.length - 1
      ) {

        // unlock next game
        this.games[engine.currentGameIndex + 1].unlocked = true;

        // change state back to game select
        engine.setState('MENU');

      } else {

        // if not go back to level select
        engine.setState('LEVELS');

      }

      // return to stop further execution
      return;

    }

    // update player
    this.player.update(engine, this.balls);

    // update computer
    this.computer.update(engine, this.balls);

    // update effects
    this.effects.forEach(effect => {
      effect.update(engine);
    });

    // remove finished effects
    this.effects = this.effects.filter(effect => {
      return !effect.remove;
    });

    // check if its counting down
    if(this.countdown >= 0){

      // play sounds each second
      if(this.countdown === 60*3){
        engine.sound.play('pong-3');
      } else if (this.countdown === 60*2) {
        engine.sound.play('pong-2');
      } else if (this.countdown === 60*1) {
        engine.sound.play('pong-1');
      } else if (this.countdown === 0) {
        engine.sound.play('pong-wall');
      }

      // reduce counter
      this.countdown--;

      // return to stop further execution
      return;
    }

    // update balls
    this.balls.forEach(ball => {
      ball.update(engine, this);
    });

  }

  draw(engine) {

    // get consts
    const { context, width, height } = engine;

    // draw background
    context.fillStyle = '#FF466B';
    context.fillRect(0, 0, width, height);

    // draw line
    context.fillStyle = 'white';
    context.fillRect(width/2 - 2, 0, 4, height);

    // draw score
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.font = 'bold 300px sans-serif';
    context.fillText(this.score[0]+'  '+this.score[1], width/2, height*0.6);

    // draw effects
    this.effects.forEach(effect => {
      effect.draw(engine);
    });

    // draw paddles
    this.player.draw(engine);
    this.computer.draw(engine);

    // stop drawing if counting down
    if(this.countdown >= 0) {
      return;
    }

    // draw balls
    this.balls.forEach(ball => {
      ball.draw(engine);
    });

  }

}
