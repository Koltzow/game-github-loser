export default class Splashscreen {

  update(engine) {

    const { keyboard, mouse } = engine;

    if(keyboard.isClicked(keyboard.key.SPACE) || keyboard.isClicked(keyboard.key.ENTER) || mouse.isClicked()) {
      engine.sound.play('select');
      engine.setState('MENU');
    }

  }

  draw(engine) {

    const { context, width, height, frame } = engine;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.font = 'bold 300px sans-serif';
    context.fillText('LOSER', width/2, height*0.5);

    if (Math.sin(frame/15) > 0.2) {
      context.font = '50px sans-serif';
      context.fillText('PRESS SPACE TO START', width/2, height*0.7);
    }

  }

}
