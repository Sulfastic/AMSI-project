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

        //setup audio
        this.gunshot = this.game.add.audio('gunshot');

        //setting body physics
        this.game.physics.arcade.enableBody(this);
        this.body.bounce.y = this.game.global.BOUNCE;
        this.body.gravity.y = this.game.global.GRAVITY;
        this.body.collideWorldBounds = true;

        //adding animations for walking with standard spritesheet, 10 frames per second, 'true' for looped animation
        this.animations.add('right', [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 10], this.sp_curr / 15, true);
        this.animations.add('left', [40, 39, 38, 37, 36, 35, 34, 33, 32, 33, 34, 31], this.sp_curr / 15, true);
        this.animations.add('attack right', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 10 * this.masp_curr, false);
        this.animations.add('attack left', [30, 29, 28, 27, 26, 25, 24, 23, 22, 21], 10 * this.masp_curr, false);

        //flags
        this.facing = 1;//negative for facing left, positive for facing right
        this.busy = false;//flag for managing the actions of the creature, for example character is busy when it is making an attack

        //adding text to display
        this.nameText = this.addChild(new Phaser.Text(this.game, 0, -25, this.name, {
            font: 'normal 15pt Arial',
            fill: 'red'
        }));
        this.hpText = this.addChild(new Phaser.Text(this.game, 0, this.height, 'HP: ' + this.hp_curr + '/' + this.hp_max, {
            font: 'normal 15pt Arial',
            fill: 'red'
        }));
    }

    update() {
        this.hpText.text = 'HP: ' + this.hp_curr + '/' + this.hp_max;
        this.game.physics.arcade.collide(this, this.game.world.getByName('Players'));
        this.game.physics.arcade.collide(this, this.game.world.getByName('Enemies'));
        this.game.physics.arcade.collide(this, this.game.world.getByName('Platforms'));
    }

    shoot() {
        this.gunshot.play();
    }

    //moving methods

    goLeft() {
        if (!this.busy) {
            this.body.velocity.x = -this.sp_curr;
            this.facing = -1;
            this.animations.play('left');
        }
        this.game.physics.arcade.collide(this, this.game.world.getByName('Platforms'));
    }

    goRight() {
        if (!this.busy) {
            this.body.velocity.x = this.sp_curr;
            this.facing = 1;
            this.animations.play('right');
        }
        this.game.physics.arcade.collide(this, this.game.world.getByName('Platforms'));
    }

    stop() {
        this.body.velocity.x = 0;
        if (!this.busy) {
            this.animations.stop();
            if (this.facing > 0) this.frame = 0;
            else this.frame = 41;
        }
    }

    jump() {
        if (this.body.touching.down) this.body.velocity.y = -this.sp_curr * 5;
    }


    modifySpeed(amount) {
        this.sp_curr += amount;
        if (this.sp_curr < 0) this.sp_curr = 0;
        else if (this.sp_curr > this.sp_max) this.sp_curr = this.sp_max;
    }

    //taking damage and healing capabilities, returning hp_curr

    damage(amount) {
        this.hp_curr -= amount;
        if (this.hp_curr <= 0) this.kill();
    }

    heal(amount) {
        this.hp_curr += amount;
        if (this.hp_curr > this.hp_max) this.hp_curr = this.hp_max;
    }


    //melee attack methods

    modifyMeleeAttackStrength(amount) {
        this.mast_curr += amount;
        if (this.mast_curr > this.mast_max) this.mast_curr = this.mast_max;
        else if (this.mast_curr < 0) this.mast_curr = 0;
    }

    modifyMeleeAttackSpeed(amount) {
        this.masp_curr += amount;
        if (this.masp_curr > this.masp_max) this.masp_curr = this.masp_max;
        else if (this.masp_curr < 0) this.masp_curr = 0;
    }

    modifyMeleeAttackReach(amount) {
        this.ma_reach_curr += amount;
        if (this.ma_reach_curr > this.ma_reach_max) this.ma_reach_curr = this.ma_reach_max;
        else if (this.ma_reach_curr < 0) this.ma_reach_curr = 0;
    }

    attackMelee() {
        if (!this.busy && this.body.touching.down) {
            this.busy = true;
            this.body.velocity.x = 0;
            let timer = this.game.time.create();
            timer.add(1000 / this.masp_curr, this.notBusy, this);
            timer.start();
            if (this.facing < 0) this.animations.play('attack left');
            else this.animations.play('attack right');
            let target = this.findMeleeTarget();
            if (target != null) target.damage(this.mast_curr);
            this.shoot();
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

export default Creature;//comment this line for testing
