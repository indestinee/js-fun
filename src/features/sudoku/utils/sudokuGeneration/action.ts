export interface SudokuAction {
  px: number,
  py: number,
  value: number,
}

export const toRowId = (action: SudokuAction) => {
  // 0 is reserved
  return 1 + action.px * 9 * 9 + action.py * 9 + action.value;
};

export const fromRowId = (rowId: number) => {
  rowId -= 1;
  return {
    px: Math.floor(rowId / 81),
    py: Math.floor(rowId % 81 / 9),
    value: Math.floor(rowId % 9),
  };
};
