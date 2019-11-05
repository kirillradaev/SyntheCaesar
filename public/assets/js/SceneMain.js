class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  init(data) {
    this.socket = data.socket;
  }

  preload() {
    this.load.spritesheet("sprExplosion", "assets/content/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprPlayer", "assets/content/sprPlayer.png", {
      frameWidth: 84,
      frameHeight: 77
    });
    this.load.image("sprLaserPlayer", "assets/content/sprLaserPlayer.png");
    this.load.spritesheet("sprEnemy0", "assets/content/sprEnemy0.png", {
      frameWidth: 60,
      frameHeight: 50
    });
    this.load.image("sprEnemy1", "assets/content/sprEnemy1.png");

    this.load.image("sprLaserEnemy0", "assets/content/sprLaserEnemy0.png");
    // this.load.image("brickYellow", "assets/content/brickYellow.png");
    // this.load.image("brickGreen", "assets/content/brickGreen.png");
    // this.load.image("brickBlue", "assets/content/brickBlue.png");
    // this.load.image("brickPurple", "assets/content/brickPurple.png");
    // this.load.image("platform", "assets/content/platform.png");
    // this.load.image("player", "assets/content/player.png");
    this.load.spritesheet("sun", "assets/content/sun.png", {
      frameWidth: 136,
      frameHeight: 120
    });
    this.load.image("note", "assets/content/note.png");
    this.load.image("note2", "assets/content/note2.png");
    this.load.image("note3", "assets/content/note3.png");
    this.load.image("circle", "assets/content/circle.png");
    this.load.image("circle2", "assets/content/circle2.png");
    this.load.image("circle3", "assets/content/circle3.png");
    this.load.audio("sndExplode0", "assets/content/sndExplode0.wav");
    this.load.audio("sndExplode1", "assets/content/sndExplode1.wav");
    this.load.audio("sndLaser", "assets/content/sndLaser.wav");
  }

  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );

    this.background.setOrigin(0, 0);

    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sun",
      frames: this.anims.generateFrameNumbers("sun"),
      frameRate: 5,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    //Music creation
    // bpm;

    // this.input.touch.preventDefault = false;

    music = this.sound.add("gameMusic");
    music.play();

    // this.input.onDown.add(startMusic, this);
    // function startMusic() {
    //   music.resume();
    // }

    // this.time.events.loop(Phaser.Timer.MINUTE / bpm, setRandomNote, this);

    /////////////////////////////////////////////////////////
    // this.brick1 = this.add.image(650, 0, "brickYellow");
    // this.brick2 = this.add.image(900, 0, "brickGreen");
    // this.brick3 = this.add.image(650, 0, "brickBlue");
    // this.brick4 = this.add.image(900, 0, "brickPurple");

    //  The score

    this.scoreText = this.add.text(16, 16, "SCORE: " + score, {
      fontFamily: '"Roboto Condensed"',
      fontSize: "42px",
      fill: "#DC143C"
    });

    this.scoreText;

    this.otherScoreText = this.add.text(16, 45, " THEIR SCORE: " + theirScore, {
      fontFamily: '"Roboto Condensed"',
      fontSize: "42px",
      fill: "#DC143C"
    });

    this.otherScoreText;

    //Player creation
    // this.players = this.physics.add.group();

    // player = this.physics.add.sprite(
    //   config.width * 0.75,
    //   config.height * 0.8,
    //   "sprPlayer"
    // );

    // this.players = this.physics.add.group();
    // this.players.add(player);

    // player.setBounce(0.2);
    // player.setCollideWorldBounds(true);

    this.enemies = this.add.group();
    this.playerLasers = this.add.group();
    this.enemyLasers = this.add.group();

    this.time.addEvent({
      delay: 3000,
      callback: function() {
        let enemy = null;
        enemy = new GunShip(
          this,
          Phaser.Math.Between(700, 1000),
          0,
          "sprEnemy0"
        );

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 3000,
      callback: function() {
        let enemy = null;
        enemy = new ChaserShip(
          this,
          Phaser.Math.Between(700, 1000),
          0,
          "sprEnemy1"
        );

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.player = new Player(
      this,
      this.game.config.width * 0.8,
      this.game.config.height * 0.9,
      "sprPlayer"
    );

    this.sun = new Sun(
      this,
      this.game.config.width * 0.9,
      this.game.config.height * 0.1,
      "sun"
    );

    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //Platform creation

    // this.physics.world.setBoundsCollision();

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.objects = this.physics.add.group();

    let circle = this.physics.add.image(
      this.game.config.width * 0.1,
      this.game.config.height * 0.9,
      "circle"
    );

    let circle2 = this.physics.add.image(
      this.game.config.width * 0.22,
      this.game.config.height * 0.9,
      "circle2"
    );

    let circle3 = this.physics.add.image(
      this.game.config.width * 0.34,
      this.game.config.height * 0.9,
      "circle3"
    );

    this.notes = this.physics.add.group();

    this.time.addEvent({
      delay: 450,
      callback: function() {
        let number = Phaser.Math.Between(1, 27);
        if (number < 6) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let note = this.notes.create(x, y, "note");
            note.setVelocityY(600);

            note;
          }
        } else if (number > 5 && number < 11) {
          for (let i = 0; i < 1; i++) {
            let x = 225;
            let y = 0;

            let note = this.notes.create(x, y, "note2");
            note.setVelocityY(600);

            note;
          }
        } else if (number > 10 && number < 16) {
          for (let i = 0; i < 1; i++) {
            let x = 350;
            let y = 0;

            let note = this.notes.create(x, y, "note3");
            note.setVelocityY(600);

            note;
          }
        } else if (number > 15 && number < 19) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let x2 = 350;
            let y2 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note3");
            note.setVelocityY(600);
            note2.setVelocityY(600);

            [note, note2];
          }
        } else if (number > 18 && number < 22) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let x2 = 225;
            let y2 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note2");
            note.setVelocityY(600);
            note2.setVelocityY(600);

            [note, note2];
          }
        } else if (number > 21 && number < 25) {
          for (let i = 0; i < 1; i++) {
            let x = 225;
            let y = 0;

            let x2 = 350;
            let y2 = 0;

            let note = this.notes.create(x, y, "note2");
            let note2 = this.notes.create(x2, y2, "note3");
            note.setVelocityY(600);
            note2.setVelocityY(600);

            [note, note2];
          }
        } else if (number > 25) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let x2 = 225;
            let y2 = 0;

            let x3 = 350;
            let y3 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note2");
            let note3 = this.notes.create(x3, y3, "note3");
            note.setVelocityY(600);
            note2.setVelocityY(600);
            note3.setVelocityY(600);

            [note, note2, note3];
          }
        }
      },
      callbackScope: this,
      loop: -1
    });

    // let platform = this.physics.add.image(
    //   this.game.config.width * 0.75,
    //   this.game.config.height * 0.95,
    //   "platform"
    // );

    // this.objects.add(platform);
    // this.objects.add(note);
    // this.objects.add(note2);
    // this.objects.add(note3);
    this.objects.add(circle);
    this.objects.add(circle2);
    this.objects.add(circle3);

    // sun.body.immovable = true;
    // sun.body.allowGravity = false;

    circle.body.immovable = true;
    circle.body.allowGravity = false;

    circle2.body.immovable = true;
    circle2.body.allowGravity = false;

    circle3.body.immovable = true;
    circle3.body.allowGravity = false;

    // platform.body.immovable = true;
    // platform.body.allowGravity = false;

    // this.time.events.loop(Phaser.Timer.MINUTE / bpm, setRandomNote, this);

    // this.physics.add.collider(platform, player);
    this.physics.add.overlap(circle, this.notes, this.collectNote1, null, this);
    this.physics.add.overlap(
      circle2,
      this.notes,
      this.collectNote2,
      null,
      this
    );
    this.physics.add.overlap(
      circle3,
      this.notes,
      this.collectNote3,
      null,
      this
    );

    // if (this.enemy !== null) {
    //   this.enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
    //   this.enemies.add(this.enemy);
    // }

    this.physics.add.collider(this.playerLasers, this.enemies, function(
      playerLaser,
      enemy
    ) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(
      player,
      enemy
    ) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });
  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.cursorKeys.left.isDown) {
        this.player.moveLeft();
      } else if (this.cursorKeys.right.isDown) {
        this.player.moveRight();
      }

      if (this.keyA.isDown || this.keyS.isDown || this.keyD.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData(
          "timerShootTick",
          this.player.getData("timerShootDelay") - 1
        );
        this.player.setData("isShooting", false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
      let laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // this.music.play();

    // this.moveNote(this.note, 300);
    // this.moveNote2(this.note2, 300);
    // this.moveNote3(this.note3, 300);

    this.startMusic();

    // this.movePlayerManager();

    this.score += 10;

    // this.moveBrick1(this.brick1, 3);

    // this.time.addEvent({
    //   delay: 1000,
    //   callback: function() {
    //     this.moveBrick2(this.brick2, 3);
    //   },
    //   callbackScope: this,
    //   loop: false
    // });

    // this.time.addEvent({
    //   delay: 2000,
    //   callback: function() {
    //     this.moveBrick1(this.brick3, 3);
    //   },
    //   callbackScope: this,
    //   loop: false
    // });

    // this.time.addEvent({
    //   delay: 3000,
    //   callback: function() {
    //     this.moveBrick2(this.brick4, 3);
    //   },
    //   callbackScope: this,
    //   loop: false
    // });

    this.background.tilePositionY -= 1.5;
  }

  //Sets brick's speed
  // moveBrick1(brick, speed) {
  //   brick.y += speed;
  //   if (brick.y > config.height) {
  //     this.resetBrickPosition1(brick);
  //   }
  // }

  // moveBrick2(brick, speed) {
  //   brick.y += speed;
  //   if (brick.y > config.height) {
  //     this.resetBrickPosition2(brick);
  //   }
  // }

  //Resets brick's position after it reaches the end of a screen
  resetBrickPosition1(brick) {
    brick.y = 0;
    brick.x = 650;
  }

  resetBrickPosition2(brick) {
    brick.y = 0;
    brick.x = 900;
  }

  //MUSIC STUFF
  startMusic() {
    music.resume();
  }

  // moveNote(note, speed) {
  //   note.setVelocityY(speed);
  //   if (note.y > config.height) {
  //     this.resetNotePosition(note);
  //   }
  // }

  // resetNotePosition(note) {
  //   note.y = 0;
  //   note.x = 100;
  // }

  // moveNote2(note, speed) {
  //   note.setVelocityY(speed);
  //   if (note.y > config.height) {
  //     this.resetNotePosition2(note);
  //   }
  // }

  // resetNotePosition2(note) {
  //   note.y = 0;
  //   note.x = 225;
  // }

  // moveNote3(note, speed) {
  //   note.setVelocityY(speed);
  //   if (note.y > config.height) {
  //     this.resetNotePosition3(note);
  //   }
  // }

  // resetNotePosition3(note) {
  //   note.y = 0;
  //   note.x = 350;
  // }

  collectNote1(circle, note) {
    if (this.keyA.isDown) {
      note.disableBody(true, true);

      this.updateScore();
    }
  }

  collectNote2(circle, note) {
    if (this.keyS.isDown) {
      note.disableBody(true, true);

      this.updateScore();
    }
  }

  collectNote3(circle, note) {
    if (this.keyD.isDown) {
      note.disableBody(true, true);

      this.updateScore();
    }
  }

  updateScore() {
    this.socket.emit("scoreUpdate", (score += 10));
    this.scoreText.setText("Score: " + score);
    this.socket.on("playerScore", theirScore => {
      this.otherScoreText.setText("Their Score: " + theirScore);
    });
  }

  setRandomNote() {
    const rand = Math.floor(Math.random() * strings.length);
    strings[rand].setNote();
  }

  // destroyEnemy(enemy) {
  //   enemy.destroy();
  // }
}
