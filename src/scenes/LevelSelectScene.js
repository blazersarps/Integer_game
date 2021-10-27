import Phaser from "phaser";
import localforage from "localforage";
var personData = {};
export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("level-select-scene");
  }

  init(data) {
    this.playerName = data.playerName;
    this.characterColor = data.characterColor;
  }

  preload() {
    //Loading All Assets
    this.load.image("menu", "assets/menu.png");
    this.load.image("badge1", "assets/Level 1 Badge.png");
    this.load.image("badge2", "assets/Level 2 Badge.png");
    this.load.image("badge3", "assets/Level 3 Badge.png");
    this.load.image("badge4", "assets/Level 4 Badge.png");
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
    //Adding Choose text to Scene
    this.add.text(510, 100, "LEVEL SELECT", {
      font: "bold 32px Arial ",
      color: "#fff",
    });

    this.levelOneButton = this.add.text(520, 200, "Level 1", {
      font: "bold 32px Arial ",
      color: "#fff",
    });

    this.levelTwoButton = this.add
      .text(520, 300, "Level 2", {
        font: "bold 32px Arial ",
        color: "#fff",
      })
      .setVisible(false);

    this.levelThreeButton = this.add
      .text(520, 400, "Level 3", {
        font: "bold 32px Arial ",
        color: "#fff",
      })
      .setVisible(false);

    this.levelFourButton = this.add
      .text(520, 500, "Level 4", {
        font: "bold 32px Arial ",
        color: "#fff",
      })
      .setVisible(false);

    this.levelOneButton.setInteractive();
    this.levelTwoButton.setInteractive();
    this.levelThreeButton.setInteractive();
    this.levelFourButton.setInteractive();

    this.levelOneButton.on("pointerup", () => {
      this.scene.start("video-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
    });
    this.levelTwoButton.on("pointerup", () => {
      this.scene.start("level-two-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
    });
    this.levelThreeButton.on("pointerup", () => {
      this.scene.start("second-video-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
    });
    this.levelFourButton.on("pointerup", () => {
      this.scene.start("four-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
    });
    this.badge1 = this.add
      .image(700, 220, "badge1")
      .setScale(0.2)
      .setVisible(false);
    this.badge2 = this.add
      .image(700, 320, "badge2")
      .setScale(0.2)
      .setVisible(false);
    this.badge3 = this.add
      .image(700, 420, "badge3")
      .setScale(0.2)
      .setVisible(false);
    this.badge4 = this.add
      .image(700, 520, "badge4")
      .setScale(0.2)
      .setVisible(false);

    this.menuButton = this.add.image(630, 600, "menu").setScale(0.2);
    this.menuButton.setInteractive();
    this.menuButton.on("pointerup", () => {
      this.scene.start("input-scene");
    });

    this.menuButton.on("pointerover", () => {
      this.menuButton.setScale(0.25, 0.25);
    });
    this.menuButton.on("pointerout", () => {
      this.menuButton.setScale(0.2, 0.2);
    });
  }
  update() {
    if (personData.levelOneComplete) {
      this.badge1.setVisible(true);
      this.levelTwoButton.setVisible(true);
    }
    if (personData.levelTwoComplete) {
      this.badge2.setVisible(true);
      this.levelThreeButton.setVisible(true);
    }
    if (personData.levelThreeComplete) {
      this.badge3.setVisible(true);
      this.levelFourButton.setVisible(true);
    }
    if (personData.levelFourComplete) {
      this.badge4.setVisible(true);
    }
  }
}
