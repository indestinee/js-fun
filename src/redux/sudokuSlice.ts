import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deepCopy} from '../features/sudoku/utils/sudoku';


export interface SudokuSquareState {
  index: number,
  value: number,
  draft: boolean[],
}

interface SudokuState {
  squares: SudokuSquareState[],
  selected: number,
  count: number[],
  answer: number[]
  errored: boolean,
  mistakes: number,
  squareHistory: SudokuSquareState[][],
}

export interface UpdateCountParam {
  index: number,
  value: number,
}

export interface ClearDraftParam {
  indices: number[],
  value: number,
}

const initSquares = [...Array(81)].map((_, index:number) => ({
  index,
  value: -1,
  draft: [...Array(9)].map(() => false),
}));

const initialState: SudokuState = {
  squares: deepCopy(initSquares),
  selected: -1,
  count: [...Array(9)].map(() => 0),
  answer: [...Array(81)].map(() => 1),
  errored: false,
  mistakes: 0,
  squareHistory: [deepCopy(initSquares)],
};

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setSquare: (state, action: PayloadAction<SudokuSquareState>) => {
      // state.squareHistory.push(deepCopy([...state.squares]));
      state.squares[action.payload.index] = action.payload;
    },
    setSelected: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    setErrored: (state, action: PayloadAction<boolean>) => {
      if (!state.errored) {
        state.mistakes += 1;
      }
      state.errored = action.payload;
    },
    clearDraft: (state, action: PayloadAction<ClearDraftParam>) => {
      action.payload.indices.map((index) =>
        state.squares[index].draft[action.payload.value] = false);
    },
    setCount: (state, action: PayloadAction<UpdateCountParam>) => {
      state.count[action.payload.index] = state.count[action.payload.value];
    },
    deltaCount: (state, action: PayloadAction<UpdateCountParam>) => {
      state.count[action.payload.index] += action.payload.value;
    },
    revert: (state) => {
      console.log('state', state);
      state.squares = deepCopy(state.squareHistory[-1]);
      state.errored = false;
      if (state.squareHistory.length > 1) {
        state.squareHistory.pop();
      }
    },
  },
});

export const {
  setSquare,
  setSelected,
  setCount,
  deltaCount,
  clearDraft,
  setErrored,
  revert,
} = sudokuSlice.actions;
export default sudokuSlice.reducer;
