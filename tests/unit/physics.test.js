import { describe, it, expect } from 'vitest';
import {
  GRAVITY,
  DAMPING,
  calculateTrajectory,
  isBallInHoop,
} from '../../docs/js/physics.js';

describe('Physics constants', () => {
  it('GRAVITY is 0.5', () => {
    expect(GRAVITY).toBe(0.5);
  });

  it('DAMPING is 0.98', () => {
    expect(DAMPING).toBe(0.98);
  });
});

describe('calculateTrajectory', () => {
  it('returns original position at t=0', () => {
    const result = calculateTrajectory(100, 200, 5, -10, 0);
    expect(result.x).toBeCloseTo(100);
    expect(result.y).toBeCloseTo(200);
  });

  it('applies gravity so y increases over time', () => {
    const t1 = calculateTrajectory(0, 0, 0, 0, 1);
    const t5 = calculateTrajectory(0, 0, 0, 0, 5);
    expect(t5.y).toBeGreaterThan(t1.y);
  });

  it('moves horizontally with positive vx', () => {
    const result = calculateTrajectory(0, 0, 5, 0, 3);
    expect(result.x).toBeGreaterThan(0);
  });

  it('applies DAMPING – velocity magnitude decreases each frame', () => {
    const r1 = calculateTrajectory(0, 0, 10, 0, 1);
    const r2 = calculateTrajectory(0, 0, 10, 0, 2);
    // x after 2 frames should be less than 2× x after 1 frame (because of damping)
    expect(r2.x).toBeLessThan(r1.x * 2);
  });

  it('upward initial vy causes ball to rise before falling', () => {
    const t2 = calculateTrajectory(0, 300, 0, -15, 2);
    const t50 = calculateTrajectory(0, 300, 0, -15, 50);
    expect(t2.y).toBeLessThan(300); // still rising after 2 frames
    expect(t50.y).toBeGreaterThan(300); // gravity has pulled it back down by 50 frames
  });
});

describe('isBallInHoop', () => {
  const hoop = { x: 200, y: 150 };
  const radius = 28;

  it('returns true when ball is at hoop centre', () => {
    expect(isBallInHoop({ x: 200, y: 150 }, hoop, radius)).toBe(true);
  });

  it('returns true when ball is just within radius', () => {
    expect(isBallInHoop({ x: 200 + radius - 1, y: 150 }, hoop, radius)).toBe(true);
  });

  it('returns false when ball is just outside radius', () => {
    expect(isBallInHoop({ x: 200 + radius + 1, y: 150 }, hoop, radius)).toBe(false);
  });

  it('returns false when ball is far from hoop', () => {
    expect(isBallInHoop({ x: 0, y: 0 }, hoop, radius)).toBe(false);
  });

  it('boundary: ball exactly on rim edge returns true', () => {
    expect(isBallInHoop({ x: 200 + radius, y: 150 }, hoop, radius)).toBe(true);
  });
});
