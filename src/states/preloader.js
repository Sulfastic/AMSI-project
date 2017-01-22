class Preloader extends Phaser.State {

    constructor() {
        super();
        this.asset = null;
        this.ready = false;
        this.vanguardFrameWidth = 97;
        this.vanguardFrameHeight = 85;
        this.demonFrameWidth = 77;
        this.demonFrameHeight = 90;
    }

    preload() {
        //setup loading bar
        this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
        this.load.setPreloadSprite(this.asset);

        //Setup loading and its events
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
    }

    loadResources() {

        this.game.load.image('buttonGreen','assets/button_positive.png');
        this.game.load.image('buttonRed','assets/button_negative.png');
        this.game.load.image('buttonYellow','assets/button_alternative.png');
        this.game.load.tilemap('map1','assets/map/game_map.json',null,Phaser.Tilemap.TILED_JSON);
        this.game.load.image('background','assets/map/tileds/background_forest.png');
        this.game.load.image('C1FG','assets/map/tileds/C1FG.png');
        this.game.load.image('C2FG','assets/map/tileds/C2FG.png');
        this.game.load.image('grass','assets/map/tileds/grass.png');
        this.game.load.image('green_altar','assets/map/tileds/green_altar.png');
        this.game.load.image('wall','assets/map/tileds/wall.png');
        this.game.load.image('wooden_wall','assets/map/tileds/wooden_wall.png');
        this.game.load.image('wooden_rotten_wall','assets/map/tileds/wooden_rotten_wall.png');
        this.game.load.image('stairs_left','assets/map/tileds/stairs_left.png');
        this.game.load.image('ladder','assets/map/tileds/ladder.png');
        this.game.load.image('spawnpoint','assets/map/tileds/spawnpoint.png');

        this.game.load.spritesheet('vanguard','assets/vanguard.png',this.vanguardFrameWidth,this.vanguardFrameHeight);
        this.game.load.spritesheet('demon','assets/demon.png',this.demonFrameWidth,this.demonFrameHeight);

        //load audio
        this.game.load.audio('ding','assets/ding.wav');
        this.game.load.audio('login','assets/sounds/sounds/login.wav');
        this.game.load.audio('newAccount','assets/sounds/sounds/new_account.wav');
        this.game.load.audio('gameStart','assets/sounds/sounds/game_start.wav');
        this.game.load.audio('gameOver','assets/sounds/sounds/game_over.wav');
        this.game.load.audio('newGame','assets/sounds/sounds/new_game.wav');
        this.game.load.audio('newWave','assets/sounds/sounds/new_wave.wav');

        var ddeathPath = 'assets/sounds/demon/deaths/die';
        var dgethitPath = 'assets/sounds/demon/gethits/gethit';
        var dhitPath = 'assets/sounds/demon/hits/hit';
        var vdeathPath = 'assets/sounds/vanguard/die/die';
        var vgethitPath = 'assets/sounds/vanguard/gethits/gethit';
        var vhitPath = 'assets/sounds/vanguard/hits/hit';
        var collisionPath = 'assets/sounds/physics/collisions/collision';
        var hitPath = 'assets/sounds/physics/hits/hit';
        var slashPath = 'assets/sounds/physics/slashes/slash';

        var i;
        for(i=1;i<=6;i++){
            this.game.load.audio("deamonDeath"+i,ddeathPath+'_'+i+'.wav');
        }
        for(i=1;i<=10;i++){
            this.game.load.audio("deamonGethit"+i,dgethitPath+'_'+i+'.wav');
        }
        for(i=1;i<=4;i++){
            this.game.load.audio("deamonHit"+i,dhitPath+'_'+i+'.wav');
        }
        this.game.load.audio("vanguardDeath",vdeathPath+'.wav');
        for(i=1;i<=10;i++){
            this.game.load.audio("vanguardGethit"+i,vgethitPath+'_'+i+'.wav');
        }
        for(i=1;i<=5;i++){
            this.game.load.audio("vanguardHit"+i,vhitPath+'_'+i+'.wav');
        }
        for(i=1;i<=11;i++){
            this.game.load.audio("collision"+i,collisionPath+'_'+i+'.wav');
        }
        for(i=1;i<=5;i++){
            this.game.load.audio("hit"+i,hitPath+'_'+i+'.wav');
        }
        for(i=1;i<=8;i++){
            this.game.load.audio("slash"+i,slashPath+'_'+i+'.wav');
        }
    }

    onLoadComplete() {
        this.game.state.start('menu');
    }
}

export default Preloader;
