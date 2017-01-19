class Boot extends Phaser.State {

  constructor() {
    super();
  }
  
  preload() {
    this.load.image('preloader', 'assets/preloader.gif');
  }

  create() {
    this.game.add.plugin(Fabrique.Plugins.InputField);
    this.game.input.maxPointers = 1;

    //setup device scaling
    if (this.game.device.desktop) {
      this.game.scale.pageAlignHorizontally = true;
    } else {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.setScreenSize(true);
    }

    this.initGlobalVariables();

    this.game.state.start('preloader');
  }

  initGlobalVariables(){
    this.game.global = {
      score: 0,
        BOUNCE: 0.1,
        GRAVITY: 2000,
        GO_LEFT_KEY: Phaser.KeyCode.LEFT,
        GO_RIGHT_KEY: Phaser.KeyCode.RIGHT,
        JUMP_KEY: Phaser.KeyCode.UP,
        MELEE_ATTACK_KEY: Phaser.KeyCode.SPACEBAR,
        FALL_DOWN_KEY: Phaser.KeyCode.DOWN
    };
  }

}

export default Boot;
