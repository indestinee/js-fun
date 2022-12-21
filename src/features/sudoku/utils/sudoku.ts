export const unique = (values: number[]) => {
  return [...new Set(values)];
};

export const getRelatedSquares = (index: number) => {
  return unique(
    [...Array(9)].map((_, i) => index % 9 + i * 9).concat(
      [...Array(9)].map((_, i) => index - index % 9 + i)).concat(
      [...Array(3)].flatMap((_, i) =>
        [...Array(3)].map((_, j) =>
          index - index % 27 + (index % 9 - index % 9 % 3) + i * 9 + j))))
    .filter((val) => val != index);
};

export const deepCopy = (any: any) => {
  return JSON.parse(JSON.stringify(any));
};

