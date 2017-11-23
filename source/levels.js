export default class Levels {

  constructor() {

    this.selected = 0;
    this.size = 300;
    this.padding = 50;

  }

  update(engine) {

    const { keyboard, currentGame, width, height, mouse, scale, sound } = engine;

    if(keyboard.isClicked(keyboard.key.SPACE) || keyboard.isClicked(keyboard.key.ENTER)) {
      if(engine.setLevel(this.selected)){
        engine.sound.play('back');
        engine.setState('PLAYING');
      } else {
        engine.sound.play('error');
      }
    }

    if(keyboard.isClicked(keyboard.key.ARROW_RIGHT) && this.selected < currentGame.levels.length - 1) {
      this.selected++;
    }

    if(keyboard.isClicked(keyboard.key.ARROW_LEFT) && this.selected > 0) {
      this.selected--;
    }

    currentGame.levels.forEach(( level, index ) => {

      const x = width/ 2 - this.size * currentGame.levels.length/2 - this.padding * (currentGame.levels.length-1)/2 + index * (this.size + this.padding);
      const y = height*0.5;

      if(
        mouse.x / scale > x &&
        mouse.x / scale < x + this.size &&
        mouse.y / scale > y &&
        mouse.y / scale < y + this.size
      ) {
        this.selected = index;

        if(mouse.isClicked()) {
          if(engine.setLevel(this.selected)){
            sound.play('back');
            engine.setState('PLAYING');
          } else {
            sound.play('error');
          }
        }

      }

    });

  }

  draw(engine) {

    const { currentGame, context, width, height, frame, mouse, scale, sound } = engine;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.font = 'bold 100px sans-serif';
    context.fillText('Select level', width/2, height*0.2);

    if(currentGame.levels.length <= 0) {
      return;
    }

    currentGame.levels.forEach(( level, index ) => {

      const x = width/ 2 - this.size * currentGame.levels.length/2 - this.padding * (currentGame.levels.length-1)/2 + index * (this.size + this.padding);
      const y = height*0.5;

      context.fillStyle = (level.unlocked) ? 'white' : 'red';
      context.font = 'bold 50px sans-serif';
      context.fillText((level.unlocked) ? level.title : 'locked', x + this.size/2, y + this.size + 60);

      context.fillStyle = (level.unlocked) ? 'green' : 'red';
      context.fillRect(x, y, this.size, this.size);

      if(index === this.selected){
        context.strokeStyle = 'yellow';
        context.lineWidth = 10;
        context.strokeRect(x, y, this.size, this.size);
      }

    });


  }

}
