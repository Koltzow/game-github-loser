export default class Game {

  constructor(title = 'default title', unlocked = true) {

    // set title
    this.title = title;

    // set state
    this.unlocked = unlocked;

    // define levels
    this.levels = [];

  }

  reset() {}

  setup() {}

  addLevel(level) {
    this.levels.push(level);
  }

  unlockNextLevel(engine) {

    // unlock next level if more
    if(engine.currentLevelIndex < this.levels.length - 1){
      this.levels[engine.currentLevelIndex+1].unlocked = true;

      return true;
    }

    return false;

  }

  unlockNextGame(engine) {

    // check for last level and more games
    if(
      engine.currentLevelIndex >= this.levels.length &&
      engine.currentGameIndex < engine.games.length - 1
    ) {

      // unlock next game
      this.games[engine.currentGameIndex + 1].unlocked = true;

      return true;
    }

    return false;

  }

  update() {}

  draw() {}

}
