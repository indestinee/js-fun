import {useEffect, useState} from 'react';
import {Constants} from '../../../common/constants';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {
  clearDraft,
  deltaCount,
  setSquare,
} from '../../../redux/sudokuSlice';
import {getRelatedSquares} from '../utils/sudoku';
import './index.css';

interface ChoiceSquareParam {
  value: number,
  isDraft: boolean,
};

export const ChoiceSquare = ({value, isDraft}: ChoiceSquareParam) => {
  const [onTouch, setOnTouch] = useState(false);
  const [alert, setAlert] = useState(false);

  const count = useAppSelector((state: RootState) =>
    state.sudoku.gameState.count[value],
  );

  const {selected, squares, errored} = useAppSelector(
    (state: RootState) => state.sudoku.gameState);
  const dispatch = useAppDispatch();

  const isInvalid = () => {
    return getRelatedSquares(selected).some(
      (index) => squares[index].value == value);
  };

  const fillNumber = () => {
    if (errored || selected == Constants.empty ||
      count == 9 || squares[selected].value != Constants.empty) {
      return;
    }

    const invalid = isInvalid();
    if (invalid) {
      setAlert(true);
      setTimeout(() => setAlert(false), 1000);
      return;
    }

    if (isDraft) {
      console.log(`add draft ${selected} to ${value}`);
      const draft = [...squares[selected].draft];
      draft[value] = !draft[value];
      dispatch(setSquare({
        index: selected,
        value: Constants.empty,
        draft,
      }));
      return;
    }

    dispatch(clearDraft({indices: getRelatedSquares(selected), value}));
    dispatch(deltaCount({index: value, value: 1}));
    dispatch(setSquare({
      index: selected,
      value,
      draft: [...Array(9)].map(() => false),
    }));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!isDraft && e.key === String(value+1)) {
      fillNumber();
    }
    const draft = [...squares[selected].draft];
    if (isDraft && e.key == '?' && !draft[value]) {
      fillNumber();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [value, isDraft, fillNumber, onkeydown]);


  return (
    <div
      className={[
        'choice-square',
        alert ? 'choice-square-alert' : [
          isDraft ? 'choice-square-draft': '',
          onTouch ? 'choice-square-ontouch' : '',
          count == 9 ? 'choice-square-disabled' : '',
        ].filter((s) => !!s).join(' '),
      ].filter((s) => !!s).join(' ')}
      onClick={fillNumber}
      onMouseOver={() => setOnTouch(true)}
      onMouseLeave={() => setOnTouch(false)}
    >
      {value + 1}
    </div>
  );
};
