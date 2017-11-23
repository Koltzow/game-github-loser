export default class Mouse {

	constructor(target) {

		// define position
		this.x = 0;
		this.y = 0;

		// define states
		this.mousedown = false;
		this.mouseup = false;
		this.clicked = false;

		// set mouse target
		this.target = target;

		// add eventlisteners
		target.addEventListener('mousemove', this.mousemove.bind(this));
		target.addEventListener('click', this.click.bind(this));

	}

	clear() {
		this.clicked = false;
	}

	click() {
		this.clicked = true;
	}

	isClicked() {
		return this.clicked;
	}

	mousemove(e) {
		this.x = e.offsetX;
		this.y = e.offsetY;
	}

	mousedown(e) {
		this.mousedown = true;
	}

	mouseup(e) {
		this.mousedown = false;
		this.mouseup = true;
	}

}
