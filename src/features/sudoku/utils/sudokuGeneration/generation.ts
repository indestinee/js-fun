import {fromRowId} from './action';
import {DancingLinks} from './dancingLinks';
import {SudokuAnswer} from './sudokuAnswer';

const initializeExactCover = () => {
  const dlx = new DancingLinks(9 * 9 * 9, 9 * 9 * 4);
  /*
  rows
    9 * 9 * 9 -> each square fill each digit
*/
  /*
  cols
    9 * 9 -> each row each digit
    9 * 9 -> each col each digit
    9 * 9 -> each nine-squares each digit
    9 * 9 -> whether each square fill
*/
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      for (let k = 0; k < 9; k++) {
        // put k to (i, j)
        const px = i * 9 * 9 + j * 9 + k;
        const squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        dlx.appendAscRadically(px, 0 * 9 * 9 + i * 9 + k);
        dlx.appendAscRadically(px, 1 * 9 * 9 + j * 9 + k);
        dlx.appendAscRadically(px, 2 * 9 * 9 + squareIndex * 9 + k);
        dlx.appendAscRadically(px, 3 * 9 * 9 + i * 9 + j);
      }
    }
  }
  return dlx;
};

export const generateSudoku = (maxTries: number = 50, target: number = 50) => {
  const dlx = initializeExactCover();

  const answer = new SudokuAnswer();
  answer.randomPut(12);

  const cnt = dlx.solve(answer, 1);

  if (cnt == 0) {
    return undefined;
  }

  dlx.finalSolution.map((value) => {
    answer.executeAction(fromRowId(value));
  });

  let keep = 81;
  let step = 10;
  let curAnswer = answer;
  for (let i = 0; i < maxTries; i++) {
    const nextAnswer = curAnswer.generateNewAnswers(keep - step);
    if (dlx.solve(nextAnswer, 2) == 1) {
      keep -= step;
      curAnswer = nextAnswer;
    } else if (keep < 50) {
      // small step
      step = Math.max(step - 2, 1);
    }
    if (keep <= target) {
      break;
    }
  }
  return {
    answer,
    puzzle: curAnswer,
    keep,
  };
};
