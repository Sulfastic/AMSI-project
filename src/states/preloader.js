class Preloader extends Phaser.State {

    constructor() {
        super();
        this.asset = null;
        this.ready = false;
        this.knightFrameWidth = 147;
        this.knightFrameHeight = 165;
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

        this.game.load.image('buttonGreen','assets/button_green.png');
        this.game.load.image('buttonRed','assets/button_red.png');
        this.game.load.image('buttonYellow','assets/button_yellow.png');
        this.game.load.tilemap('map1','assets/map/game_map_1.json',null,Phaser.Tilemap.TILED_JSON);
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

        this.game.load.spritesheet('knight','assets/Knight.png',this.knightFrameWidth,this.knightFrameHeight);

        this.game.load.audio('gunshot','assets/gunshot.wav');
        this.game.load.audio('ding','assets/ding.wav');
    }

    onLoadComplete() {
        this.game.state.start('menu');
    }
}

export default Preloader;
