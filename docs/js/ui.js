import { BALL_RADIUS } from './physics.js';

const HOOP_COLOR = '#e74c3c';
const BALL_COLOR = '#e67e22';
const AIM_COLOR = 'rgba(255,255,255,0.5)';
const FLASH_DURATION = 30; // frames (~0.5 s at 60 fps)

let flashFrames = 0;

/**
 * Draw a single animation frame.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x, y, radius, isFlying }} ball
 * @param {{ x, y, radius, rimLeft, rimRight }} hoop
 * @param {{ isAiming, startX, startY, currentX, currentY }} inputState
 */
export function drawFrame(ctx, ball, hoop, inputState) {
  const { canvas } = ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Flash overlay on score
  if (flashFrames > 0) {
    const alpha = (flashFrames / FLASH_DURATION) * 0.4;
    ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    flashFrames--;
  }

  drawHoop(ctx, hoop);

  if (inputState.isAiming) {
    drawAimLine(ctx, inputState, ball);
  }

  drawBall(ctx, ball);
}

function drawBall(ctx, ball) {
  ctx.save();
  const gradient = ctx.createRadialGradient(
    ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.1,
    ball.x, ball.y, ball.radius
  );
  gradient.addColorStop(0, '#f39c12');
  gradient.addColorStop(1, '#e67e22');
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  // Seam lines
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawHoop(ctx, hoop) {
  ctx.save();
  // Backboard
  ctx.fillStyle = '#ecf0f1';
  ctx.fillRect(hoop.x + hoop.radius + 4, hoop.y - 30, 8, 50);

  // Rim
  ctx.strokeStyle = HOOP_COLOR;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(hoop.rimLeft, hoop.y);
  ctx.lineTo(hoop.rimRight, hoop.y);
  ctx.stroke();

  // Net (simple lines)
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 1;
  const netBottom = hoop.y + 22;
  const netMid = hoop.rimLeft + (hoop.rimRight - hoop.rimLeft) / 2;
  ctx.beginPath();
  ctx.moveTo(hoop.rimLeft, hoop.y);
  ctx.lineTo(netMid, netBottom);
  ctx.moveTo(hoop.rimRight, hoop.y);
  ctx.lineTo(netMid, netBottom);
  ctx.moveTo(netMid - 8, hoop.y + 11);
  ctx.lineTo(netMid + 8, hoop.y + 11);
  ctx.stroke();
  ctx.restore();
}

function drawAimLine(ctx, inputState, ball) {
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = AIM_COLOR;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(ball.x, ball.y);
  // Mirror the drag direction
  const dx = ball.x - (inputState.currentX - inputState.startX) * 2;
  const dy = ball.y + (inputState.currentY - inputState.startY) * 2;
  ctx.lineTo(dx, dy);
  ctx.stroke();
  ctx.restore();
}

/**
 * Update the HTML scoreboard elements.
 * @param {number} score
 * @param {number} shotsLeft
 */
export function updateScoreboard(score, shotsLeft) {
  const scoreEl = document.getElementById('score-display');
  const shotsEl = document.getElementById('shots-display');
  if (scoreEl) scoreEl.textContent = `得分：${score}`;
  if (shotsEl) shotsEl.textContent = `剩餘球數：${shotsLeft}`;
}

/**
 * Trigger the score flash effect.
 */
export function triggerScoreFlash() {
  flashFrames = FLASH_DURATION;
}

/**
 * Draw the game-over overlay.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ score, totalShots, hitRate }} session
 * @param {number} highScore
 * @param {boolean} isNewRecord
 * @param {() => void} onReplay - called when replay button is clicked
 */
export function drawGameOver(ctx, session, highScore, isNewRecord, onReplay) {
  const { canvas } = ctx;
  const cx = canvas.width / 2;

  // Semi-transparent backdrop
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Box
  const bw = 320, bh = isNewRecord ? 310 : 280;
  const bx = cx - bw / 2, by = canvas.height / 2 - bh / 2;
  ctx.fillStyle = '#1a1a2e';
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 12);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let y = by + 44;
  ctx.font = 'bold 26px Segoe UI';
  ctx.fillStyle = '#ffd700';
  ctx.fillText('遊戲結束', cx, y);

  y += 48;
  ctx.font = '20px Segoe UI';
  ctx.fillStyle = '#fff';
  ctx.fillText(`得分：${session.score} / ${session.totalShots}`, cx, y);

  y += 36;
  ctx.fillText(`命中率：${session.hitRate.toFixed(0)}%`, cx, y);

  y += 36;
  ctx.fillStyle = '#87ceeb';
  ctx.fillText(`最高紀錄：${highScore}`, cx, y);

  if (isNewRecord) {
    y += 40;
    ctx.font = 'bold 22px Segoe UI';
    ctx.fillStyle = '#ffd700';
    ctx.fillText('🎉 新紀錄！', cx, y);
    y += 16;
  }

  // Draw replay button and store its rect for click detection
  const btnW = 160, btnH = 44;
  const btnX = cx - btnW / 2, btnY = by + bh - 62;
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.roundRect(btnX, btnY, btnW, btnH, 8);
  ctx.fill();
  ctx.font = 'bold 18px Segoe UI';
  ctx.fillStyle = '#fff';
  ctx.fillText('再玩一次', cx, btnY + btnH / 2);
  ctx.restore();

  // Store button rect for hit-testing
  canvas._replayBtn = { x: btnX, y: btnY, w: btnW, h: btnH };

  // Attach one-time click handler
  if (!canvas._replayHandler) {
    canvas._replayHandler = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);
      const btn = canvas._replayBtn;
      if (btn && mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h) {
        canvas.removeEventListener('click', canvas._replayHandler);
        canvas._replayHandler = null;
        canvas._replayBtn = null;
        onReplay();
      }
    };
    canvas.addEventListener('click', canvas._replayHandler);
  }
}
