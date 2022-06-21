import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {deltaCount, setSquare} from '../../../redux/sudokuSlice';
import './index.css';

interface ChoiceSquareParam {
  value: number,
  isDraft: boolean,
};

export const ChoiceSquare = ({value, isDraft}: ChoiceSquareParam) => {
  const [onTouch, setOnTouch] = useState(false);
  const count = useAppSelector((state: RootState) =>
    state.sudoku.count[value],
  );

  const selected = useAppSelector((state: RootState) => state.sudoku.selected);
  const squares = useAppSelector((state: RootState) => state.sudoku.squares);
  const dispatch = useAppDispatch();

  const selectSquare = () => {
    if (selected == -1 || count == 9 || squares[selected].value != -1) {
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
    dispatch(deltaCount({
      index: value,
      value: 1,
    }));
  };

  return (
    <div
      className={[
        'choice-square',
        isDraft ? 'choice-square-draft': '',
        onTouch ? 'choice-square-ontouch' : '',
        count == 9 ? 'choice-square-disabled' : '',
      ].filter((s) => !!s).join(' ')}
      onClick={selectSquare}
      onMouseOver={() => setOnTouch(true)}
      onMouseLeave={() => setOnTouch(false)}
    >
      {value+1}
    </div>
  );
};
