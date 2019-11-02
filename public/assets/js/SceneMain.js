class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image("sprPlayer", "assets/content/sprPlayer.png");
    this.load.image("brickYellow", "assets/content/brickYellow.png");
    this.load.image("brickGreen", "assets/content/brickGreen.png");
    this.load.image("brickBlue", "assets/content/brickBlue.png");
    this.load.image("brickPurple", "assets/content/brickPurple.png");
    this.load.image("platform", "assets/content/platform.png");
    this.load.image("sun", "assets/content/sun.png");
    this.load.image("player", "assets/content/player.png");
    this.load.image("note", "assets/content/note.png");
    this.load.image("note2", "assets/content/note2.png");
    this.load.image("note3", "assets/content/note3.png");
    this.load.image("circle", "assets/content/circle.png");
    this.load.image("circle2", "assets/content/circle2.png");
    this.load.image("circle3", "assets/content/circle3.png");
  }

  create() {
    this.socket = io()
    
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );

    this.background.setOrigin(0, 0);

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
    this.brick1 = this.add.image(650, 0, "brickYellow");
    this.brick2 = this.add.image(900, 0, "brickGreen");
    this.brick3 = this.add.image(650, 0, "brickBlue");
    this.brick4 = this.add.image(900, 0, "brickPurple");

    //  The score

    this.scoreText = this.add.text(16, 16, "SCORE: " + score, {
      fontSize: "32px",
      fill: "#DC143C"
    });

    this.scoreText;

    //Player creation
    this.players = this.physics.add.group();

    player = this.physics.add.sprite(
      config.width * 0.75,
      config.height * 0.8,
      "sprPlayer"
    );

    this.players = this.physics.add.group();
    this.players.add(player);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: "stay",
    //   frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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
      delay: 500,
      callback: function() {
        let number = Phaser.Math.Between(1, 22);
        if (number > 7 && number < 10) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let note = this.notes.create(x, y, "note");

            note;
          }
        } else if (number < 3) {
          for (let i = 0; i < 1; i++) {
            let x = 225;
            let y = 0;

            let note = this.notes.create(x, y, "note");

            note;
          }
        } else if (number > 3 && number < 7) {
          for (let i = 0; i < 1; i++) {
            let x = 350;
            let y = 0;

            let note = this.notes.create(x, y, "note");

            note;
          }
        } else if (number > 10 && number < 13) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let x2 = 350;
            let y2 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note");

            [note, note2];
          }
        } else if (number > 13 && number < 16) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let x2 = 225;
            let y2 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note");

            [note, note2];
          }
        } else if (number > 16 && number < 19) {
          for (let i = 0; i < 1; i++) {
            let x = 225;
            let y = 0;

            let x2 = 350;
            let y2 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note");

            [note, note2];
          }
        } else if (number > 19) {
          for (let i = 0; i < 1; i++) {
            let x = 100;
            let y = 0;

            let x2 = 225;
            let y2 = 0;

            let x3 = 350;
            let y3 = 0;

            let note = this.notes.create(x, y, "note");
            let note2 = this.notes.create(x2, y2, "note");
            let note3 = this.notes.create(x3, y3, "note");

            [note, note2, note3];
          }
        }
      },
      callbackScope: this,
      loop: -1
    });

    // let note = this.physics.add.image(this.game.config.width * 0.1, 0, "note");

    // let note2 = this.physics.add.image(
    //   this.game.config.width * 0.22,
    //   0,
    //   "note2"
    // );

    // let note3 = this.physics.add.image(
    //   this.game.config.width * 0.34,
    //   0,
    //   "note3"
    // );

    // this.note = note;
    // this.note2 = note2;
    // this.note3 = note3;

    let platform = this.physics.add.image(
      this.game.config.width * 0.75,
      this.game.config.height * 0.95,
      "platform"
    );

    let sun = this.physics.add.image(
      this.game.config.width * 0.9,
      this.game.config.height * 0.1,
      "sun"
    );

    this.objects.add(platform);
    this.objects.add(sun);
    // this.objects.add(note);
    // this.objects.add(note2);
    // this.objects.add(note3);
    this.objects.add(circle);
    this.objects.add(circle2);
    this.objects.add(circle3);

    sun.body.immovable = true;
    sun.body.allowGravity = false;

    circle.body.immovable = true;
    circle.body.allowGravity = false;

    circle2.body.immovable = true;
    circle2.body.allowGravity = false;

    circle3.body.immovable = true;
    circle3.body.allowGravity = false;

    platform.body.immovable = true;
    platform.body.allowGravity = false;

    // this.time.events.loop(Phaser.Timer.MINUTE / bpm, setRandomNote, this);

    this.physics.add.collider(platform, player);
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
  }

  update() {
    //Check's if the player if alive, if not it will show the game over screen
    // if (!this.player.getData("isDead")) {
    //   this.player.update();
    //   if (this.keyA.isDown) {
    //     this.player.moveLeft();
    //   } else if (this.keyD.isDown) {
    //     this.player.moveRight();
    //   }
    // }
    // this.playerStay();

    // this.music.play();

    // this.moveNote(this.note, 300);
    // this.moveNote2(this.note2, 300);
    // this.moveNote3(this.note3, 300);

    this.startMusic();

    this.movePlayerManager();

    this.score += 10;

    this.moveBrick1(this.brick1, 3);

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        this.moveBrick2(this.brick2, 3);
      },
      callbackScope: this,
      loop: false
    });

    this.time.addEvent({
      delay: 2000,
      callback: function() {
        this.moveBrick1(this.brick3, 3);
      },
      callbackScope: this,
      loop: false
    });

    this.time.addEvent({
      delay: 3000,
      callback: function() {
        this.moveBrick2(this.brick4, 3);
      },
      callbackScope: this,
      loop: false
    });

    this.background.tilePositionY -= 1.5;
  }

  //Sets brick's speed
  moveBrick1(brick, speed) {
    brick.y += speed;
    if (brick.y > config.height) {
      this.resetBrickPosition1(brick);
    }
  }

  moveBrick2(brick, speed) {
    brick.y += speed;
    if (brick.y > config.height) {
      this.resetBrickPosition2(brick);
    }
  }

  //Resets brick's position after it reaches the end of a screen
  resetBrickPosition1(brick) {
    brick.y = 0;
    brick.x = 650;
  }

  resetBrickPosition2(brick) {
    brick.y = 0;
    brick.x = 900;
  }
  
  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      player.setVelocityX(gameSettings.playerSpeed);
    } else if (this.cursorKeys.up.isDown) {
      player.setVelocityY(-gameSettings.playerSpeed);
    }
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

      score += 10;
      this.scoreText.setText("Score: " + score);
    }
  }

  collectNote2(circle, note) {
    if (this.keyS.isDown) {
      note.disableBody(true, true);

      score += 10;
      this.scoreText.setText("Score: " + score);
    }
  }

  collectNote3(circle, note) {
    if (this.keyD.isDown) {
      note.disableBody(true, true);

      score += 10;
      this.scoreText.setText("Score: " + score);
    }
  }

  setRandomNote() {
    const rand = Math.floor(Math.random() * strings.length);
    strings[rand].setNote();
  }

  // playerStay() {
  //   player.anims.play("stay");
  // }
}
