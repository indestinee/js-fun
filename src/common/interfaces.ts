export interface UpdateCountParam {
  index: number,
  value: number,
}

export interface NewGameParam {
  maxTries: number,
  target: number,
}

export interface ClearDraftParam {
  indices: number[],
  value: number,
}

export interface SudokuSquareState {
  index: number,
  value: number,
  draft: boolean[],
  puzzle?: boolean,
}

export interface GameState {
  squares: SudokuSquareState[],
  selected: number,
  count: number[],
  errored: boolean,
  difficulty: number,
}

export interface SudokuState {
  gameState: GameState,
  gameStateHistory: GameState[],
  mistakes: number,
  answer: number[],
}
