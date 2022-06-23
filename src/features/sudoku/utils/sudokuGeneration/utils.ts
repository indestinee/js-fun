export const randomInt = (low: number, high: number) => {
  return Math.min(Math.floor(Math.random() * (high - low + 1)) + low, high);
};

export const randomShuffle = (arr: any[]) => {
  return arr
    .map((val) => ({val, rnd: Math.random()}))
    .sort(
      (a: { val: any; rnd: number; },
        b: { val: any; rnd: number; }) =>
        a.rnd - b.rnd).map((a) => a.val);
};
