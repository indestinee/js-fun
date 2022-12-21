import {useEffect, useState} from 'react';
import {Constants} from '../../../common/constants';
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
    (state: RootState) => (
      state.sudoku.gameState.selected != Constants.empty ?
        state.sudoku.gameState.squares[state.sudoku.gameState.selected] :
        undefined));

  return (
    <div className={
      `draft-square${
        (selectedSquare?.value != Constants.empty &&
          selectedSquare?.value == value) ?
          '-affected': ''}`}>
      {(value == Constants.empty) ? '' : (value + 1)}
    </div>
  );
};

export const SudokuSquare = ({index}: {index: number}) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(SquareStatus.NORMAL);

  const {selected, errored} = useAppSelector(
    (state: RootState) => state.sudoku.gameState);
  const answer = useAppSelector(
    (state: RootState) => state.sudoku.answer[index]);
  const square = useAppSelector(
    (state: RootState) => state.sudoku.gameState.squares[index]);
  const selectedSquare = useAppSelector(
    (state: RootState) =>
      state.sudoku.gameState.squares[state.sudoku.gameState.selected]);

  const selectSquare = () => {
    if (errored) {
      return;
    }
    dispatch(setSelected(index));
  };

  useEffect(() => {
    if (square.value != Constants.empty &&
      answer != Constants.empty && square.value != answer) {
      setStatus(SquareStatus.ERROR);
      dispatch(setErrored(true));
      return;
    }
    if (selected == Constants.empty) {
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
    if (selectedSquare.value != Constants.empty &&
      selectedSquare.value == square.value) {
      setStatus(SquareStatus.SAME_VALUE);
      return;
    }
    setStatus(SquareStatus.NORMAL);
  }, [selected, selectedSquare, square]);


  return (
    <div
      className={`sudoku-square${square.puzzle?'-puzzle':''} ${status}-square`}
      onClick={selectSquare}>
      {(square.value != Constants.empty) ? square.value + 1 :
        <Stack childrens={
          [...square.draft].map((val, i) => (
            <DraftSquare key={i} value={val ? i : Constants.empty} />
          ))
        } rows={3} cols={3} />
      }
    </div>
  );
};
