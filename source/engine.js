import Sound from './sound';
import Mouse from './mouse';
import Keyboard from './keyboard';
import Debugger from './debugger';
import Splashscreen from './splashscreen';
import Menu from './menu';
import Levels from './levels';
import Pong from './pong/pong';

const VALIDSTATES = [
  'SPLASHSCREEN',
  'MENU',
  'LEVELS',
  'PLAYING',
  'PAUSED',
];

export default class engine {

  constructor() {


    // set dimentions
    this.width = 1920;
    this.height = 1080;

    // setup canvas
    this.canvas = this.createCanvas('flex', this.width, this.height);

    // get context
    this.context = this.canvas.getContext('2d');

    // set framerate
    this.fps = 60;

    // set current frame
    this.frame = 0;

    // set state
    this.state = 'SPLASHSCREEN';

    // calc scale
    this.scale = window.innerWidth / this.width;

    // set current timestamp
		this.lastTimestamp = new Date();
		this.deltaTime = 0;

    // setup external classes
    this.mouse = new Mouse(this.canvas);
    this.keyboard = new Keyboard();
    this.debugger = new Debugger();
    this.splashscreen = new Splashscreen();
    this.menu = new Menu();
    this.levels = new Levels();
    this.sound = new Sound();

    // setup games
    this.games = [
      new Pong(this),
    ];

    // current game
    this.currentGameIndex = 0;
    this.currentGame = this.games.length > 0 ? this.games[this.currentGameIndex] : null;

    // set current level
    this.currentLevelIndex = 0;
    this.currentLevel = this.currentGame.levels[this.currentLevelIndex];

    // define manifest for sounds
    const manifest = [
      {id: 'main',    src: 'sounds/main.mp3'},
      {id: 'select',  src: 'sounds/select.mp3'},
      {id: 'back',    src: 'sounds/back.mp3'},
      {id: 'error',   src: 'sounds/error.wav'},
    ];

    // load sounds
    this.sound.load(manifest);

    // play main music
    this.sound.play('main', {
      loop: -1
    });

		// shim layer with setTimeout fallback
		window.requestAnimationFrame = (() => (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			((callback) => window.setTimeout(callback, 1000 / 60))
		))();

  }

  setGame (index) {

    // check if valid game
    if(index == null || index < 0 || index >= this.games.length){
      console.warn('Not a valid index or game');
      return false;
    }

    // check is game is locked
    if(!this.games[index].unlocked) {
      console.warn('Game is not unlocked');
      return false;
    }

    // all ok, set new game
    this.currentGameIndex = index
    this.currentGame = this.games[this.currentGameIndex];

    console.log('Game set:', this.currentGame.title);

    return true;

  }

  setLevel (index) {

    // check if valid level
    if(index == null || index < 0 || index >= this.currentGame.levels.length){
      console.warn('Not a valid index or level');
      return false;
    }

    // check is level is unlocked
    if(!this.currentGame.levels[index].unlocked) {
      console.warn('Level is not unlocked');
      return false;
    }

    // set current level
    this.currentLevelIndex = index;
    this.currentLevel = this.currentGame.levels[this.currentLevelIndex];

    // setup game
    this.currentGame.setup(this);

    console.log('Level set:', this.currentLevel.title);

    return true;

  }

  setState (state) {

    // check is valid state
    if(!VALIDSTATES.includes(state)) {
      console.warn('Not a valid state');
      return false;
    }

    // set state
    this.state = state;

    console.log('State set:', state);

    return true;

  }

  createCanvas (container = null, width = 540, height = 320) {

    // create canvas element
    const canvas = document.createElement('canvas');

    // set canvas id
    canvas.id = 'canvas';

    // set size
    canvas.width = width;
    canvas.height = height;

    // add dom to body
    if (container) {
      document.getElementById(container).appendChild(canvas);
    } else {
      document.body.appendChild(canvas);
    }

    return canvas;

  }

  clear () {

		// clear canvas
		this.context.clearRect(0, 0, this.width, this.height);

		// fill with ambient color
		this.context.fillStyle = '#000';
		this.context.fillRect(0, 0, this.width, this.height);
	}

	update() {

		// check state
		switch (this.state) {
      case 'SPLASHSCREEN':
        this.splashscreen.update(this);
        break;
			case 'MENU':
				this.menu.update(this);
				break;
      case 'LEVELS':
				this.levels.update(this);
				break;
			case 'PLAYING':
				this.currentGame.update(this);
        break;
			default:
		}

    // clear keyboard clicks
    this.keyboard.clear();

    // clear mouse states
    this.mouse.clear();

	}

	draw() {

		// clear canvas
		this.clear();

		// check state
		switch (this.state) {
      case 'SPLASHSCREEN':
        this.splashscreen.draw(this);
        break;
			case 'MENU':
				this.menu.draw(this);
				break;
      case 'LEVELS':
				this.levels.draw(this);
				break;
			case 'PLAYING':
				this.currentGame.draw(this);
				break;
			case 'PAUSED':
        console.log('draw paused');
				break;
			default:
		}

    // update debugger
    // this.debugger.add(this.mouse.x / this.scale);
    // this.debugger.add(this.mouse.y / this.scale);
    // this.debugger.draw(this);

	}

  loop () {

		//update frame
		this.frame++;

		// get current time
		const now = new Date();

		// calulate deltatime
  	this.deltaTime = now - this.lastTimestamp;

		// draw current state
		this.draw();

		// update current state
		this.update(this.deltaTime);

		// save current timestamp
  	this.lastTimestamp = now;

		// request new frame and rerun loop
		requestAnimationFrame(this.loop.bind(this));

	}

	run () {
		// start the game loop
		this.loop();
	}


}
