class Helicopter {
  constructor(ctx) {
    this.ctx = ctx;
    this.tick = 0;

    this.x = 100;
    this.y = 0;

    this.w = 100;
    this.h = 40;

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ay = 0;
    this.ax = 0;
    this.g = 0.1;

    this.img = new Image();
    this.img.src =
      "https://2.bp.blogspot.com/-P6ZbLE-rnFM/WPTQh65UtMI/AAAAAAAABF8/9iYl-cIUEtIhj2JDTixyqZNeBn183AdmQCLcB/s1600/helicopter-spritesheet.png";
    this.img.frames = 4;
    this.img.frameIndex = 0;

    this.weapon = new Weapon(this);
  }

  draw() {
    this.ctx.drawImage(
      this.img, 0,
      (this.img.frameIndex / this.img.frames) * this.img.height,
      this.img.width,
      (1 / this.img.frames) * this.img.height,
      
      this.x,
      this.y,
      this.w,
      this.h);

      this.tick++;

    if (this.tick > 10) {
      this.tick = 0;

      this.img.frameIndex++;
      if (this.img.frameIndex > 3) {
        this.img.frameIndex = 0;
      }
    }

  }

  isFloor() {
    return this.y + this.h >= this.ctx.canvas.height;
  }

  move() {
    this.vy += this.g;  // Apply gravity
    this.y += this.vy;  // Update position

    // Limites del helicoptero
    if (this.y < 0) {
      this.y = 0;  // No pasar de arriba
    }
    if (this.y + this.h > this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.h;  // no pasar del suelo
    }
  }

  onKeyDown(keyCode) {
    switch (keyCode) { 
      case KEY_UP:
        this.vy = -5;  
        break;
      case KEY_DOWN:
        this.vy = 5;  
        break;
      case KEY_SPACE:
        this.fire();
        break;
      }
    }

    onKeyUp(keyCode) {
      switch (keyCode) {
        case KEY_UP:
        case KEY_DOWN:
          this.vy = 0;  
          break;
       }
    }
}
