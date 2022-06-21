import {useEffect, useState} from 'react';
import {Stack} from '../../../components/stack';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {setSelected} from '../../../redux/sudokuSlice';
import './index.css';

enum SquareStatus {
  NORMAL = 'normal',
  AFFECTED = 'affected',
  SELECTED = 'selected',
}

const DraftSquare = ({value}: {value: number}) => {
  return (
    <div className='draft-square'>
      {(value == -1) ? '' : (value + 1)}
    </div>
  );
};

export const SudokuSquare = ({index}: {index: number}) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state: RootState) => state.sudoku.selected);
  const [status, setStatus] = useState(SquareStatus.NORMAL);
  const [value, setValue] = useState<number>(-1);

  const square = useAppSelector(
    (state: RootState) => state.sudoku.squares[index]);

  const selectSquare = () => {
    console.log('select:', index);
    dispatch(setSelected(index));
  };

  useEffect(() => {
    if (selected == -1) {
      setStatus(SquareStatus.NORMAL);
      return;
    }
    if (selected == index) {
      setStatus(SquareStatus.SELECTED);
      return;
    }
    if (selected % 9 == index % 9 ||
      Math.floor(selected / 9) == Math.floor(index / 9)) {
      setStatus(SquareStatus.AFFECTED);
      return;
    }
    setStatus(SquareStatus.NORMAL);
  }, [selected]);

  useEffect(() => {
    if (square && square.value != -1) {
      setValue(square.value);
    } else {
      setValue(-1);
    }
  }, [square]);

  return (
    <div className={`sudoku-square ${status}-square`} onClick={selectSquare}>
      {(value != -1) ? value + 1 :
        <Stack childrens={
          [...square.draft].map((val, i) => (
            <DraftSquare key={i} value={val ? i : -1} />
          ))
        } rows={3} cols={3} />
      }
    </div>
  );
};
