class Box {
  constructor(
    { canvas = document.getElementById("canvas"),
      posX = canvas.width * 0.5,
      posY = canvas.height * 0.5,
      width = canvas.width * 0.25,
      height = width,
      holeWidth = width * 0.5,
      widthScale = 1,
      heightScale = 1,
      frontWidthScale = 1,
      mirrorColor = "rgb(65, 111, 230)",
      wallColor = "rgb(83, 83, 83)",
      sideLineWidth = 16,
      gemSrc = "../images/gem.png",
      gemPosX = posX,
      gemPosY = posY - height * heightScale * 0.3,
      gemWidth = 164 * 0.4,
      gemHeight = 132 * 0.4,
      reflectedGemOpacity = 0.5,
      onlookerOffsetY = 32,
      onlookerSrc = "../images/onlooker.png",
      onlookerPosX = posX,
      onlookerPosY = posY + height * heightScale * 0.5 + sideLineWidth * 0.5 + onlookerOffsetY,
      onlookerWidth = 256 * 0.4,
      onlookerHeight = 136 * 0.4,
      rayLineWidth = 4,
      rayColor = "rgb(208, 90, 69)",
      answerMode = false
    }) {
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
    this.answerMode = answerMode;

    // sides
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
    this.sides = [
      this.gemWall,
      this.leftMirror,
      this.rightMirror,
      this.backWall,
      this.frontWallLeft,
      this.frontWallRight,
      this.doorwayLeft,
      this.doorwayRight,
      this.onlookerWallHor,
      this.onlookerWallVer,
      this.canvasBottom
    ];

    // gem
    this.gem = new Img({
      src: this.gemSrc,
      width: this.gemWidth,
      height: this.gemHeight
    });

    // reflected gem
    this.reflectedGem = new Img({
      src: this.gemSrc,
      width: this.gemWidth,
      height: this.gemHeight,
      opacity: this.reflectedGemOpacity
    });

    // onlooker
    this.onlooker = new Img({
      src: this.onlookerSrc,
      width: this.onlookerWidth,
      height: this.onlookerHeight
    });

    // mouse
    this.mouseX = 0;
    this.mouseY = 0;
  }

  update() {
    // box
    const boxWidth = this.width * this.widthScale;
    const boxHeight = this.height * this.heightScale;

    // top
    const topY = this.posY - boxHeight * 0.5;
    const topLeftX = this.posX - boxWidth * 0.5;
    const topLeftY = topY;
    const topRightX = this.posX + boxWidth * 0.5;
    const topRightY = topY;

    // bottom
    const bottomY = this.posY + boxHeight * 0.5
    const frontWidth = boxWidth * this.frontWidthScale;
    const bottomLeftX = this.posX - frontWidth * 0.5;
    const bottomLeftY = bottomY;
    const bottomRightX = this.posX + frontWidth * 0.5;
    const bottomRightY = bottomY;

    // hole
    const holeWidth = this.holeWidth * this.widthScale * this.frontWidthScale;
    const holeLeftX = this.posX - holeWidth * 0.5;
    const holeLeftY = bottomY;
    const holeRightX = this.posX + holeWidth * 0.5;
    const holeRightY = bottomY;

    // sides
    const sideLineWidthHalf = this.sideLineWidth * 0.5;
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
    this.canvasBottom.setLine(Number.MIN_SAFE_INTEGER, this.canvas.height, Number.MAX_SAFE_INTEGER, this.canvas.height);

    // gem
    this.gem.setPosition(this.gemPosX, this.gemPosY);
    this.reflectedGem.setPosition(this.gemPosX, this.gemPosY);

    // onlooker
    this.onlooker.setPosition(this.onlookerPosX, this.onlookerPosY);
  }

  getMaxTargetPoint(angle) {
    const maxRayLength = Number.MAX_SAFE_INTEGER;
    return {
      x: this.gem.posX + maxRayLength * Math.cos(angle),
      y: this.gem.posY + maxRayLength * Math.sin(angle)
    }
  }

  getReflectedPoint(posX, posY, intersectX, intersectY, normalX, normalY) {
    const rayX = posX - intersectX;
    const rayY = posY - intersectY;
    const dotProduct = (rayX * normalX) + (rayY * normalY);
    const dotNormalX = dotProduct * normalX;
    const dotNormalY = dotProduct * normalY;
    return {
      x: posX - (dotNormalX * 2),
      y: posY - (dotNormalY * 2)
    };
  }

  shootRay(reflectedSide, srcX, srcY, targetX, targetY) {
    for (const side of this.sides) {
      if ((reflectedSide === null && side === this.gemWall) || side === reflectedSide) {
        continue;
      }
      const intersectPoint = side.getIntersection(srcX, srcY, targetX, targetY);
      if (intersectPoint) {
        this.intersectPoints.push(intersectPoint);

        // process reflection for only mirrors
        if (side.type !== "mirror") {
          return side; // return the last intersected side
        }

        // calculate normal
        let normalY = side.x2 - side.x1;
        let normalX = side.y1 - side.y2;
        const normalLength = Math.sqrt(normalX * normalX + normalY * normalY);
        normalX = normalX / normalLength;
        normalY = normalY / normalLength;

        // reflected target point
        const reflectedTargetPoint = this.getReflectedPoint(targetX, targetY, intersectPoint.x, intersectPoint.y, normalX, normalY);

        // reflected gem point
        const reflectedGemPoint = this.getReflectedPoint(srcX, srcY, intersectPoint.x, intersectPoint.y, normalX, normalY);
        this.reflectedGemPoints.push(reflectedGemPoint);

        // shoot the next ray
        return this.shootRay(side, reflectedGemPoint.x, reflectedGemPoint.y, reflectedTargetPoint.x, reflectedTargetPoint.y);
      }
    }
    return null;
  }

  drawLastReflectedGem(lastIntersectPoint, lastReflectedGemPoint) {
    // draw a dotted ray 
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.setLineDash([8, 8]);
    this.ctx.moveTo(lastIntersectPoint.x, lastIntersectPoint.y);
    this.ctx.lineTo(lastReflectedGemPoint.x, lastReflectedGemPoint.y);
    this.ctx.lineWidth = this.rayLineWidth;
    this.ctx.strokeStyle = this.rayColor;
    this.ctx.stroke();
    this.ctx.restore();

    // draw reflected gem 
    this.reflectedGem.setPosition(lastReflectedGemPoint.x, lastReflectedGemPoint.y);
    this.reflectedGem.draw();
  }

  drawRays(intersectPoints) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.gem.posX, this.gem.posY);
    for (const intersectPoint of intersectPoints) {
      this.ctx.lineTo(intersectPoint.x, intersectPoint.y);
    }
    this.ctx.lineWidth = this.rayLineWidth;
    this.ctx.strokeStyle = this.rayColor;
    this.ctx.stroke();
    this.ctx.restore();
  }

  draw() {
    // draw sides
    for (const side of this.sides) {
      side.draw();
    }

    if (this.answerMode) {
      const hitIntersectPoints = []; // array of intersectPoints array
      const hitReflectedGemPoints = []; // array of reflectedGemPoints array
      let hitIntersectPointsBuf = [];
      let hitReflectedGemPointsBuf = [];
      let wasHit = false;
      // calculate all angles
      for (let deg = 0; deg < 359; deg++) {
        const angle = deg * Math.PI / 180; // degree to radians

        // calculate the maximum target point from gem
        const maxTargetPoint = this.getMaxTargetPoint(angle);

        // intersect points
        this.intersectPoints = [];

        // reflected gem points
        this.reflectedGemPoints = [];

        // shoot a ray from gem to target point
        const lastSide = this.shootRay(null, this.gem.posX, this.gem.posY, maxTargetPoint.x, maxTargetPoint.y);

        // if the ray hits the onlooker through reflections
        if ((lastSide === this.onlookerWallHor || lastSide === this.onlookerWallVer) && this.reflectedGemPoints.length) {
          hitIntersectPointsBuf.push(this.intersectPoints);
          hitReflectedGemPointsBuf.push(this.reflectedGemPoints);
          if (!wasHit) {
            wasHit = true;
          }
        }
        else {
          if (wasHit) {
            const midIndex = Math.floor(hitIntersectPointsBuf.length * 0.5);
            hitIntersectPoints.push(hitIntersectPointsBuf[midIndex]);
            hitReflectedGemPoints.push(hitReflectedGemPointsBuf[midIndex]);
            hitIntersectPointsBuf = [];
            hitReflectedGemPointsBuf = [];
            wasHit = false;
          }
        }
      }
      // draw all reflected gems and rays (per hit)
      for (let i = 0; i < hitIntersectPoints.length; i++) {
        const intersectPoints = hitIntersectPoints[i];
        const reflectedGemPoints = hitReflectedGemPoints[i];
        const lastIntersectPoint = intersectPoints[intersectPoints.length - 1];
        const lastReflectedGemPoint = reflectedGemPoints[reflectedGemPoints.length - 1];
        this.drawLastReflectedGem(lastIntersectPoint, lastReflectedGemPoint);
        this.drawRays(intersectPoints);
      }
    }
    else {
      // calculate line angle between gem and mouse position
      const dx = this.mouseX - this.gem.posX;
      const dy = this.mouseY - this.gem.posY;
      const angle = Math.atan2(dy, dx);

      // calculate the maximum target point from gem
      const maxTargetPoint = this.getMaxTargetPoint(angle);

      // intersect points
      this.intersectPoints = [];

      // reflected gem points
      this.reflectedGemPoints = [];

      // shoot a ray from gem to target
      const lastSide = this.shootRay(null, this.gem.posX, this.gem.posY, maxTargetPoint.x, maxTargetPoint.y);

      // if the ray hits the onlooker through reflections
      if ((lastSide === this.onlookerWallHor || lastSide === this.onlookerWallVer) && this.reflectedGemPoints.length) {
        const lastIntersectPoint = this.intersectPoints[this.intersectPoints.length - 1];
        const lastReflectedGemPoint = this.reflectedGemPoints[this.reflectedGemPoints.length - 1];
        this.drawLastReflectedGem(lastIntersectPoint, lastReflectedGemPoint);
      }

      // draw rays
      this.drawRays(this.intersectPoints);
    }

    // draw gem
    this.gem.draw();

    // draw onlooker
    this.onlooker.draw();
  }
}