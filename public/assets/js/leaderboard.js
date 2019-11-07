let game, scores;
 
class Highscore extends Phaser.Scene {
 
  constructor() {
    super({
      key: 'Highscore',
      active: true
    });
 
    this.scores = [];
  }
 
  preload() {
    this.load.image("mainMenuBg", "assets/content/mainMenuBg.png");
    this.load.bitmapFont('arcade', 'assets/content/arcade.png', 'assets/content/arcade.xml');
  }
 
  create() {
    this.background = this.add.tileSprite(
      512,
      384,
      config.width,
      config.height,
      "mainMenuBg"
    );

    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
 
    for (let i = 1; i < 6; i++) {
      if (scores[i-1]) {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      ${scores[i-1].highScore}    ${scores[i-1].username}`).setTint(0xffffff);
      } else {
        this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
      }
    }
  }
}
 
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
  scene: [Highscore],
  pixelArt: true,
  roundPixels: true
};
 
$.ajax({
  type: 'GET',
  url: '/scores',
  success: function(data) {
    game = new Phaser.Game(config);
    scores = data
  },
  error: function(xhr) {
    console.log(xhr);
  }
});