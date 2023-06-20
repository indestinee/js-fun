import {useState} from 'react';

export interface BallParam {
  x: number,
  y: number,
  ratio: number,
}

export const Ball = (ballParam: BallParam) => {
  const [x, setX] = useState(ballParam.x);
  const [y, setY] = useState(ballParam.y);
  const [ax, setAx] = useState(0);
  const [ay, setAy] = useState(1);
  const ratio = ballParam.ratio;
  const mini

  return (
    <div className="ball" style={{width: ratio, height: ratio}}>

    </div>
  );
};
