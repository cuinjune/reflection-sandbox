"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Box = /*#__PURE__*/function () {
  function Box(_ref) {
    var _ref$canvas = _ref.canvas,
        canvas = _ref$canvas === void 0 ? document.getElementById("canvas") : _ref$canvas,
        _ref$posX = _ref.posX,
        posX = _ref$posX === void 0 ? canvas.width * 0.5 : _ref$posX,
        _ref$posY = _ref.posY,
        posY = _ref$posY === void 0 ? canvas.height * 0.5 : _ref$posY,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? canvas.width * 0.25 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? width : _ref$height,
        _ref$holeWidth = _ref.holeWidth,
        holeWidth = _ref$holeWidth === void 0 ? width * 0.5 : _ref$holeWidth,
        _ref$widthScale = _ref.widthScale,
        widthScale = _ref$widthScale === void 0 ? 1 : _ref$widthScale,
        _ref$heightScale = _ref.heightScale,
        heightScale = _ref$heightScale === void 0 ? 1 : _ref$heightScale,
        _ref$frontWidthScale = _ref.frontWidthScale,
        frontWidthScale = _ref$frontWidthScale === void 0 ? 1 : _ref$frontWidthScale,
        _ref$mirrorColor = _ref.mirrorColor,
        mirrorColor = _ref$mirrorColor === void 0 ? "rgb(65, 111, 230)" : _ref$mirrorColor,
        _ref$wallColor = _ref.wallColor,
        wallColor = _ref$wallColor === void 0 ? "rgb(83, 83, 83)" : _ref$wallColor,
        _ref$sideLineWidth = _ref.sideLineWidth,
        sideLineWidth = _ref$sideLineWidth === void 0 ? 16 : _ref$sideLineWidth,
        _ref$gemSrc = _ref.gemSrc,
        gemSrc = _ref$gemSrc === void 0 ? "../images/gem.png" : _ref$gemSrc,
        _ref$gemPosX = _ref.gemPosX,
        gemPosX = _ref$gemPosX === void 0 ? posX : _ref$gemPosX,
        _ref$gemPosY = _ref.gemPosY,
        gemPosY = _ref$gemPosY === void 0 ? posY - height * heightScale * 0.3 : _ref$gemPosY,
        _ref$gemWidth = _ref.gemWidth,
        gemWidth = _ref$gemWidth === void 0 ? 164 * 0.4 : _ref$gemWidth,
        _ref$gemHeight = _ref.gemHeight,
        gemHeight = _ref$gemHeight === void 0 ? 132 * 0.4 : _ref$gemHeight,
        _ref$reflectedGemOpac = _ref.reflectedGemOpacity,
        reflectedGemOpacity = _ref$reflectedGemOpac === void 0 ? 0.5 : _ref$reflectedGemOpac,
        _ref$onlookerOffsetY = _ref.onlookerOffsetY,
        onlookerOffsetY = _ref$onlookerOffsetY === void 0 ? 32 : _ref$onlookerOffsetY,
        _ref$onlookerSrc = _ref.onlookerSrc,
        onlookerSrc = _ref$onlookerSrc === void 0 ? "../images/onlooker.png" : _ref$onlookerSrc,
        _ref$onlookerPosX = _ref.onlookerPosX,
        onlookerPosX = _ref$onlookerPosX === void 0 ? posX : _ref$onlookerPosX,
        _ref$onlookerPosY = _ref.onlookerPosY,
        onlookerPosY = _ref$onlookerPosY === void 0 ? posY + height * heightScale * 0.5 + sideLineWidth * 0.5 + onlookerOffsetY : _ref$onlookerPosY,
        _ref$onlookerWidth = _ref.onlookerWidth,
        onlookerWidth = _ref$onlookerWidth === void 0 ? 256 * 0.4 : _ref$onlookerWidth,
        _ref$onlookerHeight = _ref.onlookerHeight,
        onlookerHeight = _ref$onlookerHeight === void 0 ? 136 * 0.4 : _ref$onlookerHeight,
        _ref$rayLineWidth = _ref.rayLineWidth,
        rayLineWidth = _ref$rayLineWidth === void 0 ? 4 : _ref$rayLineWidth,
        _ref$rayColor = _ref.rayColor,
        rayColor = _ref$rayColor === void 0 ? "rgb(208, 90, 69)" : _ref$rayColor,
        _ref$answerMode = _ref.answerMode,
        answerMode = _ref$answerMode === void 0 ? false : _ref$answerMode;

    _classCallCheck(this, Box);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.holeWidth = holeWidth;
    this.widthScale = widthScale;
    this.heightScale = heightScale;
    this.frontWidthScale = frontWidthScale;
    this.mirrorColor = mirrorColor;
    this.wallColor = wallColor;
    this.sideLineWidth = sideLineWidth;
    this.gemSrc = gemSrc;
    this.gemPosX = gemPosX;
    this.gemPosY = gemPosY;
    this.gemWidth = gemWidth;
    this.gemHeight = gemHeight;
    this.reflectedGemOpacity = reflectedGemOpacity;
    this.onlookerOffsetY = onlookerOffsetY;
    this.onlookerSrc = onlookerSrc;
    this.onlookerPosX = onlookerPosX;
    this.onlookerPosY = onlookerPosY;
    this.onlookerWidth = onlookerWidth;
    this.onlookerHeight = onlookerHeight;
    this.rayLineWidth = rayLineWidth;
    this.rayColor = rayColor;
    this.answerMode = answerMode; // sides

    this.leftMirror = new Line({
      color: this.mirrorColor,
      lineWidth: this.sideLineWidth,
      type: "mirror"
    });
    this.rightMirror = new Line({
      color: this.mirrorColor,
      lineWidth: this.sideLineWidth,
      type: "mirror"
    });
    this.backWall = new Line({
      color: this.wallColor,
      lineWidth: this.sideLineWidth,
      type: "wall"
    });
    this.frontWallLeft = new Line({
      color: this.wallColor,
      lineWidth: this.sideLineWidth,
      type: "wall"
    });
    this.frontWallRight = new Line({
      color: this.wallColor,
      lineWidth: this.sideLineWidth,
      type: "wall"
    });
    this.doorwayLeft = new Line({
      color: this.wallColor,
      lineWidth: 1,
      type: "wall"
    });
    this.doorwayRight = new Line({
      color: this.wallColor,
      lineWidth: 1,
      type: "wall"
    });
    this.gemWall = new Line({
      color: "rgba(0, 0, 0, 0)",
      lineWidth: 1,
      type: "wall"
    });
    this.onlookerWallHor = new Line({
      color: "rgba(0, 0, 0, 0)",
      lineWidth: 1,
      type: "wall"
    });
    this.onlookerWallVer = new Line({
      color: "rgba(0, 0, 0, 0)",
      lineWidth: 1,
      type: "wall"
    });
    this.canvasBottom = new Line({
      color: "rgba(0, 0, 0, 0)",
      lineWidth: 1,
      type: "wall"
    });
    this.sides = [this.gemWall, this.leftMirror, this.rightMirror, this.backWall, this.frontWallLeft, this.frontWallRight, this.doorwayLeft, this.doorwayRight, this.onlookerWallHor, this.onlookerWallVer, this.canvasBottom]; // gem

    this.gem = new Img({
      src: this.gemSrc,
      width: this.gemWidth,
      height: this.gemHeight
    }); // reflected gem

    this.reflectedGem = new Img({
      src: this.gemSrc,
      width: this.gemWidth,
      height: this.gemHeight,
      opacity: this.reflectedGemOpacity
    }); // onlooker

    this.onlooker = new Img({
      src: this.onlookerSrc,
      width: this.onlookerWidth,
      height: this.onlookerHeight
    }); // mouse

    this.mouseX = 0;
    this.mouseY = 0;
  }

  _createClass(Box, [{
    key: "update",
    value: function update() {
      // box
      var boxWidth = this.width * this.widthScale;
      var boxHeight = this.height * this.heightScale; // top

      var topY = this.posY - boxHeight * 0.5;
      var topLeftX = this.posX - boxWidth * 0.5;
      var topLeftY = topY;
      var topRightX = this.posX + boxWidth * 0.5;
      var topRightY = topY; // bottom

      var bottomY = this.posY + boxHeight * 0.5;
      var frontWidth = boxWidth * this.frontWidthScale;
      var bottomLeftX = this.posX - frontWidth * 0.5;
      var bottomLeftY = bottomY;
      var bottomRightX = this.posX + frontWidth * 0.5;
      var bottomRightY = bottomY; // hole

      var holeWidth = this.holeWidth * this.widthScale * this.frontWidthScale;
      var holeLeftX = this.posX - holeWidth * 0.5;
      var holeLeftY = bottomY;
      var holeRightX = this.posX + holeWidth * 0.5;
      var holeRightY = bottomY; // sides

      var sideLineWidthHalf = this.sideLineWidth * 0.5;
      this.leftMirror.setLine(topLeftX, topLeftY, bottomLeftX, bottomLeftY);
      this.rightMirror.setLine(topRightX, topRightY, bottomRightX, bottomRightY);
      this.backWall.setLine(topLeftX - sideLineWidthHalf, topLeftY, topRightX + sideLineWidthHalf, topRightY);
      this.frontWallLeft.setLine(bottomLeftX - sideLineWidthHalf, bottomLeftY, holeLeftX, holeLeftY);
      this.frontWallRight.setLine(bottomRightX + sideLineWidthHalf, bottomRightY, holeRightX, holeRightY);
      this.doorwayLeft.setLine(holeLeftX, holeLeftY - sideLineWidthHalf, holeLeftX, holeLeftY + sideLineWidthHalf);
      this.doorwayRight.setLine(holeRightX, holeRightY - sideLineWidthHalf, holeRightX, holeRightY + sideLineWidthHalf);
      this.gemWall.setLine(this.gemPosX, this.gemPosY - this.gemHeight * 0.5, this.gemPosX, this.gemPosY + this.gemHeight * 0.5);
      this.onlookerWallHor.setLine(this.onlookerPosX - this.onlookerWidth * 0.5, this.onlookerPosY, this.onlookerPosX + this.onlookerWidth * 0.5, this.onlookerPosY);
      this.onlookerWallVer.setLine(this.onlookerPosX, this.onlookerPosY - this.onlookerHeight * 0.5, this.onlookerPosX, this.onlookerPosY + this.onlookerHeight * 0.5);
      this.canvasBottom.setLine(Number.MIN_SAFE_INTEGER, this.canvas.height, Number.MAX_SAFE_INTEGER, this.canvas.height); // gem

      this.gem.setPosition(this.gemPosX, this.gemPosY);
      this.reflectedGem.setPosition(this.gemPosX, this.gemPosY); // onlooker

      this.onlooker.setPosition(this.onlookerPosX, this.onlookerPosY);
    }
  }, {
    key: "getMaxTargetPoint",
    value: function getMaxTargetPoint(angle) {
      var maxRayLength = Number.MAX_SAFE_INTEGER;
      return {
        x: this.gem.posX + maxRayLength * Math.cos(angle),
        y: this.gem.posY + maxRayLength * Math.sin(angle)
      };
    }
  }, {
    key: "getReflectedPoint",
    value: function getReflectedPoint(posX, posY, intersectX, intersectY, normalX, normalY) {
      var rayX = posX - intersectX;
      var rayY = posY - intersectY;
      var dotProduct = rayX * normalX + rayY * normalY;
      var dotNormalX = dotProduct * normalX;
      var dotNormalY = dotProduct * normalY;
      return {
        x: posX - dotNormalX * 2,
        y: posY - dotNormalY * 2
      };
    }
  }, {
    key: "shootRay",
    value: function shootRay(reflectedSide, srcX, srcY, targetX, targetY) {
      var _iterator = _createForOfIteratorHelper(this.sides),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var side = _step.value;

          if (reflectedSide === null && side === this.gemWall || side === reflectedSide) {
            continue;
          }

          var intersectPoint = side.getIntersection(srcX, srcY, targetX, targetY);

          if (intersectPoint) {
            this.intersectPoints.push(intersectPoint); // process reflection for only mirrors

            if (side.type !== "mirror") {
              return side; // return the last intersected side
            } // calculate normal


            var normalY = side.x2 - side.x1;
            var normalX = side.y1 - side.y2;
            var normalLength = Math.sqrt(normalX * normalX + normalY * normalY);
            normalX = normalX / normalLength;
            normalY = normalY / normalLength; // reflected target point

            var reflectedTargetPoint = this.getReflectedPoint(targetX, targetY, intersectPoint.x, intersectPoint.y, normalX, normalY); // reflected gem point

            var reflectedGemPoint = this.getReflectedPoint(srcX, srcY, intersectPoint.x, intersectPoint.y, normalX, normalY);
            this.reflectedGemPoints.push(reflectedGemPoint); // shoot the next ray

            return this.shootRay(side, reflectedGemPoint.x, reflectedGemPoint.y, reflectedTargetPoint.x, reflectedTargetPoint.y);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
  }, {
    key: "drawLastReflectedGem",
    value: function drawLastReflectedGem(lastIntersectPoint, lastReflectedGemPoint) {
      // draw a dotted ray 
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.setLineDash([8, 8]);
      this.ctx.moveTo(lastIntersectPoint.x, lastIntersectPoint.y);
      this.ctx.lineTo(lastReflectedGemPoint.x, lastReflectedGemPoint.y);
      this.ctx.lineWidth = this.rayLineWidth;
      this.ctx.strokeStyle = this.rayColor;
      this.ctx.stroke();
      this.ctx.restore(); // draw reflected gem 

      this.reflectedGem.setPosition(lastReflectedGemPoint.x, lastReflectedGemPoint.y);
      this.reflectedGem.draw();
    }
  }, {
    key: "drawRays",
    value: function drawRays(intersectPoints) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(this.gem.posX, this.gem.posY);

      var _iterator2 = _createForOfIteratorHelper(intersectPoints),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var intersectPoint = _step2.value;
          this.ctx.lineTo(intersectPoint.x, intersectPoint.y);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.ctx.lineWidth = this.rayLineWidth;
      this.ctx.strokeStyle = this.rayColor;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }, {
    key: "draw",
    value: function draw() {
      // draw sides
      var _iterator3 = _createForOfIteratorHelper(this.sides),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var side = _step3.value;
          side.draw();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (this.answerMode) {
        var hitIntersectPoints = []; // array of intersectPoints array

        var hitReflectedGemPoints = []; // array of reflectedGemPoints array

        var hitIntersectPointsBuf = [];
        var hitReflectedGemPointsBuf = [];
        var wasHit = false; // calculate all angles

        for (var deg = 0; deg < 359; deg++) {
          var angle = deg * Math.PI / 180; // degree to radians
          // calculate the maximum target point from gem

          var maxTargetPoint = this.getMaxTargetPoint(angle); // intersect points

          this.intersectPoints = []; // reflected gem points

          this.reflectedGemPoints = []; // shoot a ray from gem to target point

          var lastSide = this.shootRay(null, this.gem.posX, this.gem.posY, maxTargetPoint.x, maxTargetPoint.y); // if the ray hits the onlooker through reflections

          if ((lastSide === this.onlookerWallHor || lastSide === this.onlookerWallVer) && this.reflectedGemPoints.length) {
            hitIntersectPointsBuf.push(this.intersectPoints);
            hitReflectedGemPointsBuf.push(this.reflectedGemPoints);

            if (!wasHit) {
              wasHit = true;
            }
          } else {
            if (wasHit) {
              var midIndex = Math.floor(hitIntersectPointsBuf.length * 0.5);
              hitIntersectPoints.push(hitIntersectPointsBuf[midIndex]);
              hitReflectedGemPoints.push(hitReflectedGemPointsBuf[midIndex]);
              hitIntersectPointsBuf = [];
              hitReflectedGemPointsBuf = [];
              wasHit = false;
            }
          }
        } // draw all reflected gems and rays (per hit)


        for (var i = 0; i < hitIntersectPoints.length; i++) {
          var intersectPoints = hitIntersectPoints[i];
          var reflectedGemPoints = hitReflectedGemPoints[i];
          var lastIntersectPoint = intersectPoints[intersectPoints.length - 1];
          var lastReflectedGemPoint = reflectedGemPoints[reflectedGemPoints.length - 1];
          this.drawLastReflectedGem(lastIntersectPoint, lastReflectedGemPoint);
          this.drawRays(intersectPoints);
        }
      } else {
        // calculate line angle between gem and mouse position
        var dx = this.mouseX - this.gem.posX;
        var dy = this.mouseY - this.gem.posY;

        var _angle = Math.atan2(dy, dx); // calculate the maximum target point from gem


        var _maxTargetPoint = this.getMaxTargetPoint(_angle); // intersect points


        this.intersectPoints = []; // reflected gem points

        this.reflectedGemPoints = []; // shoot a ray from gem to target

        var _lastSide = this.shootRay(null, this.gem.posX, this.gem.posY, _maxTargetPoint.x, _maxTargetPoint.y); // if the ray hits the onlooker through reflections


        if ((_lastSide === this.onlookerWallHor || _lastSide === this.onlookerWallVer) && this.reflectedGemPoints.length) {
          var _lastIntersectPoint = this.intersectPoints[this.intersectPoints.length - 1];
          var _lastReflectedGemPoint = this.reflectedGemPoints[this.reflectedGemPoints.length - 1];
          this.drawLastReflectedGem(_lastIntersectPoint, _lastReflectedGemPoint);
        } // draw rays


        this.drawRays(this.intersectPoints);
      } // draw gem


      this.gem.draw(); // draw onlooker

      this.onlooker.draw();
    }
  }]);

  return Box;
}();