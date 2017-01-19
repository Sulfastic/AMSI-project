import Vanguard from '../prefabs/vanguard';
import Demon from '../prefabs/demon';

class Game extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;
    constructor() {
        super();
    }

    //setup prefabs
    this.backgroundTiles = this.game.add.group(this.game.world,'BackgroundTiles');
    this.backgroundTiles.enableBody = true;
    this.platforms = this.game.add.group(this.game.world,'Platforms');
    this.platforms.enableBody = true;
    create() {
        this.map = this.game.add.tilemap('map1');
        this.map.addTilesetImage('background_forest','background');
        this.map.addTilesetImage('C1FG');
        this.map.addTilesetImage('C2FG');
        this.map.addTilesetImage('grass');
        this.map.addTilesetImage('green_altar');
        this.map.addTilesetImage('wall');
        this.map.addTilesetImage('wooden_wall');
        this.map.addTilesetImage('wooden_rotten_wall');
        this.map.addTilesetImage('stairs_left');
        this.map.addTilesetImage('ladder');
        this.map.addTilesetImage('spawnpoint');

    //set stage bounds
    this.stageBounds = {xstart: 50, ystart:50, xend: this.game.world.width-50, yend: this.game.world.height-50};
    //setup platforms
    this.setupPlatforms(this.game,this.platforms,this.backgroundTiles,this.stageBounds);
    this.platforms.setAll('body.immovable',true);
        //setup background image
        this.background = this.map.createLayer('background');

    //setup player
    this.players = this.game.add.group(this.game.world,'Players');
    this.player = new Vanguard(this.game,150,this.game.world.height-300,'knight',4,'Player',5);//Vanguard 5th level
    this.players.add(this.player);
        //setup background tiles
        this.backgroundTiles = this.map.createLayer('backgroundTiles');

    //setup enemy group
    this.enemies = this.game.add.group(this.game.world,'Enemies');
    //setup spawning point
    this.spawningPoint = {x: this.game.world.width-350, y: this.game.world.height-300};
        //setup crossable platformsGroup
        this.crossablePlatformsGroup = this.game.add.group(this.game.world,'CrossablePlatforms');
        this.crossablePlatformsGroup.enableBody=true;
        this.crossablePlatforms = this.map.createLayer('crossableFloorTiles',this.game.world.width, this.game.world.height,this.crossablePlatformsGroup);
        this.map.setCollisionBetween(1,30000,true,this.crossablePlatforms,true);

        //setup not crossable platformsGroup
        this.platformsGroup = this.game.add.group(this.game.world,'Platforms');
        this.platformsGroup.enableBody=true;
        this.platforms = this.map.createLayer('borderTiles',this.game.world.width,this.game.world.height,this.platformsGroup);
        this.platforms.resizeWorld();
        this.map.setCollisionBetween(1,30000,true,this.platforms,true);

    //setup UI
    this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
        font: '40px Arial', fill: '#ffffff', align: 'center'
    });
    this.countdownText.anchor.set(0.5,0);
        //setup front tiles
        this.frontTiles = this.map.createLayer('frontTiles');

    //setup a timer to end the game
    this.endGameTimer = this.game.time.create();
    this.endGameTimer.add(Phaser.Timer.SECOND * 90, this.endGame,this);
    this.endGameTimer.start();
        //setup player and enemy spawn points based on spawn tiles
        this.playerSpawnPointLayer = this.map.createLayer('playerSpawnPoint');
        this.playerSpawnTile = this.map.searchTileIndex(10823,0,false,this.playerSpawnPointLayer);
        this.playerSpawnPoint ={
            x: this.playerSpawnTile.worldX,
            y: this.playerSpawnTile.worldY
        };
        this.enemySpawnPointLayer = this.map.createLayer('enemiesSpawnPoints');
        this.enemySpawnPoints = [];
        this.enemySpawnTile = this.map.searchTileIndex(20595,0,false,this.enemySpawnPointLayer);
        this.enemySpawnPointsCount=0;
        while(this.enemySpawnTile!=null){
            this.enemySpawnPoints.push({x: this.enemySpawnTile.worldX, y: this.enemySpawnTile.worldY});
            this.enemySpawnPointsCount++;
            this.enemySpawnTile = this.map.searchTileIndex(20595,this.enemySpawnPointsCount,false,this.enemySpawnPointLayer);
        }

    //setup score
    this.game.global.score = 0;
  }

  update() {
    this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
    if(this.players.countLiving()==0) this.endGame();
    if(this.enemies.countLiving()==0) this.spawnEnemy();
  }
        //setup player
        this.players = this.game.add.group(this.game.world,'Players');
        this.player = new Vanguard(this.game,this.playerSpawnPoint.x,this.playerSpawnPoint.y,'knight',4,'Player',5);//Vanguard 5th level
        this.player.height=64;
        this.player.width = 64*147/165;
        this.players.add(this.player);
        this.game.camera.follow(this.player);

  endGame() {
    this.game.global.score = this.enemies.countDead();
    this.game.state.start('gameover');
  }

  setupPlatforms(game,platformGroup,backgroundTileGroup,stageBounds){

      this.wallTexture = new Phaser.BitmapData(game,'t1',18,32).copy('collage1',136,320,18,32,0,0);
      this.floorTexture = new Phaser.BitmapData(game,'t2',63,32).copy('collage1',0,640,63,32,0,0);
      this.backgroundWallTexture = new Phaser.BitmapData(game,'t3',32,32).copy('collage1',480,384,32,32,0,0);
      this.ceilingTexture = new Phaser.BitmapData(game,'t6',96,20).copy('collage1',640,657,96,20,0,0);
      this.backgroundCeilingTexture = new Phaser.BitmapData(game,'t7',96,14).copy('collage1',640,644,96,14,0,0);
      this.shinglesLeftTexture = new Phaser.BitmapData(game,'t8',32,96).copy('collage1',800,609,32,96,0,0);
      this.shinglesRightTexture = new Phaser.BitmapData(game,'t9',32,96).copy('collage1',832,609,32,96,0,0);
      this.shinglesFrontTexture = new Phaser.BitmapData(game,'t10',64,64).copy('collage1',736,609,64,64,0,0);
        //setup enemy group
        this.enemies = this.game.add.group(this.game.world,'Enemies');

      backgroundTileGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.ystart,stageBounds.xend-stageBounds.xstart,stageBounds.yend-stageBounds.ystart,this.backgroundWallTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.yend-25,stageBounds.xend-stageBounds.xstart,25,this.floorTexture)).tileScale = {x: 2,y:2};
      backgroundTileGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.yend-50,stageBounds.xend-stageBounds.xstart,25,this.floorTexture)).tileScale = {x: 2,y:2};

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.ystart,32,stageBounds.yend-stageBounds.ystart,this.wallTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xend-32,stageBounds.ystart,32,stageBounds.yend-stageBounds.ystart,this.wallTexture)).tileScale = {x: 2,y: 2};
        //setup UI
        this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
            font: '40px Arial', fill: '#ffffff', align: 'center'
        });
        this.countdownText.anchor.set(0.5,0);
        this.countdownText.fixedToCamera = true;

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+(stageBounds.xend-stageBounds.xstart-32)/2,20+(stageBounds.yend-stageBounds.ystart)/2,32,stageBounds.yend-stageBounds.ystart+30-(stageBounds.yend-stageBounds.ystart)/2,this.wallTexture)).tileScale = {x: 2,y: 2};
        //setup a timer to end the game
        this.endGameTimer = this.game.time.create();
        this.endGameTimer.add(Phaser.Timer.SECOND * 180, this.endGame,this);
        this.endGameTimer.start();

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+32+200,(stageBounds.yend-stageBounds.ystart)/2,stageBounds.xend-stageBounds.xstart-32-32-400,20,this.ceilingTexture));
      backgroundTileGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+32+200,(stageBounds.yend-stageBounds.ystart)/2-14,stageBounds.xend-stageBounds.ystart-32-32-400,14,this.backgroundCeilingTexture));
        //a flag when the player is dead
        this.playerDying = false;

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart-32,stageBounds.ystart-32,64,192,this.shinglesLeftTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xend-32,stageBounds.ystart-32,64,192,this.shinglesRightTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+32,stageBounds.ystart-32,stageBounds.xend-stageBounds.xstart-64,128,this.shinglesFrontTexture)).tileScale = {x: 2,y: 2};
  }
        //setup score
        this.game.global.score = 0;
    }

  spawnEnemy(){
      this.enemy = new Demon(this.game,this.spawningPoint.x,this.spawningPoint.y,'knight',4,'Demon',1);//Demon 1st level
      this.enemies.add(this.enemy);
  }




    update() {
        this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
        if(this.enemies.countLiving()==0) this.spawnEnemies();
        if(!this.player.exists&&!this.playerDying) {
            this.playerDying = true;
            let time = this.game.time.create();
            time.add(Phaser.Timer.SECOND*3,this.endGame,this);
            time.start();
        }
    }

    endGame() {
        this.game.global.score = this.enemies.countDead();
        this.game.state.start('gameover');
    }

    spawnEnemies(){
        for(let i=0;i<this.enemySpawnPointsCount;i++){
            this.enemy = new Demon(this.game,this.enemySpawnPoints[i].x,this.enemySpawnPoints[i].y,'demon',4,'Demon',1);//Demon 1st level
            this.enemy.height=64;
            this.enemy.width = 64*147/165;
            this.enemies.add(this.enemy);
        }
    }

}

export default Game;
