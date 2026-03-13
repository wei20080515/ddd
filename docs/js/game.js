import { isBallInHoop } from './physics.js';
import { InputState, attachInputHandlers } from './input.js';
import { drawFrame, updateScoreboard, triggerScoreFlash, drawGameOver } from './ui.js';
import { saveHighScore, loadHighScore } from './storage.js';
import { GameSession, Ball } from './game-logic.js';

// Re-export for test imports
export { GameSession, Ball };

// ─── Canvas setup ──────────────────────────────────────────────────────────
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ─── Constants ──────────────────────────────────────────────────────────────
const BALL_START_X = canvas.width * 0.5;
const BALL_START_Y = canvas.height - 60;

const HOOP_X = canvas.width * 0.65;
const HOOP_Y = canvas.height * 0.3;
const HOOP_RADIUS = 28;
const RIM_HALF = 30;

// ─── Hoop ─────────────────────────────────────────────────────────────────────
const hoop = {
  x: HOOP_X,
  y: HOOP_Y,
  radius: HOOP_RADIUS,
  rimLeft: HOOP_X - RIM_HALF,
  rimRight: HOOP_X + RIM_HALF,
};

// ─── State ────────────────────────────────────────────────────────────────────
const session = new GameSession();
const ball = new Ball(BALL_START_X, BALL_START_Y);
const inputState = new InputState();
let highScore = loadHighScore();
let showingGameOver = false;

// ─── Input ────────────────────────────────────────────────────────────────────
attachInputHandlers(canvas, inputState, {
  canShoot: () => !ball.isFlying && !session.isOver,
  onShoot: (vx, vy) => {
    ball.shoot(vx, vy);
  },
});

// ─── Game loop ────────────────────────────────────────────────────────────────
function checkHoop() {
  if (!ball.crossedFromAbove(hoop.y)) return false;
  return isBallInHoop({ x: ball.x, y: ball.y }, { x: hoop.x, y: hoop.y }, HOOP_RADIUS);
}

function handleShotEnd(isHit) {
  session.recordShot(isHit);
  ball.reset();
  updateScoreboard(session.score, session.shotsLeft);

  if (session.isOver) {
    showGameOver();
  }
}

function showGameOver() {
  showingGameOver = true;
  const isNewRecord = session.score > highScore;
  if (isNewRecord) highScore = session.score;
  saveHighScore(highScore);

  drawFrame(ctx, ball, hoop, inputState);
  drawGameOver(ctx, session, highScore, isNewRecord, replay);
}

function replay() {
  session.reset();
  ball.reset();
  showingGameOver = false;
  highScore = loadHighScore();
  updateScoreboard(session.score, session.shotsLeft);
}

function loop() {
  if (!showingGameOver) {
    if (ball.isFlying) {
      ball.update();

      if (checkHoop()) {
        triggerScoreFlash();
        handleShotEnd(true);
      } else if (ball.isOutOfBounds(canvas.height)) {
        handleShotEnd(false);
      }
    }

    drawFrame(ctx, ball, hoop, inputState);
    updateScoreboard(session.score, session.shotsLeft);
  }

  requestAnimationFrame(loop);
}

// Initialise scoreboard and start
updateScoreboard(session.score, session.shotsLeft);
requestAnimationFrame(loop);
