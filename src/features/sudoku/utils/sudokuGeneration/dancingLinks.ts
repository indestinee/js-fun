import {toRowId} from './action';
import {DualLink} from './dualLink';
import {randomShuffle} from './utils';
import {SudokuAnswer} from './sudokuAnswer';

export class DancingLinks {
  row: number;
  col: number;

  startLink: DualLink;
  startOfRow: DualLink[];
  startOfCol: DualLink[];
  tailOfRow: DualLink[];
  tailOfCol: DualLink[];

  tempSolution: number[] = [];
  finalSolution: number[] = [];
  satisfy = 0;
  searched = 0;
  maxStep = 1000000;

  /*
    e: elements, s: subset
    (0, 0) <-> e(0, 1) <-> e(0, 2) <-> ... e(0, cols)
      ||
    s(1, 0) <-...->
      ||
    s(2, 0) <-...->
      ...
    s(rows, 0) <-...->
  */

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;

    this.startLink = new DualLink(0, 0);
    this.tailOfRow = [this.startLink];
    this.tailOfCol = [this.startLink];
    this.startOfRow = [this.startLink];
    this.startOfCol = [this.startLink];

    let current = this.startLink;
    for (let i = 1; i <= this.row; i++) {
      const link = new DualLink(i, 0);
      this.tailOfRow.push(link);
      this.startOfRow.push(link);
      current.down = link;
      link.up = current;
      current = link;
    }

    current = this.startLink;
    for (let i = 1; i <= this.col; i++) {
      const link = new DualLink(0, i);
      this.tailOfCol.push(link);
      this.startOfCol.push(link);
      current.right = link;
      link.left = current;
      current = link;
    }
  }

  // WARING this function should be called with px, py asc
  appendAscRadically(px: number, py: number) {
    px += 1;
    py += 1;
    const link = new DualLink(px, py);

    this.tailOfRow[px].right = link;
    link.left = this.tailOfRow[px];
    this.tailOfCol[py].down = link;
    link.up = this.tailOfCol[py];

    this.tailOfRow[px] = link;
    this.tailOfCol[py] = link;

    return link;
  }

  deleteRow(px: number) {
    const deleted: DualLink[] = [];
    let cur: DualLink | undefined = this.startOfRow[px];
    while (cur) {
      deleted.push(cur);
      cur = cur.right;
    }
    return deleted;
  }

  deleteCol(py: number) {
    let deleted: DualLink[] = [];
    let cur = this.startOfCol[py].down;
    while (cur) {
      deleted = deleted.concat(this.deleteRow(cur.px));
      cur = cur.down;
    }
    return deleted;
  }

  selectRow(px: number) {
    let deleted: DualLink[] = [];
    const deletedColHeader: DualLink[] = [];
    let affected = 0;
    let cur = this.startOfRow[px].right;
    while (cur) {
      deleted = deleted.concat(this.deleteCol(cur.py));
      deletedColHeader.push(this.startOfCol[cur.py]);
      affected += 1;
      cur = cur.right;
    }
    return {deleted: deleted.concat(deletedColHeader), affected};
  }

  dfs(cur: DualLink | undefined, minTarget: number) {
    this.searched += 1;
    if (this.searched >= this.maxStep) {
      throw new Error('max step exceeded!');
    }
    if (!cur) {
      if (this.satisfy == this.col) {
        this.finalSolution = [...this.tempSolution];
        return 1;
      }
      return 0;
    }
    let p = cur?.down;
    let couldSelect: DualLink[] = [];
    while (p) {
      couldSelect.push(p);
      p = p.down;
    }
    couldSelect = randomShuffle(couldSelect);

    let cnt = 0;
    for (let i = 0; i < couldSelect.length && cnt < minTarget; i++) {
      p = couldSelect[i];
      const {deleted, affected} = this.selectRow(p.px);
      this.satisfy += affected;
      this.tempSolution.push(p.px);
      deleted.reverse().forEach((link) => link.markDelete());

      cnt += this.dfs(cur.right, minTarget);

      this.satisfy -= affected;
      this.tempSolution.pop();
      deleted.forEach((link) => link.recover());
    }
    return cnt;
  }

  solve(answer: SudokuAnswer, minTarget: number) {
    const actions = answer.exportActions();
    this.tempSolution = [];
    this.finalSolution = [];
    this.satisfy = 0;
    this.searched = 0;

    let initDeleted: DualLink[] = [];
    actions.map((action) => {
      const {deleted, affected} = this.selectRow(toRowId(action));
      this.satisfy += affected;
      initDeleted = initDeleted.concat(deleted);
    });
    initDeleted.reverse().map((link) => link.markDelete());

    const cnt = this.dfs(this.startLink.right, minTarget);

    initDeleted.map((link) => link.recover());
    return cnt;
  }
};
