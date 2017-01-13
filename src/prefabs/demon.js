//Created by Eredin on 08-01-2017

import Enemy from './enemy';


class Demon extends Enemy {

    //constructor
    constructor(game, x, y, spritesheet, frame, game_level_name, enemyLevel) {
        super(game, x, y, spritesheet, frame,
            Demon.prototype.getStatsByLevel(enemyLevel).hp,
            Demon.prototype.getStatsByLevel(enemyLevel).speed,
            game_level_name,
            Demon.prototype.getStatsByLevel(enemyLevel).mast,
            Demon.prototype.getStatsByLevel(enemyLevel).masp,
            Demon.prototype.getStatsByLevel(enemyLevel).mareach);

        //recording the level
        this.level = enemyLevel;
        //displaying the class and level, moving the name higher
        this.classText = this.addChild(new Phaser.Text(this.game, 0, -25, 'Demon, Level ' + this.level, {
            font: 'normal 15pt Arial',
            fill: 'red'
        }));
        this.nameText.y=-50;
    }

    update(){
        super.update();
        this.AI();
    }

    AI(){
        let targetWithinSight = this.game.world.getByName('Players').getClosestTo(this);
        if(targetWithinSight!=null){
            let targetWithinReach = this.game.world.getByName('Players').getClosestTo(this, this.isTargetWithinReach, this);
            if(targetWithinReach!=null){
                if (targetWithinReach.x>this.x) this.facing=1;
                else this.facing=-1;
                this.attackMelee();
            }
            else if(targetWithinSight.x>this.x) this.goRight();
            else this.goLeft();
        }
    }

    isTargetWithinReach(target,distance){
        if(target.x>this.x) return distance<=this.ma_reach_curr+this.width;
        else return distance<=this.ma_reach_curr+target.width;
    }


    getStatsByLevel(level) {
        const hp = [100,120,140,160,180,200,220,240,260,270];
        const speed = [200,220,240,260,280,300,320,340,360,380];//character speed in pixels/second
        const mast = [70,80,90,100,110,120,130,140,150,160];//melee attack strength
        const masp = [0.8,0.85,0.9,0.95,1,1.05,1.1,1.15,1.2,1.25];//melee attack speed in attacks/second
        const mareach = [20,25,30,35,40,45,50,55,60,65];//melee attack reach in pixels
        return {hp: hp[level-1], speed: speed[level-1], mast: mast[level-1], masp: masp[level-1], mareach: mareach[level-1]};
    }
}

export default Demon;

