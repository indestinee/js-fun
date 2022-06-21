import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface SudokuSquareState {
  index: number,
  value: number,
  draft: boolean[],
}

interface SudokuState {
  squares: SudokuSquareState[],
  selected: number,
  count: number[],
}

export interface UpdateCountParam {
  index: number,
  value: number,
}

const initialState: SudokuState = {
  squares: [...Array(81)].map((_, index:number) => ({
    index,
    value: -1,
    draft: [...Array(9)].map(() => false),
  })),
  selected: -1,
  count: [...Array(9)].map(() => 0),
};

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setSquare: (state, action: PayloadAction<SudokuSquareState>) => {
      state.squares[action.payload.index] = action.payload;
    },
    setSelected: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    setCount: (state, action: PayloadAction<UpdateCountParam>) => {
      state.count[action.payload.index] = state.count[action.payload.value];
    },
    deltaCount: (state, action: PayloadAction<UpdateCountParam>) => {
      state.count[action.payload.index] += action.payload.value;
    },
  },
});

export const {
  setSquare,
  setSelected,
  setCount,
  deltaCount,
} = sudokuSlice.actions;
export default sudokuSlice.reducer;
