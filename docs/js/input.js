import { VELOCITY_MULTIPLIER } from './physics.js';

/**
 * InputState tracks the current pointer drag operation.
 */
export class InputState {
  constructor() {
    this.isAiming = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
  }

  reset() {
    this.isAiming = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
  }
}

/**
 * Attach unified pointer event listeners to the canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {InputState} state
 * @param {{ onShoot: (vx: number, vy: number) => void, canShoot: () => boolean }} callbacks
 */
export function attachInputHandlers(canvas, state, { onShoot, canShoot }) {
  function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX
      : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY
      : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (!canShoot()) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    state.isAiming = true;
    state.startX = pos.x;
    state.startY = pos.y;
    state.currentX = pos.x;
    state.currentY = pos.y;
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!state.isAiming) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    state.currentX = pos.x;
    state.currentY = pos.y;
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!state.isAiming) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    state.currentX = pos.x;
    state.currentY = pos.y;
    state.isAiming = false;
    const vx = (state.currentX - state.startX) * VELOCITY_MULTIPLIER;
    const vy = -(state.currentY - state.startY) * VELOCITY_MULTIPLIER;
    state.reset();
    onShoot(vx, vy);
  });
}
