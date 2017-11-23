export default class Menu {

  constructor() {

    this.selected = 0;
    this.size = 300;
    this.padding = 50;

  }

  update(engine) {

    const { keyboard, games, width, height, mouse, sound } = engine;

    if(keyboard.isClicked(keyboard.key.SPACE) || keyboard.isClicked(keyboard.key.ENTER)) {
      if(engine.setGame(this.selected)){
        engine.sound.play('select');
        engine.setState('LEVELS');
      }
    }

    if(keyboard.isClicked(keyboard.key.ARROW_RIGHT) && this.selected < games.length - 1) {
      this.selected++;
    }

    if(keyboard.isClicked(keyboard.key.ARROW_LEFT) && this.selected > 0) {
      this.selected--;
    }

    games.forEach(( game, index ) => {

      const x = width/ 2 - this.size * games.length/2 - this.padding * (games.length-1)/2 + index * (this.size + this.padding);
      const y = height*0.5;

      if(
        mouse.x > x &&
        mouse.x < x + this.size &&
        mouse.y > y &&
        mouse.y < y + this.size
      ) {
        this.selected = index;

        if(mouse.isClicked()) {

          if(engine.setGame(this.selected)){

            engine.sound.play('select');
            engine.setState('LEVELS');

          } else {
            sound.play('error');
          }
        }

      }

    });

  }

  draw(engine) {

    const { context, width, height, frame, mouse, games } = engine;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.font = 'bold 100px sans-serif';
    context.fillText('Select game', width/2, height*0.2);

    if(games.length <= 0) {
      return;
    }

    games.forEach(( game, index ) => {

      const x = width/ 2 - this.size * games.length/2 - this.padding * (games.length-1)/2 + index * (this.size + this.padding);
      const y = height*0.5;

      if(
        mouse.x > x &&
        mouse.x < x + this.size &&
        mouse.y > y &&
        mouse.y < y + this.size
      ) {
        this.selected = index;
      }

      context.font = 'bold 50px sans-serif';
      context.fillText(game.title, x + this.size/2, y + this.size + 60);

      context.fillStyle = (game.unlocked) ? 'green' : 'red';
      context.fillRect(x, y, this.size, this.size);

      if(index === this.selected){
        context.strokeStyle = 'yellow';
        context.lineWidth = 10;
        context.strokeRect(x, y, this.size, this.size);
      }

    });


  }

}
