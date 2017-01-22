//Created by Eredin on 2016-12-28, updated on 2017-01-01
//basic creature template; basic creature can walk left and right, jump, has hp statistic bound by 0 and a max value, has speed statistic bound by 0 and a max value, has a game level name
//has the melee attack capabilities
//has capabilities to change the current hp and speed values and to return these values
//can die
//also has animations related to the above mentioned capabilities
class Creature extends Phaser.Sprite {

    //constructor
    constructor(game, x, y, spritesheet, frame, health_points, character_speed, game_level_name, melee_attack_strength, melee_attack_speed, melee_attack_reach) {
        super(game, x, y, spritesheet, frame);

        //basic statistics
        this.name = game_level_name;
        this.hp_max = health_points;//about 100-300 at 1st lvl
        this.hp_curr = health_points;
        this.sp_max = character_speed;//character speed is measured in pixels/second
        this.sp_curr = character_speed;
        this.mast_max = melee_attack_strength;//melee attack strength should be comparable to hp, for example hp=100 -> mast=100/5=20
        this.mast_curr = melee_attack_strength;
        this.masp_max = melee_attack_speed;//melee attack speed is measured in melee attacks/second
        this.masp_curr = melee_attack_speed;
        this.ma_reach_max = melee_attack_reach;//how close does the creature has to come to hit the target; about 40 is fine as a basis on 1st lvl, can be more on higher levels
        this.ma_reach_curr = melee_attack_reach;

        //enabling arcade physics for the creature
        this.game.physics.arcade.enable(this);

        //setting body physics
        this.game.physics.arcade.enableBody(this);
        this.body.bounce.y = this.game.global.BOUNCE;
        this.body.gravity.y = this.game.global.GRAVITY;
        this.body.collideWorldBounds = true;
        this.body.tilePadding.set(32,32);

        //adding animations for walking with standard spritesheet, 10 frames per second, 'true' for looped animation
        this.addAnimations();

        //flags
        this.facing = 1;//negative for facing left, positive for facing right
        this.busy = false;//flag for managing the actions of the creature, for example character is busy when it is making an attack
        this.ableToCrossCrossablePlatform = false;
        this.wantsToCrossCrossablePlatform = false;

        //adding text to display
        this.hudTextStyle={
            font: 'bold 15pt Arial',
            backgroundColor: null
            fill: 'red'
        };
        this.nameText = this.addChild(new Phaser.Text(this.game, 0, -25, this.name, this.hudTextStyle));
        this.hpText = this.addChild(new Phaser.Text(this.game, 0, this.height+25, 'HP: ' + this.hp_curr + '/' + this.hp_max, this.hudTextStyle));
    }

    addAnimations() {
        throw new Error("should be overriden");
    }

    update() {
        this.hpText.text = 'HP: ' + this.hp_curr + '/' + this.hp_max;
        this.game.physics.arcade.collide(this, this.game.world.getByName('Platforms').children[0]);
        if(this.body.velocity.y<-5||this.wantsToCrossCrossablePlatform){
            this.ableToCrossCrossablePlatform = true;
        }
        else{
            this.ableToCrossCrossablePlatform = false;
        }
        if(!this.ableToCrossCrossablePlatform){
            this.game.physics.arcade.collide(this, this.game.world.getByName('CrossablePlatforms').children[0]);
        }
        this.game.physics.arcade.collide(this, this.game.world.getByName('Players'));
        this.game.physics.arcade.collide(this, this.game.world.getByName('Enemies'));
        if(this.busy) {
            this.stop();
        }
    }

    //moving methods

    goLeft() {
        if (!this.busy) {
            this.body.velocity.x = -this.sp_curr;
            this.facing = -1;
            this.animGoLeft();
        }
    }

    animGoLeft(){
        this.animations.play('goLeft');
    }

    goRight() {
        if (!this.busy) {
            this.body.velocity.x = this.sp_curr;
            this.facing = 1;
            this.animGoRight();
        }
    }

    animGoRight(){
        this.animations.play('goRight');
    }

    stop() {
        this.body.velocity.x = 0;
        this.game.physics.arcade.collide(this, this.game.world.getByName('Platforms'));
        if (!this.busy) {
            if (this.facing > 0) {
                this.animStandRight();
            }
            else {
                this.animStandLeft();
            }
        }
    }

    animStandRight(){
        this.animations.play('standRight');
    }

    animStandLeft(){
        this.animations.play('standLeft');
    }

    jump() {
        if (this.body.onFloor()) {
            this.body.velocity.y = -this.sp_curr * 3;
        }
    }

    modifySpeed(amount) {
        this.sp_curr += amount;
        if (this.sp_curr < 0) {
            this.sp_curr = 0;
        }
        else if (this.sp_curr > this.sp_max) {
            this.sp_curr = this.sp_max;
        }
    }

    //taking damage and healing capabilities, returning hp_curr

    damage(amount) {
        this.hp_curr -= amount;
        if (this.hp_curr <= 0) {
            this.kill();
            this.playSoundDeath();
        } else {
            this.playSoundGetHit();
        }
    }

    heal(amount) {
        this.hp_curr += amount;
        if (this.hp_curr > this.hp_max) {
            this.hp_curr = this.hp_max;
        }
    }


    //melee attack methods

    modifyMeleeAttackStrength(amount) {
        this.mast_curr += amount;
        if (this.mast_curr > this.mast_max) {
            this.mast_curr = this.mast_max;
        }
        else if (this.mast_curr < 0) {
            this.mast_curr = 0;
        }
    }

    modifyMeleeAttackSpeed(amount) {
        this.masp_curr += amount;
        if (this.masp_curr > this.masp_max) {
            this.masp_curr = this.masp_max;
        }
        else if (this.masp_curr < 0) {
            this.masp_curr = 0;
        }
    }

    modifyMeleeAttackReach(amount) {
        this.ma_reach_curr += amount;
        if (this.ma_reach_curr > this.ma_reach_max) {
            this.ma_reach_curr = this.ma_reach_max;
        }
        else if (this.ma_reach_curr < 0) {
            this.ma_reach_curr = 0;
        }
    }

    attackMelee() {
        if (!this.busy && this.body.onFloor()) {
            this.busy = true;
            this.body.velocity.x = 0;
            let timer = this.game.time.create();
            timer.add(1000 / this.masp_curr, this.notBusy, this);
            timer.add(500/this.masp_curr, this.damageMelee, this);
            timer.start();
            if (this.facing < 0) {
                this.animAttackMeleeLeft();
            }
            else {
                this.animAttackMeleeRight();
            }
            this.playSoundAttackMelee();
        }
    }

    playSoundAttackMelee(){
        throw new Error("should be overriden");
    }

    playSoundDeath(){
        throw new Error("should be overriden");
    }

    playSoundGetHit(){
        this.game.add.audio('collision'+Math.ceil(Math.random()*11)).play();
    }

    animAttackMeleeLeft(){
        this.animations.play('attackLeft');
    }

    animAttackMeleeRight(){
        this.animations.play('attackRight');
    }

    damageMelee(){
        if(this.alive){
            let target = this.findMeleeTarget();
            if (target != null) {
                target.damage(this.mast_curr);
            }
        }

    }

    notBusy() {
        this.busy = false;
        this.stop();
    }

    findMeleeTarget() {
        return this.game.world.getByName('Creatures').getClosestTo(this, this.isCreatureInFront, this);
    }

    isCreatureInFront(target, distance) {
        if (target.hp_curr != null && target != this) {
            if (this.facing < 0 && target.x < this.x) {
                return distance <= target.width + this.ma_reach_curr;
            }
            else if (this.facing > 0 && target.x > this.x) {
                return distance <= this.width + this.ma_reach_curr;
            }
            else return false;
        }
    }
}

export default Creature;
