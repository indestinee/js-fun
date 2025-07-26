import {Constants} from '../../../../common/constants';
import type {SudokuAction} from './action';
import {randomInt, randomShuffle} from './utils';


export class SudokuAnswer {
  values: number[][];
  constructor() {
    this.values = [...Array(9)].map(() =>
      [...Array(9)].map(() => Constants.empty),
    );
  }

  executeAction(action: SudokuAction) {
    this.values[action.px][action.py] = action.value;
  }

  generateNewAnswers(keep: number) {
    const actions = randomShuffle(this.exportActions()).slice(0, keep);
    const answer = new SudokuAnswer();
    actions.forEach((action) => answer.executeAction(action));
    return answer;
  }

  exportActions() {
    const actions: SudokuAction[] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.values[i][j] != Constants.empty) {
          actions.push({px: i, py: j, value: this.values[i][j]});
        }
      }
    }
    return actions;
  }

  dumpInline() {
    const result: number[] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        result.push(this.values[i][j]);
      }
    }
    return result;
  }

  display() {
    const getDiv = () => {
      let s = '+ ';
      for (let i = 0; i < 11; i++) {
        s += '- ';
      }
      return s + '+\n';
    };
    let s = '';
    for (let i = 0; i < 9; i++) {
      if (i % 3 == 0) {
        s += getDiv();
      }
      for (let j = 0; j < 9; j++) {
        if (j % 3 == 0) {
          s += '| ';
        }
        s += this.values[i][j] + 1;
        s += ' ';
      }
      s += '|\n';
    }
    s += getDiv();
    console.log(s);
  };

  randomPut(num: number) {
    const res: SudokuAction[] = [];
    [...Array(num)].forEach(() => {
      while (true) {
        const action: SudokuAction = {
          px: randomInt(0, 8),
          py: randomInt(0, 8),
          value: randomInt(0, 8),
        };
        if (this.validToExecute(action)) {
          this.executeAction(action);
          res.push(action);
          break;
        }
      }
    });
    return res;
  };

  validToExecute(action: SudokuAction) {
    if (this.values[action.px][action.py] != Constants.empty) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (this.values[i][action.py] == action.value ||
        this.values[action.px][i] == action.value) {
        return false;
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const si = action.px - action.px % 3 + i;
        const sj = action.py - action.py % 3 + j;
        if (this.values[si][sj] == action.value) {
          return false;
        }
      }
    }
    return true;
  };
}
