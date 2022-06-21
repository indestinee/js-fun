import {Stack} from '../../../components/stack';
import {SudokuSquare} from '../sudokuSquare';
import './index.css';

const calculate = (i: number, j: number) => {
  const ii = Math.floor(i / 3);
  const ij = i % 3;
  const ji = Math.floor(j / 3);
  const jj = j % 3;
  return ii * 27 + ij * 3 + ji * 9 + jj;
};


export const GameBoard = () => {
  return (
    <div className="game-board">
      <div className="nine-square">
        <Stack childrens={(
          [...Array(9)].map((_, i) => (
            <div key={i} className="nine-square">
              <Stack childrens={(
                [...Array(9)].map((_, j) => (
                  <SudokuSquare key={calculate(i, j)} index={calculate(i, j)} />
                ))
              )} rows={3} cols={3} />
            </div>
          ))
        )} rows={3} cols={3} />
      </div>
    </div>
  );
};
