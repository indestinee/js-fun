import {useState} from 'react';
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
    state.sudoku.count[value],
  );

  const {selected, squares, errored} = useAppSelector(
    (state: RootState) => state.sudoku);
  const dispatch = useAppDispatch();

  const isInvalid = () => {
    return getRelatedSquares(selected).some(
      (index) => squares[index].value == value);
  };

  const selectSquare = () => {
    if (errored ||
      selected == -1 ||
      count == 9 ||
      squares[selected].value != -1) {
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
        value: -1,
        draft,
      }));
      return;
    }

    console.log(`set ${selected} to ${value}`);
    dispatch(setSquare({
      index: selected,
      value,
      draft: [...Array(9)].map(() => false),
    }));
    dispatch(clearDraft({
      indices: getRelatedSquares(selected),
      value,
    }));
    dispatch(deltaCount({
      index: value,
      value: 1,
    }));
  };

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
      onClick={selectSquare}
      onMouseOver={() => setOnTouch(true)}
      onMouseLeave={() => setOnTouch(false)}
    >
      {value+1}
    </div>
  );
};
