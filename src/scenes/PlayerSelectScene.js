import Phaser from "phaser";
import localforage from "localforage";

export default class PlayerSelectScene extends Phaser.Scene {
  constructor() {
    super("select-scene");
  }
  init(data) {
    this.playerName = data.playerName;
  }

  preload() {
    //Loading All Assets
    this.load.image("blue_player", "assets/blue_player.png");
    this.load.image("white_player", "assets/white_player.png");
    this.load.image("orange_player", "assets/orange_player.png");
    this.load.image("yellow_player", "assets/yellow_player.png");
    this.load.audio("choose", ["assets/audio/choose.mp3"]);
    this.load.audio("blue_sound", ["assets/audio/blue.mp3"]);
    this.load.audio("white_sound", ["assets/audio/white.mp3"]);
    this.load.audio("yellow_sound", ["assets/audio/yellow.mp3"]);
    this.load.audio("orange_sound", ["assets/audio/orange.mp3"]);
    this.load.image("menu", "assets/menu.png");
  }

  create() {
    //Adding Choose text to Scene
    this.add.text(400, 100, "CHOOSE YOUR CHARACTER", {
      font: "bold 32px Arial ",
      color: "#fff",
    });

    this.menuButton = this.add.image(640, 600, "menu").setScale(0.2);
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

    const blue_player = this.add
      .image(180, 350, "blue_player")
      .setScale(0.5, 0.5);

    const white_player = this.add
      .image(500, 350, "white_player")
      .setScale(0.5, 0.5);
    const orange_player = this.add
      .image(800, 350, "orange_player")
      .setScale(0.5, 0.5);
    const yellow_player = this.add
      .image(1100, 350, "yellow_player")
      .setScale(0.5, 0.5);
    const ding = this.sound.add("choose", { loop: false });
    ding.play();
    const blueChoose = this.sound.add("blue_sound", { loop: false });
    const whiteChoose = this.sound.add("white_sound", { loop: false });
    const yellowChoose = this.sound.add("yellow_sound", { loop: false });
    const orangeChoose = this.sound.add("orange_sound", { loop: false });

    //Setting Pointer Activity on Characters
    blue_player.setInteractive();
    white_player.setInteractive();
    yellow_player.setInteractive();
    orange_player.setInteractive();

    //Mouse Actions when mouse is over character
    blue_player.on("pointerover", function () {
      blueChoose.play();
      blue_player.setScale(0.6, 0.6);
    });
    white_player.on("pointerover", function () {
      whiteChoose.play();
      white_player.setScale(0.6, 0.6);
    });
    yellow_player.on("pointerover", function () {
      yellowChoose.play();
      yellow_player.setScale(0.6, 0.6);
    });
    orange_player.on("pointerover", function () {
      orangeChoose.play();
      orange_player.setScale(0.6, 0.6);
    });

    //Mouse Actions when mouse leaves  character
    blue_player.on("pointerout", function () {
      blue_player.setScale(0.5, 0.5);
    });
    white_player.on("pointerout", function () {
      white_player.setScale(0.5, 0.5);
    });
    yellow_player.on("pointerout", function () {
      yellow_player.setScale(0.5, 0.5);
    });
    orange_player.on("pointerout", function () {
      orange_player.setScale(0.5, 0.5);
    });

    //Mouse Actions when mouse is clicked on character
    blue_player.on(
      "pointerup",
      function () {
        localforage
          .setItem(this.playerName, {
            playerName: this.playerName,
            color: "blue",
          })
          .then(function (value) {
            // Do other things once the value has been saved.
            console.log(value);
          })
          .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
          });
        blue_player.setScale(0.7, 0.7);
        this.scene.start("level-select-scene", {
          playerName: this.playerName,
          characterColor: "blue",
        });
      },
      this
    );
    white_player.on(
      "pointerup",
      function () {
        localforage
          .setItem(this.playerName, {
            playerName: this.playerName,
            color: "white",
          })
          .then(function (value) {
            // Do other things once the value has been saved.
            console.log(value);
          })
          .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
          });
        white_player.setScale(0.7, 0.7);
        this.scene.start("level-select-scene", {
          playerName: this.playerName,
          characterColor: "white",
        });
      },
      this
    );
    yellow_player.on(
      "pointerup",
      function () {
        localforage
          .setItem(this.playerName, {
            playerName: this.playerName,
            color: "yellow",
          })
          .then(function (value) {
            // Do other things once the value has been saved.
            console.log(value);
          })
          .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
          });
        yellow_player.setScale(0.7, 0.7);
        this.scene.start("level-select-scene", {
          playerName: this.playerName,
          characterColor: "yellow",
        });
      },
      this
    );
    orange_player.on(
      "pointerup",
      function () {
        localforage
          .setItem(this.playerName, {
            playerName: this.playerName,
            color: "orange",
          })
          .then(function (value) {
            // Do other things once the value has been saved.
            console.log(value);
          })
          .catch(function (err) {
            // This code runs if there were any errors
            console.log(err);
          });
        orange_player.setScale(0.7, 0.7);
        this.scene.start("level-select-scene", {
          playerName: this.playerName,
          characterColor: "orange",
        });
      },
      this
    );
  }
}
