import './index.css';

interface StackParam {
  childrens: React.ReactNode[];
  rows: number,
  cols: number,
}

export const Stack = (param: StackParam) => {
  return (
    <div className="stack-row">
      {
        [...Array(param.rows)].map((_, rowId: number) => (
          <div key={rowId} className="stack-col">
            {
              [...Array(param.cols)].map((_, colId: number) =>
                param.childrens[rowId * param.cols + colId],
              )
            }
          </div>
        ))
      }
    </div>
  );
};
