import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { saveHighScore, loadHighScore, _resetMemoryFallback } from '../../docs/js/storage.js';

describe('saveHighScore / loadHighScore – localStorage available', () => {
  beforeEach(() => {
    localStorage.clear();
    _resetMemoryFallback();
  });

  it('loadHighScore returns 0 when nothing is stored', () => {
    expect(loadHighScore()).toBe(0);
  });

  it('saveHighScore persists a value retrievable by loadHighScore', () => {
    saveHighScore(7);
    expect(loadHighScore()).toBe(7);
  });

  it('saveHighScore overwrites previous value', () => {
    saveHighScore(3);
    saveHighScore(9);
    expect(loadHighScore()).toBe(9);
  });

  it('stores value under key basketball_high_score', () => {
    saveHighScore(5);
    expect(localStorage.getItem('basketball_high_score')).toBe('5');
  });
});

describe('saveHighScore / loadHighScore – localStorage unavailable', () => {
  let origSetItem;
  let origGetItem;

  beforeEach(() => {
    _resetMemoryFallback();
    origSetItem = localStorage.setItem.bind(localStorage);
    origGetItem = localStorage.getItem.bind(localStorage);
    // Simulate unavailable localStorage
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('loadHighScore returns 0 when localStorage throws', () => {
    expect(loadHighScore()).toBe(0);
  });

  it('saveHighScore falls back to memory and loadHighScore retrieves it', () => {
    saveHighScore(4);
    expect(loadHighScore()).toBe(4);
  });
});
