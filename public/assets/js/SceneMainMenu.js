class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("mainMenuBg", "assets/content/mainMenuBg.png");
    this.load.image("background", "assets/content/sprBg0.png");
    this.load.image("sprBtnPlay", "assets/content/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "assets/content/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "assets/content/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "assets/content/sprBtnRestart.png");
    this.load.image(
      "sprBtnRestartHover",
      "assets/content/sprBtnRestartHover.png"
    );
    this.load.image(
      "sprBtnRestartDown",
      "assets/content/sprBtnRestartDown.png"
    );
    this.load.audio("sndBtnOver", "assets/content/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "assets/content/sndBtnDown.wav");
    this.load.audio("mainMenuTheme", "assets/content/home.mp3");
    this.load.audio("gameMusic", "assets/content/CQC.mp3");
  }

  create() {
    //INTRO MUSIC
    // intro = this.sound.add("mainMenuTheme");
    // intro.play();

    this.background = this.add.tileSprite(
      512,
      384,
      config.width,
      config.height,
      "mainMenuBg"
    );

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnPlay"
    );

    this.btnPlay.setInteractive();

    this.btnPlay.on(
      "pointerover",
      function() {
        this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnPlay.on("pointerout", function() {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on(
      "pointerdown",
      function() {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnPlay.on(
      "pointerup",
      function() {
        this.btnPlay.setTexture("sprBtnPlay");
        this.scene.start("SceneMain");
      },
      this
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      "RHYTHM GAME",
      {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center"
      }
    );
    this.title.setOrigin(0.5);
  }

  update() {
    // this.intro.play();
    // this.startMusic();
  }

  // startMusic() {
  //   intro.resume();
  // }
}
