"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Line = /*#__PURE__*/function () {
  function Line(_ref) {
    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? document.getElementById("canvas").getContext("2d") : _ref$ctx,
        _ref$x = _ref.x1,
        x1 = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y1,
        y1 = _ref$y === void 0 ? 0 : _ref$y,
        _ref$x2 = _ref.x2,
        x2 = _ref$x2 === void 0 ? 0 : _ref$x2,
        _ref$y2 = _ref.y2,
        y2 = _ref$y2 === void 0 ? 0 : _ref$y2,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? "rgb(0, 0, 0)" : _ref$color,
        _ref$lineWidth = _ref.lineWidth,
        lineWidth = _ref$lineWidth === void 0 ? ctx.lineWidth : _ref$lineWidth,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? "unknown" || "mirror" || "wall" : _ref$type;

    _classCallCheck(this, Line);

    this.ctx = ctx;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.lineWidth = lineWidth;
    this.type = type;
  }

  _createClass(Line, [{
    key: "setLine",
    value: function setLine(x1, y1, x2, y2) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
  }, {
    key: "getIntersection",
    value: function getIntersection(x1, y1, x2, y2) {
      var sx1 = this.x2 - this.x1;
      var sy1 = this.y2 - this.y1;
      var sx2 = x2 - x1;
      var sy2 = y2 - y1;
      var s = (-sy1 * (this.x1 - x1) + sx1 * (this.y1 - y1)) / (-sx2 * sy1 + sx1 * sy2);
      var t = (sx2 * (this.y1 - y1) - sy2 * (this.x1 - x1)) / (-sx2 * sy1 + sx1 * sy2);

      if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return {
          x: this.x1 + t * sx1,
          y: this.y1 + t * sy1
        };
      }

      return null; // no intersection found
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(this.x1, this.y1);
      this.ctx.lineTo(this.x2, this.y2);
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }]);

  return Line;
}();