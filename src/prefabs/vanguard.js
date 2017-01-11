//Created by Eredin on 08-01-2017

import PlayerCharacter from './player-character';


class Vanguard extends PlayerCharacter {

    //constructor
    constructor(game, x, y, spritesheet, frame, game_level_name, characterLevel) {
        super(game, x, y, spritesheet, frame,
            Vanguard.prototype.getStatsByLevel(characterLevel).hp,
            Vanguard.prototype.getStatsByLevel(characterLevel).speed,
            game_level_name,
            Vanguard.prototype.getStatsByLevel(characterLevel).mast,
            Vanguard.prototype.getStatsByLevel(characterLevel).masp,
            Vanguard.prototype.getStatsByLevel(characterLevel).mareach);

        //recording the level
        this.level = characterLevel;
        //displaying the class and level, moving the name higher
        this.classText = this.addChild(new Phaser.Text(this.game, 0, -25, 'Vanguard, Level ' + this.level, {
            font: 'normal 15pt Arial',
            fill: 'blue'
        }));
        this.nameText.y=-50;
    }


    getStatsByLevel(level) {
        const hp = [300,400,500,600,700,800,900,1000,1100,1200];
        const speed = [200,220,240,260,280,300,320,340,360,380];//character speed in pixels/second
        const mast = [50,60,70,80,90,100,110,120,130,140];//melee attack strength
        const masp = [1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9];//melee attack speed in attacks/second
        const mareach = [40,45,50,55,60,65,70,75,80,85];//melee attack reach in pixels
        return {hp: hp[level-1], speed: speed[level-1], mast: mast[level-1], masp: masp[level-1], mareach: mareach[level-1]};
    }
}

export default Vanguard;

