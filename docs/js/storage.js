const STORAGE_KEY = 'basketball_high_score';
let _memoryFallback = 0;

/**
 * Save the high score to localStorage.
 * Falls back to in-memory if localStorage is unavailable.
 * @param {number} score
 */
export function saveHighScore(score) {
  try {
    localStorage.setItem(STORAGE_KEY, String(score));
  } catch {
    _memoryFallback = score;
  }
}

/**
 * Load the high score from localStorage.
 * Falls back to in-memory value (0) if localStorage is unavailable.
 * @returns {number}
 */
export function loadHighScore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return _memoryFallback;
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) ? _memoryFallback : parsed;
  } catch {
    return _memoryFallback;
  }
}

/** Reset in-memory fallback (used in tests). */
export function _resetMemoryFallback() {
  _memoryFallback = 0;
}
