export default class Level {

  constructor(title = 'default title', imageurl = null, unlocked = true, properties = {}) {

    // set level title
    this.title = title;

    // create image
    if(imageurl !== null){
      this.image = new Image();
      this.image.src = imageurl;
    } else {
      this.image = imageurl;
    }

    // set state
    this.unlocked = unlocked;

    // set properties
    this.properties = properties;

  }

  setTitle(title) {
    this.title = title;
  }

  unlock() {
    this.unlocked = true;
  }

  lock() {
    this.unlocked = false;
  }

  setProperties(properties) {
    this.properties = properties;
  }

  setImage(imageurl) {
    if(this.image === null) {
      this.image = new Image();
    }
    this.image.src = imageurl;
  }

}
