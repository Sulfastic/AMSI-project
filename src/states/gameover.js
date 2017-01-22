class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

    //add game header
    this.gameHeaderText = this.add.text(this.game.world.centerX,this.game.world.height/6, "FAMILY BUSINESS", {
        font: 'bold 72px Arial', fill: '#ffffff', align: 'center'
    });
    this.gameHeaderText.anchor.set(0.5);

    //add screen header
    this.headerText = this.add.text(this.game.world.centerX,3*this.game.world.height/8, "Game Over", {
        font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    this.headerText.anchor.set(0.5);

    //add intro text
    this.gameoverText = this.add.text(this.game.world.centerX,this.game.world.centerY, "Score: "+this.game.global.score, {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    this.gameoverText.anchor.set(0.5);

    this.input.onDown.add(this.onInputDown, this);

    //prevent accidental click-thru by not allowing state transition for a short time
    this.canContinueToNextState = false;
    this.game.time.events.add(Phaser.Timer.SECOND * .5, function(){ this.canContinueToNextState = true; }, this);

    this.saveVarsToLocalStorage();
    this.resetGlobalVariables();
  }

  saveVarsToLocalStorage(){
    let max = localStorage["maxScore"] || 0; //default value of 0 is it does not exist
    if (this.game.global.score > max){ localStorage["maxScore"] = this.game.global.score; }
  }

  resetGlobalVariables(){
    this.game.global.score = 0;
  }
  update() {}

  onInputDown () {
    if(this.canContinueToNextState){
      this.game.state.start('loggedInMenu');
    }
  }

}

export default Menu;
