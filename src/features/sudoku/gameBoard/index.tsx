import {Stack} from '../../../components/stack';
import {SudokuSquare} from '../sudokuSquare';
import './index.css';

export const GameBoard = () => {
  return (
    <div className="game-board">
      <div className="nine-square">
        <Stack childrens={(
          [...Array(9)].map((_, i) => (
            <div key={i} className="nine-square">
              <Stack childrens={(
                [...Array(9)].map((_, j) => (
                  <SudokuSquare key={i * 9 + j} index={i * 9 + j} />
                ))
              )} rows={3} cols={3} />
            </div>
          ))
        )} rows={3} cols={3} />
      </div>
    </div>
  );
};
