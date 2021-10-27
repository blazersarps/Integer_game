import Phaser from "phaser";
import HowToScene from "./scenes/HowToScene";
import InputScene from "./scenes/InputScene";
import LevelFourScene from "./scenes/LevelFourScene";
import LevelOneScene from "./scenes/LevelOneScene";
import LevelSelectScene from "./scenes/LevelSelectScene";
import LevelThreeScene from "./scenes/LevelThreeScene";
import LevelTwoScene from "./scenes/LevelTwoScene";
import PlayerSelectScene from "./scenes/PlayerSelectScene";
import SecondVideoScene from "./scenes/SecondVideoScene";
import VideoScene from "./scenes/VideoScene";

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  backgroundColor: "#0091D8",
  dom: {
    createContainer: true,
  },
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "arcade",
  },
  scene: [
    InputScene,
    PlayerSelectScene,
    LevelSelectScene,
    VideoScene,
    LevelOneScene,
    LevelTwoScene,
    SecondVideoScene,
    LevelThreeScene,
    LevelFourScene,
    HowToScene,
  ],
};

export default new Phaser.Game(config);
