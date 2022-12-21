export class DualLink {
  left?: DualLink;
  right?: DualLink;
  up?: DualLink;
  down?: DualLink;

  // matrix coordinates
  px: number;
  py: number;

  deleted = false;

  constructor(px: number, py: number) {
    this.px = px;
    this.py = py;
  }

  markDelete() {
    if (this.deleted) {
      return;
    }
    this.deleted = true;
    if (this.left) {
      this.left.right = this.right;
    }
    if (this.right) {
      this.right.left = this.left;
    }
    if (this.up) {
      this.up.down = this.down;
    }
    if (this.down) {
      this.down.up = this.up;
    }
  }

  recover() {
    if (!this.deleted) {
      return;
    }
    this.deleted = false;
    if (this.left) {
      this.left.right = this;
    }
    if (this.right) {
      this.right.left = this;
    }
    if (this.down) {
      this.down.up = this;
    }
    if (this.up) {
      this.up.down = this;
    }
  }
}
