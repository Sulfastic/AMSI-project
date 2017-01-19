//Created by Eredin on 2016-01-01

import Creature from './creature';

class PlayerCharacter extends Creature {

    //constructor
    constructor(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach) {
        super(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach);

        //changing the color of the text displayed
        this.hudTextStyle={
            font: 'bold 15pt Arial',
            fill: 'blue',
            backgroundColor: 'white'
        };
        this.nameText.setStyle(this.hudTextStyle);
        this.hpText.setStyle(this.hudTextStyle);

        //set up control keys
        this.leftKey = this.game.input.keyboard.addKey(this.game.global.GO_LEFT_KEY);
        this.rightKey = this.game.input.keyboard.addKey(this.game.global.GO_RIGHT_KEY);
        this.jumpKey = this.game.input.keyboard.addKey(this.game.global.JUMP_KEY);
        this.attackMeleeKey = this.game.input.keyboard.addKey(this.game.global.MELEE_ATTACK_KEY);
        this.fallDownKey = this.game.input.keyboard.addKey(this.game.global.FALL_DOWN_KEY);
    }

    update(){
        //controls for falling through crossable platform
        if(!this.busy&&this.fallDownKey.isDown){
            this.wantsToCrossCrossablePlatform = true;
        }
        else {
            this.wantsToCrossCrossablePlatform = false;
        }

        super.update();

        //controls handling
        if(!this.busy){
            if(this.leftKey.isDown) {
                this.goLeft();
            }
            else if(this.rightKey.isDown) {
                this.goRight();
            }
            else {
                this.stop();
            }

            if(this.attackMeleeKey.isDown) {
                this.attackMelee();
            }

            if(this.jumpKey.isDown) {
                this.jump();
            }
        }
    }

    findMeleeTarget(){
        return this.game.world.getByName('Enemies').getClosestTo(this,this.isCreatureInFront,this);
    }

}

export default PlayerCharacter;
