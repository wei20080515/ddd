// Physics constants
export const GRAVITY = 0.5;           // px/frame²
export const DAMPING = 0.98;          // velocity decay per frame
export const VELOCITY_MULTIPLIER = 0.15; // drag-to-velocity ratio
export const TOTAL_SHOTS = 10;
export const BALL_RADIUS = 15;

/**
 * Compute ball position after one Euler integration step.
 * @param {number} x0
 * @param {number} y0
 * @param {number} vx
 * @param {number} vy
 * @param {number} t  number of frames elapsed
 * @returns {{ x: number, y: number, vx: number, vy: number }}
 */
export function calculateTrajectory(x0, y0, vx, vy, t) {
  let x = x0, y = y0, cvx = vx, cvy = vy;
  for (let i = 0; i < t; i++) {
    cvx *= DAMPING;
    cvy = cvy * DAMPING + GRAVITY;
    x += cvx;
    y += cvy;
  }
  return { x, y, vx: cvx, vy: cvy };
}

/**
 * Determine whether the ball has entered the hoop.
 * Uses centre-distance approximation.
 * @param {{ x: number, y: number }} ballPos
 * @param {{ x: number, y: number }} hoopPos
 * @param {number} hoopRadius
 * @returns {boolean}
 */
export function isBallInHoop(ballPos, hoopPos, hoopRadius) {
  const dist = Math.hypot(ballPos.x - hoopPos.x, ballPos.y - hoopPos.y);
  return dist <= hoopRadius;
}
