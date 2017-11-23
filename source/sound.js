export default class Sound {

	constructor() {

		this.sounds = [];
		this.soundsPlaying = [];

	}

	play(id, params = {
		volume: 1,
		loop: 0,
	}) {

		const _this = this;

		var sound = null;

		this.sounds.forEach((s, index) => {

			if(s.id === id){
				sound = s;
				return;
			}

		});

		if(sound !== null && sound.loaded){

			const audio = new Audio();

			audio.volume = params.volume;

			let loopCounter = 0;

			if(params.loop === -1){

				audio.loop = true;

			} else if (params.loop > 1) {

				audio.addEventListener('ended', function(){
					_this.remove(sound.id);
				    if (loopCounter < parama.loop-1){
				        this.currentTime = 0;
				        this.play();
				        _this.soundsPlaying.push({
				        	id: sound.id,
				        	audio: this
				        });
				        loopCounter++;
				    }
				}, false);

			} else {

				audio.addEventListener('ended', function(){
					_this.remove(sound.id);
				}, false);

			}

			audio.src = sound.src;
			audio.play();

			this.soundsPlaying.push({
				id: sound.id,
				audio: audio
			});

		} else {
			sound.play = true;
			console.warn('Sound not ready, playing when loaded');
		}

	}

	pauseAll () {

		this.soundsPlaying.forEach(sound => {
			sound.audio.pause();
		});

	}

	playAll () {

		this.soundsPlaying.forEach(sound => {
			sound.audio.play();
		});

	};

	stop (id) {

		this.soundsPlaying.forEach((sound, index) => {
	    if (sound.id === id) {
        sound.audio.pause();
        this.soundsPlaying.splice(index, 1);
        return;
	    }
		});

	}

	remove (id) {

		this.soundsPlaying.forEach((sound, index) => {
	    if (sound.id === id) {
	        this.soundsPlaying.splice(index, 1);
	        return;
	    }
		});

	}

	load (manifest) {

		const _this = this;

		manifest.forEach((sound, index) => {

			if(sound.id !== undefined && sound.src !== undefined){

				let gotSound = false;

				this.sounds.forEach(s => {
					if(s.id === sound.id){
						gotSound = true;
					}
				});

				if(!gotSound){

					(() => {

						let newSound = {
							id: sound.id,
							src: sound.src,
							loaded: false
						};

						_this.sounds.push(newSound);

						const audio = new Audio();

						audio.addEventListener('canplaythrough', function () {
							newSound.loaded = true;

							if(newSound.play){
								_this.play(newSound.id);
							}
						}, false);

						audio.src = sound.src;

					})();

				}

			}

		});

	}

}
