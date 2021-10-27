import Phaser from "phaser";
import localforage from "localforage";
import Swal from "sweetalert2";
var person = "";
var goTo = "";
var playerData = {};
var jsonData = [];
export default class InputScene extends Phaser.Scene {
  constructor() {
    super("input-scene");
  }
  preload() {
    //Loading form from Html
    this.load.html("form", "form.html");
    this.load.image("back", "assets/back.png");
    this.load.image("title", "assets/title.png");
    this.load.image("start", "assets/start.png");
    this.load.image("quit", "assets/quit.png");
    this.load.image("how", "assets/how.png");
    this.load.bitmapFont(
      "desyrel",
      "assets/bitmap/desyrel.png",
      "assets/bitmap/desyrel.xml"
    );
    this.load.bitmapFont(
      "clarendon",
      "assets/bitmap/clarendon.png",
      "assets/bitmap/clarendon.xml"
    );
    this.load.bitmapFont(
      "iceicebaby",
      "assets/bitmap/iceicebaby.png",
      "assets/bitmap/iceicebaby.xml"
    );
  }
  create() {
    this.add.image(640, 360, "back");

    this.add.image(640, 120, "title").setScale(0.4);
    this.startButton = this.add
      .image(640, 500, "start")
      .setScale(0.2)
      .setVisible(false);
    this.howButton = this.add.image(180, 650, "how").setScale(0.15);
    this.howButton.setInteractive();

    this.quitButton = this.add.image(1100, 650, "quit").setScale(0.2);
    this.quitButton.setInteractive();
    var text = this.add
      .bitmapText(400, 200, "clarendon", "Please enter your username")
      .setScale(0.3)
      .setDropShadow(3, 3, 999, 2);
    this.dataButton = this.add.text(620, 600, `DATA`, {
      color: "red",
      fontSize: 24,
      fontStyle: "bold",
      fontFamily: "Arial",
    });
    this.dataButton.setInteractive();
    this.dataButton.on("pointerup", () => {
      localforage
        .keys()
        .then((keys) => {
          keys.map((element) => {
            localforage
              .getItem(element)
              .then(function (value) {
                jsonData = [...jsonData, value];
              })
              .catch(function (err) {
                Swal.fire({
                  position: "top",
                  text: err.message,
                  width: 500,
                });
              });
          });
        })
        .catch(function (err) {
          Swal.fire({
            position: "top",
            text: err.message,
            width: 500,
          });
        })
        .then(() => {
          function exportJson() {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(
              new Blob([JSON.stringify(jsonData, null, 2)], {
                type: "application/json",
              })
            );
            a.setAttribute("download", "data.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          exportJson();
        })
        .catch((err) => {
          Swal.fire({
            position: "top",
            text: err.message,
            width: 500,
          });
        });
    });

    //Adding Input field to Scene
    this.nameInput = this.add
      .dom(640, 500)
      .createFromCache("form")
      .setOrigin(0.5);
    this.name = this.nameInput.getChildByName("name");
    this.loginButton = this.add.text(520, 700, `LOGIN/SIGNUP`, {
      color: "#333",
      fontSize: 32,
      fontStyle: "bold",
      fontFamily: "Arial",
    });
    this.loginButton.setInteractive();
    this.loginButton.on("pointerup", () => {
      if (this.name.value != "") {
        person = this.name.value;
        this.loginButton.setVisible(false);
        this.nameInput.setVisible(false);
        this.startButton.setVisible(true);
        text.setText("Welcome " + this.name.value);
      } else {
        alert("Please Input your Username");
      }
    });

    this.startButton.setInteractive();
    this.startButton.on("pointerup", () => {
      localforage.getItem(person, function (err, value) {
        if (value === null) {
          localforage
            .setItem(person, { playerName: person })
            .then((val) => {
              goTo = "select";
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          playerData = value;
          goTo = "level";
        }
      });
    });

    this.tweens.add({
      targets: this.nameInput,
      y: 240,
      duration: 3000,
      ease: "Power3",
    });
    this.tweens.add({
      targets: this.loginButton,
      y: 350,
      duration: 3000,
      ease: "Power3",
    });
    this.howButton.on("pointerup", () => {
      this.scene.start("how-scene");
    });

    this.quitButton.on("pointerup", () => {
      this.game.destroy(true, true);
    });
  }
  update() {
    if (goTo === "select") {
      this.scene.start("select-scene", {
        playerName: person,
      });
      goTo = "";
    }
    if (goTo === "level") {
      this.scene.start("level-select-scene", {
        playerName: person,
        characterColor: playerData.color,
      });
      goTo = "";
    }
  }
}
