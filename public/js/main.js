// some references used
// https://stackoverflow.com/a/30971055/5224286
// https://stackoverflow.com/a/1968345/5224286
// https://stackoverflow.com/a/17130415/5224286
// https://stackoverflow.com/a/5526721/5224286

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const slider1 = document.getElementById("slider1");
  const slider2 = document.getElementById("slider2");
  const slider3 = document.getElementById("slider3");
  const ctx = canvas.getContext("2d");
  const scrollAmount = 1.02;

  // create box object
  const box = new Box({
    widthScale: slider1.value,
    heightScale: slider2.value,
    frontWidthScale: slider3.value
  });

  trackTransforms(ctx);
  onWindowResize();

  function draw() {
    // clear the entire canvas
    const pt1 = ctx.transformedPoint(0, 0);
    const pt2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
    ctx.fillStyle = "rgb(239, 239, 239)";
    ctx.fillRect(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);

    // draw box
    box.draw();
  }

  function onCanvasMouseMove(clientX, clientY) {
    if (box.answerMode) {
      return;
    }
    // update ray angle
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;
    const pt = ctx.transformedPoint(mouseX, mouseY);
    box.mouseX = pt.x;
    box.mouseY = pt.y;
    draw();
  }

  function onMouseScroll(event) {
    // zoom in/out
    const delta = event.wheelDelta ? event.wheelDelta / 40 : event.detail ? -event.detail : 0;
    if (delta) {
      const scaleAmount = Math.pow(scrollAmount, delta);
      const pt = ctx.transformedPoint(canvas.width / 2, canvas.height / 2);
      ctx.translate(pt.x, pt.y);
      ctx.scale(scaleAmount, scaleAmount);
      ctx.translate(-pt.x, -pt.y);
      draw();
    }
    event.preventDefault();
  }

  function onWindowResize() {
    // resize the canvas
    const pixelRatio = window.innerWidth > 700 ? 2 : 4;
    canvas.width = window.innerWidth * 0.75 * pixelRatio;
    canvas.height = canvas.width * 0.4;
    box.posX = canvas.width * 0.5;
    box.posY = canvas.height * 0.5;
    box.width = canvas.width * 0.25;
    box.height = box.width;
    box.holeWidth = box.width * 0.5;
    box.gemPosX = box.posX;
    box.gemPosY = box.posY - box.height * box.heightScale * 0.3;
    box.onlookerPosX = box.posX;
    box.onlookerPosY = box.posY + box.height * box.heightScale * 0.5 + box.sideLineWidth * 0.5 + box.onlookerOffsetY;
    box.update();
    draw();
  }

  function trackTransforms(ctx) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let xform = svg.createSVGMatrix();
    ctx.getTransform = function () { return xform; };
    const savedTransforms = [];
    const save = ctx.save;
    ctx.save = function () {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };
    const restore = ctx.restore;
    ctx.restore = function () {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };
    const scale = ctx.scale;
    ctx.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };
    const rotate = ctx.rotate;
    ctx.rotate = function (radians) {
      xform = xform.rotate(radians * 180 / Math.PI);
      return rotate.call(ctx, radians);
    };
    const translate = ctx.translate;
    ctx.translate = function (dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };
    const transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
      const m2 = svg.createSVGMatrix();
      m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };
    const setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };
    const pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
      pt.x = x; pt.y = y;
      return pt.matrixTransform(xform.inverse());
    }
  }
  canvas.addEventListener("mousemove", function (event) {
    onCanvasMouseMove(event.clientX, event.clientY);
  });

  canvas.addEventListener("touchmove", function (event) {
    onCanvasMouseMove(event.touches[0].clientX, event.touches[0].clientY);
  });

  canvas.addEventListener("mousedown", function () {
    // toggle answer mode
    box.answerMode = !box.answerMode;
    draw();
  });

  slider1.addEventListener("input", function () {
    // update width
    box.widthScale = slider1.value;
    box.update();
    draw();
  });

  slider2.addEventListener("input", function () {
    // update height
    box.heightScale = slider2.value;
    box.gemPosY = box.posY - box.height * box.heightScale * 0.3;
    box.onlookerPosY = box.posY + box.height * box.heightScale * 0.5 + box.sideLineWidth * 0.5 + box.onlookerOffsetY;
    box.update();
    draw();
  });

  slider3.addEventListener("input", function () {
    // update shape
    box.frontWidthScale = slider3.value;
    box.update();
    draw();
  });

  canvas.addEventListener("DOMMouseScroll", onMouseScroll);
  canvas.addEventListener("mousewheel", onMouseScroll);
  window.addEventListener("resize", onWindowResize);
});