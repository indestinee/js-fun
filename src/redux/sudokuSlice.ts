import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClearDraftParam,
  NewGameParam,
  SudokuSquareState,
  UpdateCountParam,
} from '../common/interfaces';
import {
  defaultState,
  initializeGame,
} from '../features/sudoku/utils/initializeGame';
import {deepCopy} from '../features/sudoku/utils/sudoku';

const initialState = defaultState();

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setSquare: (state, action: PayloadAction<SudokuSquareState>) => {
      state.gameState.squares[action.payload.index] = action.payload;
      state.gameStateHistory.push(deepCopy(state.gameState));
    },
    setSelected: (state, action: PayloadAction<number>) => {
      state.gameState.selected = action.payload;
    },
    setErrored: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.mistakes += 1;
      }
      state.gameState.errored = action.payload;
    },
    clearDraft: (state, action: PayloadAction<ClearDraftParam>) => {
      action.payload.indices.map(
        (index) => {
          state.gameState.squares[index].draft[action.payload.value] = false;
        },
      );
    },
    deltaCount: (state, action: PayloadAction<UpdateCountParam>) => {
      state.gameState.count[action.payload.index] += action.payload.value;
    },
    revert: (state) => {
      if (state.gameStateHistory.length <= 1) {
        return;
      }
      state.gameStateHistory.pop();
      state.gameState = state.gameStateHistory[state.gameStateHistory.length-1];
    },
    newGame: (state, action: PayloadAction<NewGameParam>) => {
      Object.assign(state,
        initializeGame(action.payload.maxTries, action.payload.target));
    },
  },
});

export const {
  setSquare,
  setSelected,
  deltaCount,
  clearDraft,
  setErrored,
  revert,
  newGame,
} = sudokuSlice.actions;
export default sudokuSlice.reducer;
