class Line {
  constructor(
    { ctx = document.getElementById("canvas").getContext("2d"),
      x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      color = "rgb(0, 0, 0)",
      lineWidth = ctx.lineWidth,
      type = "unknown" || "mirror" || "wall"
    }) {
    this.ctx = ctx;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.lineWidth = lineWidth;
    this.type = type;
  }

  setLine(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  getIntersection(x1, y1, x2, y2) {
    const sx1 = this.x2 - this.x1;
    const sy1 = this.y2 - this.y1;
    const sx2 = x2 - x1;
    const sy2 = y2 - y1;
    const s = (-sy1 * (this.x1 - x1) + sx1 * (this.y1 - y1)) / (-sx2 * sy1 + sx1 * sy2);
    const t = (sx2 * (this.y1 - y1) - sy2 * (this.x1 - x1)) / (-sx2 * sy1 + sx1 * sy2);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      return {
        x: this.x1 + (t * sx1),
        y: this.y1 + (t * sy1)
      };
    }
    return null; // no intersection found
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.stroke();
    this.ctx.restore();
  }
}