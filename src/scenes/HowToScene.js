// @ts-nocheck
import Phaser from "phaser";
export default class HowToScene extends Phaser.Scene {
  constructor() {
    super("how-scene");
  }
  preload() {
    this.load.image("exit", "assets/exit.png");
  }
  create() {
    this.add.text(480, 80, "HOW TO PLAY", {
      font: "bold 36px Helvetica",
    });
    this.add.text(
      200,
      200,
      "Let’s learn how to identify and compare integers. This is a racing game with four levels. Player starts from level 1 and all other levels are unlocked as the game progresses. A player is awarded either a gold, sliver or bronze medals with a level badge after completing each level. A player with a perfect score whiles completing all the four levels will be awarded a Trophy.",
      {
        font: "bold 24px Arial",
        wordWrap: {
          width: 900,
        },
        lineSpacing: 5,
      }
    );
    this.add.text(
      200,
      400,
      "Use the mouse to select the correct answer to a question. A player has three chances to select the correct answer and after that is Game Over. A player needs a minimum of 600 points to be able to unlock the next level",
      {
        font: "bold 24px Arial",
        wordWrap: {
          width: 900,
        },
        lineSpacing: 5,
      }
    );
    this.exitButton = this.add.image(120, 100, "exit");
    this.exitButton.setInteractive();
    this.exitButton.on("pointerup", () => {
      this.scene.start("input-scene");
    });
  }
}
