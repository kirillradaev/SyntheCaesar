let game, scores;
 
class Highscore extends Phaser.Scene {
 
  constructor() {
    super({
      key: 'highScore',
      active: true
    });
 
    this.scores = [];
  }
 
  preload() {
    this.load.image("mainMenuBg", "assets/content/mainMenuBg.png")
    this.load.bitmapFont('arcade', 'assets/content/arcade.png', 'assets/content/arcade.xml');
  }
 
  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.background = this.add.tileSprite(
      512,
      384,
      config.width,
      config.height,
      "mainMenuBg"
    );

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on(
      "pointerover",
      function() {
        this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on(
      "pointerdown",
      function() {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnRestart.on(
      "pointerup",
      function() {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("SceneMain");
      },
      this
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
  parent: 'phaser-example',
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [Highscore]
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