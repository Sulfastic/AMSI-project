 import Boot from './states/boot';
 import Game from './states/game';
 import Menu from './states/menu';
 import LogIn from './account/logIn';
 import Register from './account/register';
 import LoggedInMenu from './account/loggedInMenu';
 import Preloader from './states/preloader';
 import Gameover from './states/gameover';
 import Win from './states/win';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'Family_Business-game');

 game.state.add('boot', new Boot());
 game.state.add('game', new Game());
 game.state.add('menu', new Menu());
 game.state.add('logIn', new LogIn());
 game.state.add('register', new Register());
 game.state.add('loggedInMenu', new LoggedInMenu());
 game.state.add('preloader', new Preloader());
 game.state.add('gameover', new Gameover());
 game.state.add('win', new Win());

 game.state.start('boot');
