class LoggedInMenu extends Phaser.State {

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
        this.headerText = this.add.text(this.game.world.centerX,2*this.game.world.height/8, "Main Menu", {
            font: '42px Arial', fill: '#ffffff', align: 'center'
        });
        this.headerText.anchor.set(0.5);

        this.buttonGreen = this.game.add.button(this.game.world.centerX -150, this.game.world.centerY -150,'buttonGreen', this.newGame, this);
        this.buttonGreen2 = this.game.add.button(this.game.world.centerX -150, this.game.world.centerY,'buttonGreen', this.options, this);
        this.buttonRed = this.game.add.button(this.game.world.centerX -150,this.game.world.centerY + 150,'buttonRed', this.quitGame, this);

        //add intro text

        this.newGameText = this.add.text(this.buttonGreen.centerX,this.buttonGreen.centerY, 'New Game', {
            font: '42px Arial', fill: '#ffffff', align: 'center'
        });

        this.optionsText = this.add.text(this.buttonGreen2.centerX,this.buttonGreen2.centerY, 'Options', {
            font: '42px Arial', fill: '#ffffff', align: 'center'
        });

        this.quitText = this.add.text(this.buttonRed.centerX,this.buttonRed.centerY, 'Quit', {
            font: '42px Arial', fill: '#ffffff', align: 'center'
        });

        this.newGameText.anchor.set(0.5);
        this.optionsText.anchor.set(0.5);
        this.quitText.anchor.set(0.5);
        this.canContinueToNextState = true;
    }

    update() {}

    quitGame() {
        window.close();
    }

    newGame () {
        this.game.add.audio('gameStart').play();
        this.game.state.start('game');
    }

    options() {

    }
}

export default LoggedInMenu;
