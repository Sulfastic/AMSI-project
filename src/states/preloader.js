class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
    this.knightFrameWidth = 147;
    this.knightFrameHeight = 165;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {

    this.game.load.image('background','assets/bg_wood.png');
    this.game.load.image('buttonGreen','assets/button_green.png');
    this.game.load.image('buttonRed','assets/button_red.png');
    this.game.load.image('buttonYellow','assets/button_yellow.png');
    this.game.load.image('background','assets/Haunted_house.jpg');
    
    this.game.load.image('crosshairs', 'assets/crosshair_red_small.png');
    this.game.load.image('text_go', 'assets/text_go.png');
    this.game.load.image('text_ready', 'assets/text_ready.png');

    this.game.load.spritesheet('knight','./assets/Knight.png',this.knightFrameWidth,this.knightFrameHeight);
    this.game.load.image('ground','./assets/platform.png');
    this.game.load.spritesheet('target', 'assets/target.png',128.66,128);

    this.game.load.audio('gunshot','assets/gunshot.wav');
    this.game.load.audio('ding','assets/ding.wav');

    this.game.load.image('collage1','assets/hyptosis_tile-art-batch-1.png');
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
