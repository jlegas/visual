let particles = [];
let lastMouseX, lastMouseY;
let movementThreshold = 5; // Movement threshold in pixels

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.startSize = random(5, 10);
    this.size = random(this.startSize, this.startSize * 2); // Adjusted size range
    this.speedX = random(-1.5, 1.5);
    this.speedY = random(-1.5, 1.5);
    this.angle = random(TWO_PI);
    this.distance = 0;
    this.changeAngleCounter = 0;
    this.changeAngleInterval = random(50, 100);
    this.spinDirection = random() < 0.5 ? -1 : 1;
    this.color = color(random(255), random(255), random(255), 204);
  }

  update() {
    this.angle += 0.05 * this.spinDirection;
    this.distance += 0.5;
    let speedMultiplier = this.size / this.startSize;
    this.x += (this.speedX + cos(this.angle) * this.distance * 0.05) * speedMultiplier;
    this.y += (this.speedY + sin(this.angle) * this.distance * 0.05) * speedMultiplier;
    this.size -= 0.05;

    this.changeAngleCounter++;
    if (this.changeAngleCounter >= this.changeAngleInterval) {
      this.angle = random(TWO_PI);
      this.changeAngleCounter = 0;
      this.changeAngleInterval = random(50, 100); // Randomize the interval
      this.spinDirection = random() < 0.5 ? -1 : 1; // Change the spin direction
    }
  }

  draw() {
    strokeWeight(2);
    stroke(this.color);
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function draw() {
  background(0);

  let mouseMovedDistance = dist(mouseX, mouseY, lastMouseX, lastMouseY);
  if (mouseMovedDistance > movementThreshold) {
    particles.push(new Particle(mouseX, mouseY));
  }

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].size <= 0.1) {
      particles.splice(i, 1);
    }
  }
}
