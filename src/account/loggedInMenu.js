class LoggedInMenu extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        //add background image
        this.background = this.game.add.sprite(0,0,'background');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        //add some fancy transition effects
        this.ready = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_ready');
        this.ready.anchor.set(0.5,0.5);
        this.ready.visible=false;
        this.go = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_go');
        this.go.anchor.set(0.5,0.5);
        this.go.visible=false;

        this.buttonGreen = this.game.add.button(this.game.world.centerX -150, this.game.world.centerY -150,'buttonGreen', this.onInputDown, this);
        this.buttonGreen2 = this.game.add.button(this.game.world.centerX -150, this.game.world.centerY,'buttonGreen', this.options, this);
        this.buttonRed = this.game.add.button(this.game.world.centerX -150,this.game.world.centerY + 150,'buttonRed', this.quitGame, this);
        this.buttonGreen.scale.setTo(3, 2);
        this.buttonGreen2.scale.setTo(3, 2);
        this.buttonRed.scale.setTo(3, 2);
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
        window.location = "about:blank";
    }

    //create some cool tweens and apply them to 'this.ready' and 'this.go'
    onInputDown () {
        // if( ! this.canContinueToNextState){ //do not allow tweens to be created multiple times simultaneously
        //   return;
        // }
        //
        // this.buttonRed.visible = false;
        // this.newGameText.visible = false;
        // this.buttonGreen.visible = false;
        // this.quitText.visible = false;
        //
        // this.canContinueToNextState = false;
        // this.ready.visible = true;
        // this.newGameText.visible = false;
        // this.go.angle = -15;
        //
        // //create some tweens - http://phaser.io/docs/2.5.0/Phaser.Tween.html#to
        // const ready_tween = this.game.add.tween(this.ready.scale)
        //   .to({ x: 1.5, y: 1.5}, 500, Phaser.Easing.Linear.In,false,0,-1,true);
        //
        // const go_tween = this.game.add.tween(this.go)
        //   .to({ angle: 15}, 200, Phaser.Easing.Linear.In,false,0,-1,true);
        //
        // //when the 'ready' tween is done, hide it and show 'go'. perform a shaking/rotating tween on 'go'. When 'go' is done, start the game
        // let go_tween_repeat_num = 3; //how many times these tweens should loop
        // let ready_tween_repeat_num = 3;
        //
        // const go_tween_loop = function(){
        //   go_tween_repeat_num -= 0.5;
        //   if(go_tween_repeat_num < 1){
        //     this.go.visible = false;
        this.game.state.start('logIn');
        //   }
        // };
        // const ready_tween_loop = function(){
        //   ready_tween_repeat_num -= 0.5;
        //   if(ready_tween_repeat_num < 1){
        //     this.ready.visible = false;
        //     this.go.visible = true;
        //
        //     go_tween.start();
        //   }
        // };
        // ready_tween.onLoop.add(ready_tween_loop, this);
        // go_tween.onLoop.add(go_tween_loop, this);
        //
        //
        // ready_tween.start();
    }

    options() {

    }
}

export default LoggedInMenu;
