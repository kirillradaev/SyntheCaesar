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
    this.socket = io();

    this.socket.on("connection", function(socket) {
      this.socket.broadcast.emit("newPlayer", socket);
    });

    this.background = this.add.tileSprite(
      512,
      384,
      config.width,
      config.height,
      "mainMenuBg"
    );

    this.getTitle();

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
        this.scene.start("SceneMain", { socket: this.socket });
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.sfx.btnDown.play();
      },
      this
    );
  }

  update() {}

  getTitle() {
    this.socket.on("waiting", data => {
      text = data.msg;

      this.title = this.add.text(this.game.config.width * 0.5, 128, text, {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center"
      });
      this.title.setOrigin(0.5);
    });

    this.socket.on("ready", data => {
      text = data.msg;
      if (this.title) {
        this.title.destroy();
      }
      this.title = this.add.text(this.game.config.width * 0.5, 128, text, {
        fontFamily: "monospace",
        fontSize: 48,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center"
      });
      this.title.setOrigin(0.5);

      this.btnPlay.visible = true;

      timedEvent = this.time.delayedCall(5000, this.nextScene, [], this);
    });
  }

  nextScene() {
    this.scene.start("SceneMain", { socket: this.socket });
  }
}
