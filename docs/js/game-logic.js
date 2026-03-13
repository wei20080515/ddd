import { TOTAL_SHOTS, GRAVITY, DAMPING, BALL_RADIUS } from './physics.js';

// ─── GameSession ─────────────────────────────────────────────────────────────
export class GameSession {
  constructor() {
    this.score = 0;
    this.totalShots = TOTAL_SHOTS;
    this.shotsUsed = 0;
    this.hits = 0;
    this.isOver = false;
  }

  get shotsLeft() {
    return this.totalShots - this.shotsUsed;
  }

  get hitRate() {
    if (this.totalShots === 0) return 0;
    return (this.hits / this.totalShots) * 100;
  }

  recordShot(isHit) {
    if (this.isOver) return;
    this.shotsUsed++;
    if (isHit) {
      this.hits++;
      this.score++;
    }
    if (this.shotsUsed >= this.totalShots) {
      this.isOver = true;
    }
  }

  reset() {
    this.score = 0;
    this.shotsUsed = 0;
    this.hits = 0;
    this.isOver = false;
  }
}

// ─── Ball ─────────────────────────────────────────────────────────────────────
export class Ball {
  constructor(startX, startY) {
    this.radius = BALL_RADIUS;
    this._startX = startX;
    this._startY = startY;
    this.reset();
  }

  reset() {
    this.x = this._startX;
    this.y = this._startY;
    this.vx = 0;
    this.vy = 0;
    this.isFlying = false;
    this._prevY = this.y;
  }

  shoot(vx, vy) {
    if (this.isFlying) return;
    this.vx = vx;
    this.vy = vy;
    this.isFlying = true;
    this._prevY = this.y;
  }

  update() {
    if (!this.isFlying) return;
    this._prevY = this.y;
    this.vx *= DAMPING;
    this.vy = this.vy * DAMPING + GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
  }

  isOutOfBounds(canvasHeight) {
    return this.y > canvasHeight + this.radius;
  }

  /** True if ball crossed the hoop plane from above this frame. */
  crossedFromAbove(hoopY) {
    return this._prevY <= hoopY && this.y > hoopY;
  }
}
