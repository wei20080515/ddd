import { describe, it, expect, beforeEach } from 'vitest';
import { GameSession } from '../../docs/js/game-logic.js';

describe('GameSession', () => {
  let session;

  beforeEach(() => {
    session = new GameSession();
  });

  it('starts with score 0, shotsUsed 0, isOver false', () => {
    expect(session.score).toBe(0);
    expect(session.shotsUsed).toBe(0);
    expect(session.isOver).toBe(false);
  });

  it('shotsLeft equals totalShots initially', () => {
    expect(session.shotsLeft).toBe(session.totalShots);
  });

  it('recordShot(false) increments shotsUsed but not score', () => {
    session.recordShot(false);
    expect(session.shotsUsed).toBe(1);
    expect(session.score).toBe(0);
    expect(session.hits).toBe(0);
  });

  it('recordShot(true) increments score, hits, and shotsUsed', () => {
    session.recordShot(true);
    expect(session.shotsUsed).toBe(1);
    expect(session.score).toBe(1);
    expect(session.hits).toBe(1);
  });

  it('isOver becomes true after totalShots shots', () => {
    for (let i = 0; i < session.totalShots; i++) {
      expect(session.isOver).toBe(false);
      session.recordShot(i % 2 === 0);
    }
    expect(session.isOver).toBe(true);
  });

  it('hitRate is 0 when no hits', () => {
    for (let i = 0; i < 5; i++) session.recordShot(false);
    expect(session.hitRate).toBe(0);
  });

  it('hitRate is 100 when all shots are hits', () => {
    for (let i = 0; i < session.totalShots; i++) session.recordShot(true);
    expect(session.hitRate).toBe(100);
  });

  it('hitRate calculates correctly for partial hits', () => {
    // 3 hits in 10 total shots = 30%
    for (let i = 0; i < 3; i++) session.recordShot(true);
    for (let i = 0; i < 7; i++) session.recordShot(false);
    expect(session.hitRate).toBeCloseTo(30);
  });

  it('reset restores initial state', () => {
    for (let i = 0; i < 5; i++) session.recordShot(true);
    session.reset();
    expect(session.score).toBe(0);
    expect(session.shotsUsed).toBe(0);
    expect(session.hits).toBe(0);
    expect(session.isOver).toBe(false);
  });

  it('does not record shots after game is over', () => {
    for (let i = 0; i < session.totalShots; i++) session.recordShot(false);
    const scoreBefore = session.score;
    session.recordShot(true);
    expect(session.score).toBe(scoreBefore);
    expect(session.shotsUsed).toBe(session.totalShots);
  });
});
