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
        this.classText = this.addChild(new Phaser.Text(this.game, 0, -25, 'Demon, Level ' + this.level, this.hudTextStyle));
        this.nameText.y=-50;

        //variables controlling how often does AI need to be executed
        this.targetWithinSight = null;
        this.AIsPerSecond = 2;
        this.framesToAI = 0;
    }

    update(){
        super.update();
        if(this.alive){
            this.framesToAI++;
            if(this.framesToAI>=60/this.AIsPerSecond) {
                this.framesToAI = 0;
            }
            this.AI();
        }
    }

    addAnimations() {
        let right = [];
        let left = [];

        for(let i = 0; i < 46; i++) {
            right.push(i);
        }

        for(let i = 84; i < 130; i++) {
            left.push(i);
        }

        this.animations.add('standingRight', [52], this.sp_curr / 20, true);
        this.animations.add('standingLeft', [65], this.sp_curr / 20, true);
        this.animations.add('right', right, this.sp_curr, true);
        this.animations.add('left', left, this.sp_curr, true);
        this.animations.add('attack right', [47, 48, 49, 50, 51], 9 * this.masp_curr, false);
        this.animations.add('attack left', [79, 80, 81, 82, 83], 9 * this.masp_curr, false);
    }

    AI(){
        if(this.framesToAI==0){
            this.targetWithinSight = this.game.world.getByName('Players').getClosestTo(this, this.isTargetWithinSight, this);
        }
        if(this.targetWithinSight!=null){
            let targetWithinReach = this.game.world.getByName('Players').getClosestTo(this, this.isTargetWithinReach, this);
            if(!this.body.onFloor()){//if demon is on someone
                this.goLeft();
            }
            else if(targetWithinReach!=null){
                if (targetWithinReach.x>this.x) {
                    this.facing=1;
                }
                else {
                    this.facing=-1;
                }
                this.attackMelee();
            }
            else if(this.targetWithinSight.x>this.x) {
                this.goRight();
            }
            else {
                this.goLeft();
            }
        }
        else{
            this.stop();
        }
    }

    isTargetWithinReach(target,distance){
        if(target.y>this.y+this.height){
            return distance<=this.ma_reach_curr+this.height;
        }
        else if(target.x>this.x) {
            return distance<=this.ma_reach_curr+this.width;
        }
        else {
            return distance<=this.ma_reach_curr+target.width;
        }
    }

    isTargetWithinSight (target,distance){
        let line = new Phaser.Line(this.x+this.width/2,this.y+this.height/2,target.x+target.width/2,target.y+target.height/2);
        if((distance>target.height+this.ma_reach_curr)&&((line.start.x<line.end.x+30&&line.start.x>line.end.x-30)||(line.end.x<line.start.x+30&&line.end.x>line.start.x-30))){//a margin of error for checking intersection
            return false;
        }
        let platformsTiles = [];
        let crossablePlatformsTiles = [];

        if(target.x>this.x){//get tiles that are within the this-target rectangle
            if(target.y>this.y){
                platformsTiles = this.game.world.getByName('Platforms').children[0].getTiles(this.x,this.y,target.x-this.x,target.y-this.y);
                crossablePlatformsTiles = this.game.world.getByName('CrossablePlatforms').children[0].getTiles(this.x,this.y,target.x-this.x,target.y-this.y);
            }
            else{
                platformsTiles = this.game.world.getByName('Platforms').children[0].getTiles(this.x,target.y,target.x-this.x,this.y-target.y);
                crossablePlatformsTiles = this.game.world.getByName('CrossablePlatforms').children[0].getTiles(this.x,target.y,target.x-this.x,this.y-target.y);
            }
        }
        else{
            if(target.y>this.y){
                platformsTiles = this.game.world.getByName('Platforms').children[0].getTiles(target.x,this.y,this.x-target.x,target.y-this.y);
                crossablePlatformsTiles = this.game.world.getByName('CrossablePlatforms').children[0].getTiles(target.x,this.y,this.x-target.x,target.y-this.y);
            }
            else{
                platformsTiles = this.game.world.getByName('Platforms').children[0].getTiles(target.x,target.y,this.x-target.x,this.y-target.y);
                crossablePlatformsTiles = this.game.world.getByName('CrossablePlatforms').children[0].getTiles(target.x,target.y,this.x-target.x,this.y-target.y);
            }
        }

        for(let i=0;i<platformsTiles.length;i++){
            if(Phaser.Line.intersectsRectangle(line,platformsTiles[i])&&platformsTiles[i].index!=-1) {
                return false;
            }
        }
        for(let i=0;i<crossablePlatformsTiles.length;i++){
            if(Phaser.Line.intersectsRectangle(line,crossablePlatformsTiles[i])&&crossablePlatformsTiles[i].index!=-1){
                return false;
            }
        }
        return true;
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

