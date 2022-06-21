import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface SudokuSquareState {
  index: number,
  value: number,
  draft: number[],
}

export interface SudokuUpdateParam {
  index: number,
  value: SudokuSquareState,
}

interface SudokuState {
  squares: SudokuSquareState[],
}

const initialState: SudokuState = {
  squares: Array(81).map((_, index:number) => ({
    index,
    value: 0,
    draft: [],
  })),
};

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setSquares: (state, action: PayloadAction<SudokuUpdateParam>) => {
      state.squares[action.payload.index] = action.payload.value;
    },
  },
});

export const {setSquares} = sudokuSlice.actions;
export default sudokuSlice.reducer;
