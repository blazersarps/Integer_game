import Phaser from "phaser";

export default class SecondVideoScene extends Phaser.Scene {
  constructor() {
    super("second-video-scene");
  }

  init(data) {
    this.playerName = data.playerName;
    this.characterColor = data.characterColor;
  }

  preload() {
    this.add.text(250, 300, "Loading video ...", {
      font: "32px Arial",
      color: "#fff",
    });
    this.load.video("secondvid", "assets/video2.mp4");
  }

  create() {
    const video = this.add.video(640, 360, "secondvid");
    video.play();

    const continueButton = this.add.text(980, 50, "PLAY GAME", {
      font: "bold 32px Arial",
      color: "#fff",
    });
    continueButton.setInteractive();

    continueButton.on("pointerup", () => {
      this.scene.start("level-three-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
    });
  }

  update() {}
}
