class Img {
  constructor(
    { ctx = document.getElementById("canvas").getContext("2d"),
      src = "",
      posX = 0,
      posY = 0,
      width = 32,
      height = 32,
      opacity = 1
    }) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.opacity = opacity;
    this.image = new Image;
    this.image.onload = () => this.draw();
    this.image.src = src;
  }

  setPosition(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.posX - this.width * 0.5, this.posY - this.height * 0.5, this.width, this.height);
    this.ctx.restore();
  }
}