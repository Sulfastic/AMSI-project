import Vanguard from '../prefabs/vanguard';
import Demon from '../prefabs/demon';

class Game extends Phaser.State {

    constructor() {
        super();
    }

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

        //setup background image
        this.background = this.map.createLayer('background');

        //setup background tiles
        this.backgroundTiles = this.map.createLayer('backgroundTiles');

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

        //setup front tiles
        this.frontTiles = this.map.createLayer('frontTiles');

        //setup player spawn points based on spawn tiles
        this.playerSpawnPointLayer = this.map.createLayer('playerSpawnPoint');
        this.playerSpawnTile = this.map.searchTileIndex(10823,0,false,this.playerSpawnPointLayer);
        this.playerSpawnPoint ={x: this.playerSpawnTile.worldX, y: this.playerSpawnTile.worldY};


        this.enemySpawnPointLayers = [];

        //Add spawnPoints
        this.addSpawnPoints(this.enemySpawnPointLayers, 'enemiesSpawnPoints');
        this.addSpawnPoints(this.enemySpawnPointLayers, 'enemiesSpawnPoints2');
        this.addSpawnPoints(this.enemySpawnPointLayers, 'enemiesSpawnPoints3');

        //setup player
        this.players = this.game.add.group(this.game.world,'Players');
        this.player = new Vanguard(this.game,this.playerSpawnPoint.x,this.playerSpawnPoint.y,'Player',10);//Vanguard 10th level
        this.players.add(this.player);
        this.game.camera.follow(this.player);

        //setup enemy group
        this.enemies = this.game.add.group(this.game.world,'Enemies');

        //a flag when the player is dead, or wins
        this.playerDying = false;
        this.playerWins = false;

        //setup score
        this.game.global.score = 0;

        //Max Waves of enemies
        this.maxWaves = 3;
        //Current Waves of enemies
        this.currentWaves = 0;

    }

    addSpawnPoints(enemySpawnPointLayers, name){
        let enemySpawnPointLayer = this.map.createLayer(name);
        enemySpawnPointLayer.visible = false;
        let enemySpawnPoints = [];
        let enemySpawnTile = this.map.searchTileIndex(20595,0,false,enemySpawnPointLayer);
        let enemySpawnPointsCount=0;
        while(enemySpawnTile!=null){
            enemySpawnPoints.push({x: enemySpawnTile.worldX, y: enemySpawnTile.worldY});
            enemySpawnPointsCount++;
            enemySpawnTile = this.map.searchTileIndex(20595,enemySpawnPointsCount,false,enemySpawnPointLayer);
        }
        enemySpawnPointLayers.push({spawnLayer: enemySpawnPointLayer, enemySpawnPoints: enemySpawnPoints});

    }

    update() {
        if(!this.playerWins&&!this.playerDying){
            if(!this.player.exists) {
                this.playerDying = true;
                let time = this.game.time.create();
                time.add(Phaser.Timer.SECOND*3,this.endGame,this);
                time.start();
            }
            else if(this.enemies.countLiving()==0 && this.currentWaves == this.maxWaves){
                let time = this.game.time.create();
                time.add(Phaser.Timer.SECOND*3,this.winGame,this);
                time.start();
                this.playerWins=true;
            }
            else if(this.enemies.countLiving()==0){
                this.currentWaves++;
                this.spawnEnemies();
            }
        }

    }

    winGame() {
        this.resizeWorld();
        this.game.global.score = this.enemies.countDead();
        this.game.add.audio('gameOver').play();
        this.game.state.start('win');
    }


    endGame() {
        this.resizeWorld();
        this.game.global.score = this.enemies.countDead();
        this.game.add.audio('gameOver').play();
        this.game.state.start('gameover');
    }
    
    resizeWorld() {
        this.game.world.width = window.innerWidth;
        this.game.world.height = window.innerHeight;
    }

    spawnEnemies(){

        let maxLvlEnemies = this.currentWaves+2;
        let minLvlEnemies = this.currentWaves;
        let spawnLayerLvl = Math.floor(Math.random() * ((this.enemySpawnPointLayers.length-1) + 1));

        for(let i=0; i< this.enemySpawnPointLayers.length ; i++){
            this.enemySpawnPointLayers[i].spawnLayer.visible = false;
        }
        this.enemySpawnPointLayers[spawnLayerLvl].spawnLayer.visible = true;

        for(let i=0;i<this.enemySpawnPointLayers[spawnLayerLvl].enemySpawnPoints.length;i++){
            let level = Math.floor(Math.random() * (maxLvlEnemies - minLvlEnemies + 1)) + minLvlEnemies;
            this.enemy = new Demon(this.game,this.enemySpawnPointLayers[spawnLayerLvl].enemySpawnPoints[i].x,this.enemySpawnPointLayers[spawnLayerLvl].enemySpawnPoints[i].y,'Demon',level);
            this.enemies.add(this.enemy);
        }
        this.game.add.audio('newWave').play();
    }


}

export default Game;
