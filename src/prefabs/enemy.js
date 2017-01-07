//Created by Eredin on 2016-01-01

import Creature from './creature';

class Enemy extends Creature {

    //constructor
    constructor(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach) {
        super(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach);
        this.dir = true;
    }

    findMeleeTarget(){
        return this.game.world.getByName('Players').getClosestTo(this,this.isCreatureInFront,this);
    }

    update(){
        super.update();
        this.move();
    }

    move() {
        if(this.dir) {
            this.goRight();
        } else {
            this.goLeft();
        }


        if (this.body.touching.right) this.dir = false;


        if (this.body.touching.left) this.dir = true;

    }

    damage(amount){
        this.hp_curr -= amount;
        if(this.hp_curr<=0) {
            this.reset(500,100);
            this.hp_curr = 100;
            this.game.global.score++;
        }
    }

}

export default Enemy;