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

    //setup prefabs
    this.backgroundTiles = this.game.add.group(this.game.world,'BackgroundTiles');
    this.backgroundTiles.enableBody = true;
    this.platforms = this.game.add.group(this.game.world,'Platforms');
    this.platforms.enableBody = true;

    //set stage bounds
    this.stageBounds = {xstart: 50, ystart:50, xend: this.game.world.width-50, yend: this.game.world.height-50};
    //setup platforms
    this.setupPlatforms(this.game,this.platforms,this.backgroundTiles,this.stageBounds);
    this.platforms.setAll('body.immovable',true);

    //setup player
    this.players = this.game.add.group(this.game.world,'Players');
    this.player = new Vanguard(this.game,150,this.game.world.height-300,'knight',4,'Player',5);//Vanguard 5th level
    this.players.add(this.player);

    //setup enemy group
    this.enemies = this.game.add.group(this.game.world,'Enemies');
    //setup spawning point
    this.spawningPoint = {x: this.game.world.width-350, y: this.game.world.height-300};


    //setup UI
    this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
        font: '40px Arial', fill: '#ffffff', align: 'center'
    });
    this.countdownText.anchor.set(0.5,0);

    //setup a timer to end the game
    this.endGameTimer = this.game.time.create();
    this.endGameTimer.add(Phaser.Timer.SECOND * 90, this.endGame,this);
    this.endGameTimer.start();

    //setup score
    this.game.global.score = 0;
  }

  update() {
    this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
    if(this.players.countLiving()==0) this.endGame();
    if(this.enemies.countLiving()==0) this.spawnEnemy();
  }

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

      backgroundTileGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.ystart,stageBounds.xend-stageBounds.xstart,stageBounds.yend-stageBounds.ystart,this.backgroundWallTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.yend-25,stageBounds.xend-stageBounds.xstart,25,this.floorTexture)).tileScale = {x: 2,y:2};
      backgroundTileGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.yend-50,stageBounds.xend-stageBounds.xstart,25,this.floorTexture)).tileScale = {x: 2,y:2};

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart,stageBounds.ystart,32,stageBounds.yend-stageBounds.ystart,this.wallTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xend-32,stageBounds.ystart,32,stageBounds.yend-stageBounds.ystart,this.wallTexture)).tileScale = {x: 2,y: 2};

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+(stageBounds.xend-stageBounds.xstart-32)/2,20+(stageBounds.yend-stageBounds.ystart)/2,32,stageBounds.yend-stageBounds.ystart+30-(stageBounds.yend-stageBounds.ystart)/2,this.wallTexture)).tileScale = {x: 2,y: 2};

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+32+200,(stageBounds.yend-stageBounds.ystart)/2,stageBounds.xend-stageBounds.xstart-32-32-400,20,this.ceilingTexture));
      backgroundTileGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+32+200,(stageBounds.yend-stageBounds.ystart)/2-14,stageBounds.xend-stageBounds.ystart-32-32-400,14,this.backgroundCeilingTexture));

      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart-32,stageBounds.ystart-32,64,192,this.shinglesLeftTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xend-32,stageBounds.ystart-32,64,192,this.shinglesRightTexture)).tileScale = {x: 2,y: 2};
      platformGroup.add(new Phaser.TileSprite(game,stageBounds.xstart+32,stageBounds.ystart-32,stageBounds.xend-stageBounds.xstart-64,128,this.shinglesFrontTexture)).tileScale = {x: 2,y: 2};
  }

  spawnEnemy(){
      this.enemy = new Demon(this.game,this.spawningPoint.x,this.spawningPoint.y,'knight',4,'Demon',1);//Demon 1st level
      this.enemies.add(this.enemy);

      this.enemy = new Demon(this.game,this.spawningPoint.x,this.spawningPoint.y,'knight',4,'Demon',1);//Demon 1st level
      this.enemies.add(this.enemy);

  }

}

export default Game;
