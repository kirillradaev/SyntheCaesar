let gameSettings = { playerSpeed: 250 };
let player;
let music;
let intro;
let score = 0;
const bpm = 105;

let config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 }
    }
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config)
