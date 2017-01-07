/**
 * Created by Sulf on 1/3/2017.
 */

class Register extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        //add background image
        this.background = this.game.add.sprite(0,0,'background');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        this.buttonGreen = this.game.add.button(150, this.game.world.centerY -150,'buttonGreen', this.submit, this);
        this.buttonRed = this.game.add.button(150,this.game.world.centerY,'buttonRed', this.back, this);
        this.buttonGreen.scale.setTo(3, 2);
        this.buttonRed.scale.setTo(3, 2);
        //add intro text
        this.newGameText = this.add.text(this.buttonGreen.centerX,this.buttonGreen.centerY, 'Submit', {
            font: '42px Arial', fill: '#ffffff', align: 'center'
        });

        this.quitText = this.add.text(this.buttonRed.centerX,this.buttonRed.centerY, 'Back', {
            font: '42px Arial', fill: '#ffffff', align: 'center'
        });

        this.login = this.game.add.inputField(500, this.game.world.centerY - 150, {
            font: '65px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 80,
            width: 500,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 0,
            placeHolder: 'Login',
            type: Fabrique.InputType.text
        });

        this.email = this.game.add.inputField(500, this.game.world.centerY, {
            font: '65px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 80,
            width: 500,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 0,
            placeHolder: 'E-mail',
            type: Fabrique.InputType.text
        });

        this.password = this.game.add.inputField(500, this.game.world.centerY + 150, {
            font: '65px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 80,
            width: 500,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 0,
            placeHolder: 'Password',
            type: Fabrique.InputType.password
        });

        this.newGameText.anchor.set(0.5);
        this.quitText.anchor.set(0.5);
        this.canContinueToNextState = true;
    }

    update() {}

    back() {
        this.game.state.start('logIn');
    }

    submit () {

    }

}

export default Register;
