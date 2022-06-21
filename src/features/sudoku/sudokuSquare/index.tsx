import './index.css';

export const SudokuSquare = ({index}: {index: number}) => {
  return (
    <div className="square">
      {index}
    </div>
  );
};
