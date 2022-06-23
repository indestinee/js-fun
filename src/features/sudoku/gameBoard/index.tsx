import {FaUndoAlt, FaPlus} from 'react-icons/fa';
import {Spacing} from '../../../components/spacing';
import {Stack} from '../../../components/stack';
import {useAppDispatch} from '../../../redux/hooks';
import {revert} from '../../../redux/sudokuSlice';
import {ChoiceSquare} from '../choiceSquare';
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
  const dispatch = useAppDispatch();
  return (
    <div className="game-board">
      <div className='action-pad'>
        <div className='action-button' onClick={() => {
          dispatch(revert());
        }}>
          <FaUndoAlt />
        </div>
        <div className='action-button'>
          <FaPlus />
        </div>
      </div>
      <Spacing marginBottom='1rem' />
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
      <Spacing marginTop='2rem' />
      <div className='choice-pad'>
        <Stack childrens={(
          [...Array(18)].map((_, i) => (
            <ChoiceSquare key={i} value={i % 9} isDraft={i >= 9} />
          ))
        )}
        rows={2} cols={9}
        />
      </div>
      <Spacing marginTop='1rem' />
    </div>
  );
};
