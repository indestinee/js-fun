import {Constants} from '../../../common/constants';
import {GameState} from '../../../common/interfaces';
import {deepCopy} from './sudoku';
import {generateSudoku} from './sudokuGeneration/generation';

export const defaultState = () => {
  const squares = [...Array(81)]
    .map(() => -1)
    .map((value: number, index: number) => ({
      index, value,
      draft: [...Array(9)].map(() => false),
      puzzle: true,
    }));
  const count = [...Array(9)].map(() => 0);

  const initialGameState: GameState = {
    squares,
    difficulty: -1,
    selected: Constants.empty,
    count,
    errored: false,
  };

  const state = {
    gameState: initialGameState,
    gameStateHistory: [deepCopy(initialGameState)],
    answer: [...Array(81)].map(() => -1),
    mistakes: 0,
  };

  console.log('initial state:', state);
  return state;
};

export const initializeGame = (maxTries: number = 50, target: number = 20) => {
  console.log('initializing game...');
  const startTime = (new Date).getTime();
  const result = generateSudoku(maxTries, target);

  if (!result) {
    throw new Error('Generating sudoku failed!');
  }
  console.log('params done, initialize state...');

  const squares = result.puzzle.dumpInline()
    .map((value: number, index: number) => ({
      index, value,
      draft: [...Array(9)].map(() => false),
      puzzle: true,
    }));
  const count = [...Array(9)].map(() => 0);
  result.puzzle.dumpInline().forEach((val) => {
    if (val != Constants.empty) {
      count[val] += 1;
    }
  });

  const initialGameState: GameState = {
    squares,
    difficulty: result.keep,
    selected: Constants.empty,
    count,
    errored: false,
  };

  const state = {
    gameState: initialGameState,
    gameStateHistory: [deepCopy(initialGameState)],
    answer: result.answer.dumpInline(),
    mistakes: 0,
  };

  console.log('initial state:', state);
  const endTime = (new Date).getTime();
  console.log('cost time:', (endTime - startTime) / 1000);
  return state;
};
