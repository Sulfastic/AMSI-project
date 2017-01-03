import PlayerCharacter from '../prefabs/player-character';
import Enemy from '../prefabs/enemy';

class Game extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;

    //setup UI
    this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
      font: '40px Arial', fill: '#ffffff', align: 'center'
    });
    this.countdownText.anchor.set(0.5,0);

    //setup prefabs
    this.platforms = this.game.add.group(this.game.world,'Platforms');
    this.platforms.enableBody = true;
    this.ground = this.platforms.create(0,0,'ground');
    this.ground.width = this.game.world.width;
    this.ground.y = this.game.world.height - this.ground.height;
    this.ground.body.immovable = true;

    //setup player
    this.players = this.game.add.group(this.game.world,'Players');
    this.player = new PlayerCharacter(this.game,30,30,'knight',4,30,200,'Eredin',10,2,40);
    this.players.add(this.player);

    //setup enemy
    this.enemies = this.game.add.group(this.game.world,'Enemies');
    this.enemy = new Enemy(this.game,500,100,'knight',4,100,150,'Demon',10,1,40);
    this.enemies.add(this.enemy);

    //setup a timer to end the game
    this.endGameTimer = this.game.time.create();
    this.endGameTimer.add(Phaser.Timer.SECOND * 25, this.endGame,this);
    this.endGameTimer.start();
  }

  update() {

    this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
