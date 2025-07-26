import {useEffect, useState} from 'react';
import {FaUndoAlt, FaPlus, FaRegDizzy, FaRegSmileWink} from 'react-icons/fa';
import {Constants} from '../../../common/constants';
import {Stack} from '../../../components/stack';
import {Text} from '../../../components/text';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {revert, newGame} from '../../../redux/sudokuSlice';
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

  useEffect(() => createNewGame(difficulty, maxTries), []);

  const createNewGame = (difficulty: number, maxTries: number) => {
    dispatch(newGame({target: difficulty, maxTries}));
  };

  const {mistakes} = useAppSelector((state: RootState) => state.sudoku);
  const currentDifficulty = useAppSelector(
    (state: RootState) => state.sudoku?.gameState.difficulty);
  const [difficulty, setDifficulty] = useState(Constants.defaultDifficulty);
  const [maxTries, setMaxTries] = useState(Constants.defaultMaxTries);

  return (
    <div className="game-board">
      <div className='action-pad'>
        <div className='action-button'
          onClick={() => createNewGame(difficulty, maxTries)}>
          <FaPlus />
        </div>
        <div className='action-button' onClick={() => dispatch(revert())}>
          <FaUndoAlt />
        </div>
        <div className={`${mistakes > 0 ? 'mistakes' : 'normal'}`}>
          Mistake: {mistakes}
        </div>
        <div className={`${mistakes > 0 ? 'mistakes' : 'normal'}`}>
          {mistakes > 0 ? <FaRegDizzy /> : <FaRegSmileWink /> }
        </div>
      </div>
      <div className='action-pad normal'>
        <Text>Difficulty Current: {currentDifficulty}</Text>
        <Text>Target:
          <input className='input-pad'
            value={difficulty}
            onChange={(event) => {
              const val = parseInt(event.target.value);
              setDifficulty(Number.isNaN(val) ? 0 : val);
            }}
          />
        </Text>
        <Text>Max Tries:
          <input className='input-pad'
            value={maxTries}
            onChange={(event) => {
              const val = parseInt(event.target.value);
              setMaxTries(Number.isNaN(val) ? 0 : val);
            }}
          />
        </Text>
      </div>
      <div className='board'>
        <div className="nine-square">
          <Stack childrens={(
            [...Array(9)].map((_, i) => (
              <div key={i} className="nine-square">
                <Stack childrens={(
                  [...Array(9)].map((_, j) => (
                    <SudokuSquare
                      key={calculate(i, j)}
                      index={calculate(i, j)}
                    />
                  ))
                )} rows={3} cols={3} />
              </div>
            ))
          )} rows={3} cols={3} />
        </div>
      </div>
      <div className='choice-pad'>
        <Stack childrens={(
          [...Array(18)].map((_, i) => (
            <ChoiceSquare key={i} value={i % 9} isDraft={i >= 9} />
          ))
        )}
        rows={2} cols={9}
        />
      </div>
    </div>
  );
};
