import Phaser from "phaser";

export default class VideoScene extends Phaser.Scene {
  constructor() {
    super("video-scene");
  }

  init(data) {
    this.playerName = data.playerName;
    this.characterColor = data.characterColor;
  }

  preload() {
    this.add.text(250, 300, "Loading video ...", {
      font: "32px Arial",
      color: "#ff0044",
    });
    this.load.video("vid", "assets/video.mp4");
  }

  create() {
    const video = this.add.video(640, 360, "vid");
    video.play();

    this.duration = video.getDuration();
    this.progress = video.getCurrentTime();

    const continueButton = this.add.text(980, 50, "PLAY GAME", {
      font: "bold 32px Arial",
      fill: "#fff",
    });
    continueButton.setInteractive();

    continueButton.on("pointerup", () => {
      this.scene.start("level-one-scene", {
        playerName: this.playerName,
        characterColor: this.characterColor,
      });
    });
  }

  update() {}
}
