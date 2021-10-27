const levelOne = [
  { question: ["3.5", "-18", "0.5", "0.8", "50.2"], isAnswer: ["-18"] },
  { question: ["4", "12.6", "-4.3", "63.2", "19.8"], isAnswer: ["4"] },
  { question: ["0.3", "54", "-62.5", "-12.6", "7.4"], isAnswer: ["54"] },
  { question: ["-1.6", "11.8", "1/1", "10.1", "1"], isAnswer: ["1"] },
  { question: ["56.7", "76/2", "-70", "0.76", "67.7"], isAnswer: ["-70"] },
  { question: ["4.9", "40.3", "-40.3", "40.9", "-41"], isAnswer: ["-41"] },
  { question: ["14.3", "-4/2", "-14", "41.8", "41.1"], isAnswer: ["-14"] },
  { question: ["-26.1", "-36", "36.3", "37.8", "37.1"], isAnswer: ["-36"] },
  { question: ["-4/3", "3", "0.5", "4.2", "-100.6"], isAnswer: ["3"] },
  { question: ["43.6", "82.5", "-40", "-1/5", "16.3"], isAnswer: ["-40"] },
  { question: ["2.8", "6.3", "-49.9", "50.4", "6"], isAnswer: ["6"] },
  { question: ["92.7", "1000", "85.2", "-37.8", "-101.7"], isAnswer: ["1000"] },
  { question: ["-956", "-32.1", "47.4", "-3/4", "21.9"], isAnswer: ["-956"] },
  { question: ["-52.3", "-29.7", "-50.1", "11.7", "21"], isAnswer: ["21"] },
  { question: ["-4.3", "-68.1", "4/9", "-863", "87.8"], isAnswer: ["-863"] },
  { question: ["-9.4", "85.8", "4/8", "14.5", "-200"], isAnswer: ["-200"] },
  { question: ["-43.7", "1678", "-26.9", "28.2", "-1/7"], isAnswer: ["1678"] },
  { question: ["5", "4.1", "-79.9", "68.7", "-22.9"], isAnswer: ["5"] },
  { question: ["71.6", "-88.6", "-76.9", "87.6", "33"], isAnswer: ["33"] },
  { question: ["16.1", "-90.7", "-102", "-35.1", "8/2"], isAnswer: ["-102"] },
];
const levelTwo = [
  { question: ["33", "3/2", "-4", "43", "49"], isAnswer: ["3/2"] },
  { question: ["-14.1", "61", "26", "17", "-50"], isAnswer: ["-14.1"] },
  { question: ["10", "0", "-20", "0/7", "-77"], isAnswer: ["0/7"] },
  { question: ["-18", "8/8", "18", "-188", " 108"], isAnswer: ["8/8"] },
  { question: ["-96", "96.2", "96", "-96", "960"], isAnswer: ["96.2"] },
  { question: ["47", "57", "48", "0.7", "37"], isAnswer: ["0.7"] },
  { question: ["6", "-61", "-61.3", "61", "66"], isAnswer: ["-61.3"] },
  { question: ["53", "5/3", "-500", "-60", "-53"], isAnswer: ["5/3"] },
  { question: ["16.6", "66", "-66", "60", "603"], isAnswer: ["16.6"] },
  { question: ["91", "11", "919", "90.1", "-917"], isAnswer: ["90.1"] },
  { question: ["581", "-294", "-97.3", "-246", "682"], isAnswer: ["-97.3"] },
  { question: ["356", "5/7", "342", "290", "296"], isAnswer: ["5/7"] },
  { question: ["-1/5", "-205", "-60", "-29", "-46"], isAnswer: ["-1/5"] },
  { question: ["-107.5", "93", "558", "85", "-28"], isAnswer: ["-107.5"] },
  { question: ["663", "3/2", "350", "689", "771"], isAnswer: ["3/2"] },
  { question: ["92", "70.9", "328", "755", "-232"], isAnswer: ["70.9"] },
  { question: ["-91", "596", "-3/9", "270", "18"], isAnswer: ["-3/9"] },
  { question: ["1/3", "285", "-402", "-82", "776"], isAnswer: ["1/3"] },
  { question: ["1", "-204", "-47.9", "-168", "0"], isAnswer: ["-47.9"] },
  { question: ["-276", "44", "0", "593", "35.2"], isAnswer: ["35.2"] },
];

const levelThree = [
  { question: [-641, -974, -729, 934, -728], isAnswer: ["934"] },
  { question: [530, -1077, -1213, 203, 126], isAnswer: ["530"] },
  { question: [1253, 259, 1398, -1146, 1726], isAnswer: ["1726"] },
  { question: [1661, -1385, -1109, 888, -361], isAnswer: ["1661"] },
  { question: [1106, -1137, -180, -556, 1701], isAnswer: ["1701"] },
  { question: [-78, -167, -1487, -1551, -1396], isAnswer: ["-78"] },
  { question: [-1344, -738, -1090, -826, -1741], isAnswer: ["-738"] },
  { question: [511, 931, 758, 1483, 923], isAnswer: ["1483"] },
  { question: [-1072, 1487, 386, 93, 817], isAnswer: ["1487"] },
  { question: [-9, -214, -193, 337, -899], isAnswer: ["337"] },
  { question: [-59, 10, -33, 4, -100], isAnswer: ["10"] },
  { question: [-45, -40, -46, -4, -88], isAnswer: ["-4"] },
  { question: [58, 6, 16, 8, 15], isAnswer: ["58"] },
  { question: [-2, 7, -64, -66, -19], isAnswer: ["7"] },
  { question: [-69, -54, 2, 3, -59], isAnswer: ["3"] },
  { question: [-44, -88, -78, -34, -29], isAnswer: ["-29"] },
  { question: [-50, 0, -98, -65, -34], isAnswer: ["0"] },
  { question: [18, 8, 0, 34, 56], isAnswer: ["56"] },
  { question: [-55, 5, -42, -68, -66], isAnswer: ["5"] },
  { question: [80, 12, 69, 5, 48], isAnswer: ["80"] },
];
const levelFour = [
  { question: [16, 10, -27, 20, -25], isAnswer: ["-27"] },
  { question: [-17, 23, 46, 42, 52], isAnswer: ["-17"] },
  { question: [54, 56, -38, 34, -9], isAnswer: ["-38"] },
  { question: [1, 39, 22, 57, 0], isAnswer: ["0"] },
  { question: [-8, -20, -45, 10, 37], isAnswer: ["-45"] },
  { question: [60, 23, 30, 33, 34], isAnswer: ["23"] },
  { question: [38, -34, 8, -5, 17], isAnswer: ["-34"] },
  { question: [-50, -13, -20, -32, -41], isAnswer: ["-50"] },
  { question: [44, 16, 47, 14, 35], isAnswer: ["14"] },
  { question: [-43, -46, -38, 30, 43], isAnswer: ["-46"] },
  { question: [-76, -63, -94, -84, -80], isAnswer: ["-94"] },
  { question: [-91, -79, -63, -80, -81], isAnswer: ["-91"] },
  { question: [-80, -79, -100, -82, -78], isAnswer: ["-100"] },
  { question: [-73, -90, -98, -160, -64], isAnswer: ["-160"] },
  { question: [-99, -81, -60, -94, -60], isAnswer: ["-99"] },
  { question: [76, 85, -84, -81, -75], isAnswer: ["-84"] },
  { question: [30, 22, 14, 14, 8], isAnswer: ["8"] },
  { question: [21, 11, 1, 10, 13], isAnswer: ["1"] },
  { question: [2, 24, 30, 22, 20], isAnswer: ["2"] },
  { question: [14, 8, 25, 18, 22], isAnswer: ["8"] },
];

const questionHeights = [
  2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000,
];

const one_questions = levelOne.sort(() => 0.5 - Math.random()).slice(0, 10);
const two_questions = levelTwo.sort(() => 0.5 - Math.random()).slice(0, 10);
const three_questions = levelThree.sort(() => 0.5 - Math.random()).slice(0, 10);
const four_questions = levelFour.sort(() => 0.5 - Math.random()).slice(0, 10);
export const level_one_questions = one_questions.map((item, index) => {
  item.tall = questionHeights[index];
  return item;
});
export const level_two_questions = two_questions.map((item, index) => {
  item.tall = questionHeights[index];
  return item;
});

export const level_three_questions = three_questions.map((item, index) => {
  item.tall = questionHeights[index];
  return item;
});

export const level_four_questions = four_questions.map((item, index) => {
  item.tall = questionHeights[index];
  return item;
});
