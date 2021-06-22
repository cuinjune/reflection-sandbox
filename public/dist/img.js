"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Img = /*#__PURE__*/function () {
  function Img(_ref) {
    var _this = this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? document.getElementById("canvas").getContext("2d") : _ref$ctx,
        _ref$src = _ref.src,
        src = _ref$src === void 0 ? "" : _ref$src,
        _ref$posX = _ref.posX,
        posX = _ref$posX === void 0 ? 0 : _ref$posX,
        _ref$posY = _ref.posY,
        posY = _ref$posY === void 0 ? 0 : _ref$posY,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 32 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 32 : _ref$height,
        _ref$opacity = _ref.opacity,
        opacity = _ref$opacity === void 0 ? 1 : _ref$opacity;

    _classCallCheck(this, Img);

    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.opacity = opacity;
    this.image = new Image();

    this.image.onload = function () {
      return _this.draw();
    };

    this.image.src = src;
  }

  _createClass(Img, [{
    key: "setPosition",
    value: function setPosition(posX, posY) {
      this.posX = posX;
      this.posY = posY;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.save();
      this.ctx.globalAlpha = this.opacity;
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.posX - this.width * 0.5, this.posY - this.height * 0.5, this.width, this.height);
      this.ctx.restore();
    }
  }]);

  return Img;
}();