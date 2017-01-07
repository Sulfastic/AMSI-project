//Created by Eredin on 2016-01-01

import Creature from './creature';

class PlayerCharacter extends Creature {

    //constructor
    constructor(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach) {
        super(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach);

        //changing the color of the text displayed
        this.nameText.setStyle({font: 'normal 15pt Arial', fill: 'blue'});
        this.hpText.setStyle({font: 'normal 15pt Arial', fill: 'blue'});

        //set up control keys
        this.leftKey = this.game.input.keyboard.addKey(this.game.global.GO_LEFT_KEY);
        this.rightKey = this.game.input.keyboard.addKey(this.game.global.GO_RIGHT_KEY);
        this.jumpKey = this.game.input.keyboard.addKey(this.game.global.JUMP_KEY);
        this.attackMeleeKey = this.game.input.keyboard.addKey(this.game.global.MELEE_ATTACK_KEY);

    }

    update(){
        super.update();

        //controls handling
        if(!this.busy){
            if(this.leftKey.isDown) this.goLeft();
            else if(this.rightKey.isDown) this.goRight();
            else this.stop();

            if(this.attackMeleeKey.isDown) this.attackMelee();

            if(this.jumpKey.isDown) this.jump();
        }
    }

    findMeleeTarget(){
        return this.game.world.getByName('Enemies').getClosestTo(this,this.isCreatureInFront,this);
    }

}

export default PlayerCharacter;//comment this line for testing
