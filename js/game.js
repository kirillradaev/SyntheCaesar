let config = {
  type: Phaser.WEBGL,
  width: 1024,
  height: 768,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config);
