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
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  autoRound: false,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true
};

let game = new Phaser.Game(config);

// window.addEventListener(
//   "resize",
//   function(event) {
//     game.scale.resize(window.innerWidth, window.innerHeight);
//   },
//   false
// );
