import Phaser from "phaser";
import { level_one_questions } from "../questions";
import localforage from "localforage";
import Swal from "sweetalert2";
import {
  conePositions,
  flowerPositions,
  objectHeights,
  plantPositions,
  rockPositions,
  stone1Positions,
  stone2Positions,
} from "../positions";
const questions = level_one_questions;
var score = 0;
var tries = 1;
var question = 1;
var questionsRecord = [];
var totalTimeSpent = 0;
var questionTime = 0;
var personData = {};
function getPoint(val) {
  switch (val) {
    case 1:
      return 100;
    case 2:
      return 80;
    case 3:
      return 50;
  }
}

export default class LevelOneScene extends Phaser.Scene {
  constructor() {
    super("level-one-scene");
  }

  init(data) {
    this.playerName = data.playerName;
    this.characterColor = data.characterColor;
  }
  preload() {
    this.load.spritesheet(
      "player",
      `assets/${this.characterColor || "white"}.png`,
      {
        frameWidth: 600,
        frameHeight: 599,
      }
    );
    this.load.spritesheet("fish", `assets/fish.png`, {
      frameWidth: 200,
      frameHeight: 91,
    });
    this.load.image("croc", "assets/croc.png");
    this.load.image("croc1", "assets/croc1.png");
    this.load.image("croc2", "assets/croc2.png");
    this.load.image(
      "crocking",
      `assets/croc${this.characterColor + "1" || "white1"}.png`
    );
    this.load.image(
      "crocked",
      `assets/croc${this.characterColor + "2" || "white2"}.png`
    );
    this.load.image("menu", "assets/menu.png");
    this.load.image("next", "assets/next.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("cone", "assets/cone.png");
    this.load.image("flower", "assets/flower.png");
    this.load.image("plant", "assets/plant.png");
    this.load.image("rock", "assets/rock.png");
    this.load.image("stone1", "assets/stone1.png");
    this.load.image("stone2", "assets/stone2.png");
    this.load.image("leftside", "assets/leftside.png");
    this.load.image("rightside", "assets/rightside.png");
    this.load.image("gold", "assets/gold.png");
    this.load.image("silver", "assets/silver.png");
    this.load.image("bronze", "assets/bronze.png");

    this.load.image("platform", "assets/qline.png");
    this.load.image("startline", "assets/redline.png");
    this.load.image("endline", "assets/blackline.png");
    this.load.image("badge1", "assets/Level 1 Badge.png");
    this.load.bitmapFont(
      "desyrel",
      "assets/bitmap/desyrel.png",
      "assets/bitmap/desyrel.xml"
    );
    this.load.bitmapFont(
      "iceicebaby",
      "assets/bitmap/iceicebaby.png",
      "assets/bitmap/iceicebaby.xml"
    );
    this.load.audio("question1", ["assets/audio/question1.mp3"]);
    this.load.audio("river", ["assets/audio/river.mp3"]);
    this.load.audio("start", ["assets/audio/start.mp3"]);
    this.load.audio("wrong", ["assets/audio/wrong.ogg"]);
    this.load.audio("goldsound", ["assets/audio/gold.mp3"]);
    this.load.audio("silversound", ["assets/audio/silver.mp3"]);
    this.load.audio("bronzesound", ["assets/audio/bronze.mp3"]);
  }

  create() {
    localforage
      .getItem(this.playerName)
      .then(function (value) {
        personData = value;
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
    var start = this.sound.add("start", { loop: false });
    var river = this.sound.add("river", { loop: true, volume: 0.2 });
    var question1 = this.sound.add("question1");
    var wrong = this.sound.add("wrong");
    var gold = this.sound.add("goldsound");
    var silver = this.sound.add("silversound");
    var bronze = this.sound.add("bronzesound");

    //Adding CrocImages
    const croc = this.physics.add.sprite(420, 50, "croc").setScale(0.45);
    const croc1 = this.add
      .image(420, 330, "croc1")
      .setScale(0.5)
      .setScrollFactor(0)
      .setVisible(false);
    const croc2 = this.add
      .image(550, 330, "croc2")
      .setScale(0.5)
      .setScrollFactor(0)
      .setVisible(false);
    const crocking = this.add
      .image(600, 330, "crocking")
      .setScale(0.5)
      .setScrollFactor(0)
      .setVisible(false);
    const crocked = this.add
      .image(610, 330, "crocked")
      .setScale(0.5)
      .setScrollFactor(0)
      .setVisible(false);

    this.restartButton = this.add.image(620, 23550, "restart").setScale(0.2);
    this.nextButton = this.add.image(620, 23600, "next").setScale(0.2);
    this.menuButton = this.add.image(620, 23650, "menu").setScale(0.2);
    this.menuButton.setInteractive();
    this.nextButton.setInteractive().setVisible(false);

    this.badge = this.add
      .image(1000, 23600, "badge1")
      .setScale(0.5)
      .setVisible(false);
    this.restartButton.setInteractive();
    this.bronzeMedal = this.add
      .image(200, 23600, "bronze")
      .setScale(0.5)
      .setVisible(false);
    this.silverMedal = this.add
      .image(200, 23600, "silver")
      .setScale(0.5)
      .setVisible(false);

    this.goldMedal = this.add
      .image(200, 23600, "gold")
      .setScale(0.5)
      .setVisible(false);
    this.restartButton.on("pointerup", () => {
      this.scene.restart({
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
      score = 0;
      tries = 1;
    });
    this.nextButton.on("pointerup", () => {
      this.scene.start("level-two-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
        previousScore: score,
      });
      score = 0;
      tries = 1;
    });
    this.menuButton.on("pointerup", () => {
      this.scene.start("input-scene");
      score = 0;
      tries = 1;
    });

    river.play();
    const platforms = this.physics.add.staticGroup();
    const platformTop = this.physics.add.staticGroup();
    const platformEnd = this.physics.add.staticGroup();
    const cones = this.physics.add.group();
    const flowers = this.physics.add.group();
    const rocks = this.physics.add.group();
    const stone1s = this.physics.add.group();
    const stone2s = this.physics.add.group();
    const plants = this.physics.add.group();
    const fish = this.physics.add.group();
    this.add
      .text(1000, 100, `Player : ${this.playerName}`, {
        font: "bold 18px Arial ",
        color: "#fff",
      })
      .setScrollFactor(0);

    this.scorelabel = this.add
      .text(1000, 70, `Score : ${score}`, {
        font: "bold 18px Arial ",
        color: "#fff",
      })
      .setScrollFactor(0);
    this.time.delayedCall(
      3000,
      function () {
        start.play();

        setTimeout(() => {
          player.anims.play("move", true);
          player.setGravityY(50);
          croc.setGravityY(35);
        }, 1700);
      },
      [],
      this
    );
    this.time.delayedCall(
      12000,
      function () {
        croc.setVisible(false);
      },
      [],
      this
    );

    platformTop.create(28, 180, "startline").setOrigin(0, 0.5);
    platformEnd.create(28, 22000, "endline").setOrigin(0, 0.5);
    this.leftside = this.add.image(25, 370, "leftside").setScrollFactor(0);
    this.rightside = this.add.image(1255, 370, "rightside").setScrollFactor(0);
    const player = this.physics.add.sprite(620, 110, "player").setScale(0.3);
    this.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 7, end: 7 }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: "win",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 5 }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: "lose",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 6 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "swim",
      frames: this.anims.generateFrameNumbers("fish", { start: 0, end: 2 }),
      frameRate: 1,
      repeat: -1,
    });

    function addLeftFishes() {
      objectHeights.forEach((item) => {
        fish
          .create(400, item - 500, "fish")
          .setScale(0.5, 0.5)
          .play("swim");
      });
    }

    function addRightFishes() {
      objectHeights.forEach((item) => {
        fish
          .create(900, item - 200, "fish")
          .setFlipX(true)
          .setScale(0.5, 0.5)
          .play("swim");
      });
    }

    function addCones() {
      conePositions.forEach((item) => {
        cones
          .create(150, item - 300, "cone")
          .setScale(0.3, 0.3)
          .refreshBody();
      });
    }

    function addFlowers() {
      flowerPositions.forEach((item) => {
        flowers
          .create(1000, item - 800, "flower")
          .setScale(0.5, 0.5)
          .refreshBody();
      });
    }
    function addRocks() {
      rockPositions.forEach((item) => {
        rocks
          .create(200, item - 1000, "rock")
          .setScale(0.4, 0.4)
          .refreshBody();
      });
    }
    function addStone1s() {
      stone1Positions.forEach((item) => {
        stone1s
          .create(150, item - 1400, "stone1")
          .setScale(0.3, 0.3)
          .refreshBody();
      });
    }
    function addStone2s() {
      stone2Positions.forEach((item) => {
        stone2s
          .create(1150, item - 1600, "stone2")
          .setScale(0.3, 0.3)
          .refreshBody();
      });
    }
    function addPlants() {
      plantPositions.forEach((item) => {
        plants
          .create(1150, item - 500, "plant")
          .setScale(0.3, 0.3)
          .refreshBody();
      });
    }
    function createPlatform() {
      questions.forEach((item) => {
        platforms
          .create(28, item.tall, "platform")
          .setOrigin(0, 0.5)
          .refreshBody();
      });
    }
    //Function to Map Questions
    const addQuestions = () => {
      questions.forEach((item) => {
        //Listing Possible Answers
        var qtext = this.add.text(
          250,
          item.tall - 80,
          "Identify the integers among the following numbers.",
          {
            font: "bold 32px Arial ",
            color: "#fff",
          }
        );

        const answerOne = this.add
          .bitmapText(200, item.tall, "desyrel", `${item.question[0]}`)
          .setOrigin(0.5)
          .setScale(0.7, 0.7)
          .setDropShadow(3, 3, 999, 2);
        const answerTwo = this.add
          .bitmapText(420, item.tall, "desyrel", `${item.question[1]}`)
          .setOrigin(0.5)
          .setScale(0.7, 0.7)
          .setDropShadow(3, 3, 999, 2);
        const answerThree = this.add
          .bitmapText(640, item.tall, "desyrel", `${item.question[2]}`)
          .setOrigin(0.5)
          .setScale(0.7, 0.7)
          .setDropShadow(3, 3, 999, 2);
        const answerFour = this.add
          .bitmapText(860, item.tall, "desyrel", `${item.question[3]}`)
          .setOrigin(0.5)
          .setScale(0.7, 0.7)
          .setDropShadow(3, 3, 999, 2);
        const answerFive = this.add
          .bitmapText(1080, item.tall, "desyrel", `${item.question[4]}`)
          .setOrigin(0.5)
          .setScale(0.7, 0.7)
          .setDropShadow(3, 3, 999, 2);

        //Making Possible Answer Interactive with the Mouse
        answerOne.setInteractive();
        answerTwo.setInteractive();
        answerThree.setInteractive();
        answerFour.setInteractive();
        answerFive.setInteractive();

        //Mouse onHover/PointerOver actions for possible Answers
        answerOne.on("pointerover", () => {
          answerOne.setScale(0.9, 0.9);
          question1.play();
        });
        answerTwo.on("pointerover", () => {
          answerTwo.setScale(0.9, 0.9);
          question1.play();
        });
        answerThree.on("pointerover", () => {
          answerThree.setScale(0.9, 0.9);
          question1.play();
        });
        answerFour.on("pointerover", () => {
          answerFour.setScale(0.9, 0.9);
          question1.play();
        });
        answerFive.on("pointerover", () => {
          answerFive.setScale(0.9, 0.9);
          question1.play();
        });

        //Mouse onPointerOut actions for possible Answers
        answerOne.on("pointerout", () => {
          answerOne.setScale(0.7, 0.7);
        });
        answerTwo.on("pointerout", () => {
          answerTwo.setScale(0.7, 0.7);
        });
        answerThree.on("pointerout", () => {
          answerThree.setScale(0.7, 0.7);
        });
        answerFour.on("pointerout", () => {
          answerFour.setScale(0.7, 0.7);
        });
        answerFive.on("pointerout", () => {
          answerFive.setScale(0.7, 0.7);
        });

        function istheAnswer(text) {
          return item.isAnswer.includes(text);
        }

        //Mouse onPointerUp actions for possible Answers
        answerOne.on("pointerup", () => {
          const heightToUse = item.tall + 500;
          const hasAnswer = istheAnswer(answerOne.text);
          const point = getPoint(tries);
          if (hasAnswer) {
            this.tweens.add({
              targets: player,
              y: heightToUse,
              duration: 1000,
              ease: "Linear",
              repeat: 0,
              yoyo: false,
            });
            score += point;
            questionsRecord.push({
              no: question,
              time: questionTime,
              tries,
              point,
            });
            this.scorelabel.setText(`Score: ${score}`);
            questionTime = 0;
            question += 1;
            tries = 1;
            player.anims.play("move");
            croc1.setVisible(false);
            croc2.setVisible(false);
          } else {
            wrong.play();
            if (tries === 3) {
              personData.gameOvers = personData?.gameOvers
                ? [
                    ...personData.gameOvers,
                    { no: question, tries, time: new Date(), Level: 1 },
                  ]
                : [{ no: question, tries, time: new Date(), Level: 1 }];
              localforage
                .setItem(this.playerName, personData)
                .then(function () {
                  console.log("Game Over");
                })
                .catch(function (err) {
                  console.log(err);
                });
              platforms.setVisible(false);
              qtext.setVisible(false);
              croc2.setVisible(false);
              player.setVisible(false);
              answerOne.setVisible(false);
              answerTwo.setVisible(false);
              answerThree.setVisible(false);
              answerFour.setVisible(false);
              answerFive.setVisible(false);
              crocking.setVisible(true);
              this.time.delayedCall(
                1000,
                function () {
                  crocking.setVisible(false);
                  croc2.setVisible(false);
                  crocked.setVisible(true);
                  player.setVisible(false);
                  this.physics.pause();
                  river.stop();
                  this.gameOverText.setVisible(true);
                  this.restartGame.setVisible(true);
                  this.menuGame.setVisible(true);
                },
                [],
                this
              );
            } else {
              if (tries === 1) {
                croc1.setVisible(true);
              }
              if (tries === 2) {
                croc1.setVisible(false);
                croc2.setVisible(true);
              }
              this.cameras.main.shake(200);
              tries += 1;
              Swal.fire({
                position: "top",
                // title: "Integers are positive or negative whole numbers",
                text: "Integers are positive or negative whole numbers",
                width: 300,
              });
            }
          }
        });
        answerTwo.on("pointerup", () => {
          const heightToUse = item.tall + 500;
          const hasAnswer = istheAnswer(answerTwo.text);
          const point = getPoint(tries);
          if (hasAnswer) {
            this.tweens.add({
              targets: player,
              y: heightToUse,
              duration: 1000,
              ease: "Linear",
              repeat: 0,
              yoyo: false,
            });
            score += point;
            questionsRecord.push({
              no: question,
              time: questionTime,
              tries,
              point,
            });
            this.scorelabel.setText(`Score: ${score}`);
            questionTime = 0;
            question += 1;
            tries = 1;
            player.anims.play("move");
            croc1.setVisible(false);
            croc2.setVisible(false);
          } else {
            wrong.play();
            if (tries === 3) {
              personData.gameOvers = personData?.gameOvers
                ? [
                    ...personData.gameOvers,
                    { no: question, tries, time: new Date(), Level: 1 },
                  ]
                : [{ no: question, tries, time: new Date(), Level: 1 }];
              localforage
                .setItem(this.playerName, personData)
                .then(function () {
                  console.log("Game Over");
                })
                .catch(function (err) {
                  console.log(err);
                });
              platforms.setVisible(false);
              qtext.setVisible(false);
              croc2.setVisible(false);
              player.setVisible(false);
              answerOne.setVisible(false);
              answerTwo.setVisible(false);
              answerThree.setVisible(false);
              answerFour.setVisible(false);
              answerFive.setVisible(false);
              crocking.setVisible(true);
              this.time.delayedCall(
                1000,
                function () {
                  crocking.setVisible(false);
                  croc2.setVisible(false);
                  crocked.setVisible(true);
                  player.setVisible(false);
                  this.physics.pause();
                  river.stop();
                  this.gameOverText.setVisible(true);
                  this.restartGame.setVisible(true);
                  this.menuGame.setVisible(true);
                },
                [],
                this
              );
            } else {
              if (tries === 1) {
                croc1.setVisible(true);
              }
              if (tries === 2) {
                croc1.setVisible(false);
                croc2.setVisible(true);
              }
              this.cameras.main.shake(200);
              tries += 1;
              Swal.fire({
                position: "top",
                // title: "Integers are positive or negative whole numbers",
                text: "Integers are positive or negative whole numbers",
                width: 300,
              });
            }
          }
        });
        answerThree.on("pointerup", () => {
          const heightToUse = item.tall + 500;
          const hasAnswer = istheAnswer(answerThree.text);
          const point = getPoint(tries);
          if (hasAnswer) {
            this.tweens.add({
              targets: player,
              y: heightToUse,
              duration: 1000,
              ease: "Linear",
              repeat: 0,
              yoyo: false,
            });
            score += point;
            questionsRecord.push({
              no: question,
              time: questionTime,
              tries,
              point,
            });
            this.scorelabel.setText(`Score: ${score}`);
            questionTime = 0;
            question += 1;
            tries = 1;
            player.anims.play("move");
            croc1.setVisible(false);
            croc2.setVisible(false);
          } else {
            wrong.play();
            if (tries === 3) {
              personData.gameOvers = personData?.gameOvers
                ? [
                    ...personData.gameOvers,
                    { no: question, tries, time: new Date(), Level: 1 },
                  ]
                : [{ no: question, tries, time: new Date(), Level: 1 }];
              localforage
                .setItem(this.playerName, personData)
                .then(function () {
                  console.log("Game Over");
                })
                .catch(function (err) {
                  console.log(err);
                });
              platforms.setVisible(false);
              qtext.setVisible(false);
              croc2.setVisible(false);
              player.setVisible(false);
              answerOne.setVisible(false);
              answerTwo.setVisible(false);
              answerThree.setVisible(false);
              answerFour.setVisible(false);
              answerFive.setVisible(false);
              crocking.setVisible(true);
              this.time.delayedCall(
                1000,
                function () {
                  crocking.setVisible(false);
                  croc2.setVisible(false);
                  crocked.setVisible(true);
                  player.setVisible(false);
                  this.physics.pause();
                  river.stop();
                  this.gameOverText.setVisible(true);
                  this.restartGame.setVisible(true);
                  this.menuGame.setVisible(true);
                },
                [],
                this
              );
            } else {
              if (tries === 1) {
                croc1.setVisible(true);
              }
              if (tries === 2) {
                croc1.setVisible(false);
                croc2.setVisible(true);
              }
              this.cameras.main.shake(200);
              tries += 1;
              Swal.fire({
                position: "top",
                // title: "Integers are positive or negative whole numbers",
                text: "Integers are positive or negative whole numbers",
                width: 300,
              });
            }
          }
        });
        answerFour.on("pointerup", () => {
          const heightToUse = item.tall + 500;
          const hasAnswer = istheAnswer(answerFour.text);
          const point = getPoint(tries);
          if (hasAnswer) {
            this.tweens.add({
              targets: player,
              y: heightToUse,
              duration: 1000,
              ease: "Linear",
              repeat: 0,
              yoyo: false,
            });
            score += point;
            questionsRecord.push({
              no: question,
              time: questionTime,
              tries,
              point,
            });
            this.scorelabel.setText(`Score: ${score}`);
            questionTime = 0;
            question += 1;
            tries = 1;
            player.anims.play("move");
            croc1.setVisible(false);
            croc2.setVisible(false);
          } else {
            wrong.play();
            if (tries === 3) {
              personData.gameOvers = personData?.gameOvers
                ? [
                    ...personData.gameOvers,
                    { no: question, tries, time: new Date(), Level: 1 },
                  ]
                : [{ no: question, tries, time: new Date(), Level: 1 }];
              localforage
                .setItem(this.playerName, personData)
                .then(function () {
                  console.log("Game Over");
                })
                .catch(function (err) {
                  console.log(err);
                });
              platforms.setVisible(false);
              qtext.setVisible(false);
              croc2.setVisible(false);
              player.setVisible(false);
              answerOne.setVisible(false);
              answerTwo.setVisible(false);
              answerThree.setVisible(false);
              answerFour.setVisible(false);
              answerFive.setVisible(false);
              crocking.setVisible(true);
              this.time.delayedCall(
                1000,
                function () {
                  crocking.setVisible(false);
                  croc2.setVisible(false);
                  crocked.setVisible(true);
                  player.setVisible(false);
                  this.physics.pause();
                  river.stop();
                  this.gameOverText.setVisible(true);
                  this.restartGame.setVisible(true);
                  this.menuGame.setVisible(true);
                },
                [],
                this
              );
            } else {
              if (tries === 1) {
                croc1.setVisible(true);
              }
              if (tries === 2) {
                croc1.setVisible(false);
                croc2.setVisible(true);
              }
              this.cameras.main.shake(200);
              tries += 1;
              Swal.fire({
                position: "top",
                // title: "Integers are positive or negative whole numbers",
                text: "Integers are positive or negative whole numbers",
                width: 300,
              });
            }
          }
        });
        answerFive.on("pointerup", () => {
          const heightToUse = item.tall + 500;
          const hasAnswer = istheAnswer(answerFive.text);
          const point = getPoint(tries);
          if (hasAnswer) {
            this.tweens.add({
              targets: player,
              y: heightToUse,
              duration: 1000,
              ease: "Linear",
              repeat: 0,
              yoyo: false,
            });
            score += point;
            questionsRecord.push({
              no: question,
              time: questionTime,
              tries,
              point,
            });
            this.scorelabel.setText(`Score: ${score}`);
            questionTime = 0;
            question += 1;
            tries = 1;
            player.anims.play("move");
            croc1.setVisible(false);
            croc2.setVisible(false);
          } else {
            wrong.play();
            if (tries === 3) {
              personData.gameOvers = personData?.gameOvers
                ? [
                    ...personData.gameOvers,
                    { no: question, tries, time: new Date(), Level: 1 },
                  ]
                : [{ no: question, tries, time: new Date(), Level: 1 }];
              localforage
                .setItem(this.playerName, personData)
                .then(function () {
                  console.log("Game Over");
                })
                .catch(function (err) {
                  console.log(err);
                });
              platforms.setVisible(false);
              qtext.setVisible(false);
              croc2.setVisible(false);
              player.setVisible(false);
              answerOne.setVisible(false);
              answerTwo.setVisible(false);
              answerThree.setVisible(false);
              answerFour.setVisible(false);
              answerFive.setVisible(false);
              crocking.setVisible(true);
              this.time.delayedCall(
                1000,
                function () {
                  crocking.setVisible(false);
                  croc2.setVisible(false);
                  crocked.setVisible(true);
                  player.setVisible(false);
                  this.physics.pause();
                  river.stop();
                  this.gameOverText.setVisible(true);
                  this.restartGame.setVisible(true);
                  this.menuGame.setVisible(true);
                },
                [],
                this
              );
            } else {
              if (tries === 1) {
                croc1.setVisible(true);
              }
              if (tries === 2) {
                croc1.setVisible(false);
                croc2.setVisible(true);
              }
              this.cameras.main.shake(200);
              tries += 1;
              Swal.fire({
                position: "top",
                // title: "Integers are positive or negative whole numbers",
                text: "Integers are positive or negative whole numbers",
                width: 300,
              });
            }
          }
        });
      });
      this.physics.add.collider(
        platforms,
        player,
        function () {
          questionTime += 0.015;
        },
        null,
        this
      );
    };

    player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, 1280, 24000);
    this.physics.world.setBounds(0, 0, 1280, 24000);
    this.cameras.main.startFollow(player, true, 0.2, 0.2);

    this.physics.add.overlap(player, platformEnd, () => {
      if (score >= 600) {
        this.nextButton.setVisible(true);
        this.badge.setVisible(true);
        if (score >= 800) {
          gold.play();
          this.goldMedal.setVisible(true);
        } else if (score <= 800 && score >= 700) {
          silver.play();
          this.silverMedal.setVisible(true);
        } else if (score <= 700 && score >= 600) {
          bronze.play();
          this.bronzeMedal.setVisible(true);
        }

        player.anims.play("win");
        personData.levelOneData = {
          score,
          totalTimeSpent,
          questionsRecord,
        };
        personData.levelOneComplete = true;

        localforage
          .setItem(this.playerName, personData)
          .then(function () {
            // Do other things once the value has been saved.
            console.log("Stored Win");
          })
          .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
          });
      } else {
        player.anims.play("lose");
        personData.fails = personData?.fails ? personData.fails + 1 : 1;
        localforage
          .setItem(this.playerName, personData)
          .then(function () {
            console.log("Sorry You Failed");
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    });

    createPlatform();
    addQuestions();
    addCones();
    addFlowers();
    addLeftFishes();
    addRightFishes();
    addPlants();
    addRocks();
    addStone1s();
    addStone2s();
    this.gameOverText = this.add
      .bitmapText(280, 410, "iceicebaby", "GAME OVER")
      .setScrollFactor(0)
      .setVisible(false);
    this.restartGame = this.add
      .image(620, 550, "restart")
      .setScale(0.2)
      .setScrollFactor(0)
      .setVisible(false);
    this.menuGame = this.add
      .image(620, 600, "menu")
      .setScale(0.2)
      .setScrollFactor(0)
      .setVisible(false);
    this.menuGame.setInteractive();
    this.restartGame.setInteractive();
    this.menuGame.on("pointerup", () => {
      this.scene.start("input-scene");
      score = 0;
      tries = 1;
    });
    this.restartGame.on("pointerup", () => {
      this.scene.start("video-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
      score = 0;
      tries = 1;
    });
  }
  update() {
    totalTimeSpent += 0.015;
  }
}
