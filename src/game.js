class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = null;
    this.tick = 0;

    this.bg = new Background(ctx);
    this.helicopter = new Helicopter(ctx);
    this.obstacles = [];

    
    // Add event listeners for keydown and keyup once
    document.addEventListener("keydown", (e) => {
      this.onKeyDown(e);
    });

    document.addEventListener("keyup", (e) => {
      this.onKeyUp(e);
    });
  }

  start() {
    
    this.interval = setInterval(() => {
      this.clear();

      this.draw();

      this.move();

      if (this.tick % 100 === 0) {
        this.addObstacle();
      }
      this.tick++;

    }, 1000 / 60);
  }
  

  addObstacle() {
    const newObstacle = new Obstacle(this.ctx);
    this.obstacles.push(newObstacle);

    this.obstacles = this.obstacles.filter((e) => e.x +e.w > 0);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.bg.draw();
    this.obstacles.forEach((e) => e.draw());
    this.helicopter.draw();
  }

  move() {
    this.bg.move();
    this.helicopter.move();
    this.obstacles.forEach(obstacle => obstacle.move());
    this.obstacles = this.obstacles.filter(obstacle => obstacle.isVisible());
  }

  onKeyDown(e) {
    this.helicopter.onKeyDown(e.keyCode);  // Pass the key code to the player's `onKeyDown` method
  }

  // Call this method when a key is released
  onKeyUp(e) {
    this.helicopter.onKeyUp(e.keyCode);  // Pass the key code to the player's `onKeyUp` method
  }
}
