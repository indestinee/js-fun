import {useEffect, useState} from 'react';
import {Stack} from '../../../components/stack';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {setErrored, setSelected} from '../../../redux/sudokuSlice';
import './index.css';

enum SquareStatus {
  NORMAL = 'normal',
  AFFECTED = 'affected',
  SELECTED = 'selected',
  SAME_VALUE = 'same-value',
  ERROR = 'error',
}

const DraftSquare = ({value}: {value: number}) => {
  const selectedSquare = useAppSelector(
    (state: RootState) => (state.sudoku.selected != -1 ?
      state.sudoku.squares[state.sudoku.selected] : undefined));

  return (
    <div className={
      `draft-square${
        (selectedSquare?.value != -1 && selectedSquare?.value == value) ?
          '-affected': ''}`}>
      {(value == -1) ? '' : (value + 1)}
    </div>
  );
};

export const SudokuSquare = ({index}: {index: number}) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(SquareStatus.NORMAL);

  const {selected, errored} = useAppSelector(
    (state: RootState) => state.sudoku);
  const answer = useAppSelector(
    (state: RootState) => state.sudoku.answer[index]);
  const square = useAppSelector(
    (state: RootState) => state.sudoku.squares[index]);
  const selectedSquare = useAppSelector(
    (state: RootState) => state.sudoku.squares[state.sudoku.selected]);

  const selectSquare = () => {
    if (errored) {
      return;
    }
    dispatch(setSelected(index));
  };

  useEffect(() => {
    if (square.value != -1 && answer != -1 && square.value != answer) {
      setStatus(SquareStatus.ERROR);
      dispatch(setErrored(true));
      return;
    }
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
    if (selectedSquare.value != -1 &&
      selectedSquare.value == square.value) {
      setStatus(SquareStatus.SAME_VALUE);
      return;
    }
    setStatus(SquareStatus.NORMAL);
  }, [selected, selectedSquare, square]);


  return (
    <div
      className={`sudoku-square ${status}-square`}
      onClick={selectSquare}>
      {(square.value != -1) ? square.value + 1 :
        <Stack childrens={
          [...square.draft].map((val, i) => (
            <DraftSquare key={i} value={val ? i : -1} />
          ))
        } rows={3} cols={3} />
      }
    </div>
  );
};
