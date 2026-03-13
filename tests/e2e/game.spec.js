import { test, expect } from '@playwright/test';

test.describe('Basketball game – basic shooting interaction (US1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#gameCanvas');
  });

  test('page loads with canvas and scoreboard', async ({ page }) => {
    await expect(page.locator('#gameCanvas')).toBeVisible();
    await expect(page.locator('#score-display')).toContainText('得分：0');
    await expect(page.locator('#shots-display')).toContainText('剩餘球數：10');
  });

  test('dragging and releasing reduces shotsLeft', async ({ page }) => {
    const canvas = page.locator('#gameCanvas');
    const box = await canvas.boundingBox();

    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height - 60;
    // Drag to the left to fire a miss
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 80, startY + 20, { steps: 10 });
    await page.mouse.up();

    // Allow ball to travel and reset
    await page.waitForTimeout(2000);
    const shotsText = await page.locator('#shots-display').textContent();
    // shotsLeft should be 9 after one shot
    expect(shotsText).toContain('剩餘球數：9');
  });
});

test.describe('Basketball game – scoring and shots limit (US2)', () => {
  async function exhaustShots(page) {
    const canvas = page.locator('#gameCanvas');
    const box = await canvas.boundingBox();
    for (let i = 0; i < 10; i++) {
      const startX = box.x + box.width * 0.5;
      const startY = box.y + box.height - 60;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - 80, startY + 20, { steps: 5 });
      await page.mouse.up();
      await page.waitForTimeout(1500);
    }
  }

  test('game over screen appears after 10 shots', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#gameCanvas');
    await exhaustShots(page);

    const replayVisible = await page.evaluate(() => {
      const c = document.getElementById('gameCanvas');
      return c && c._replayBtn != null;
    });
    expect(replayVisible).toBe(true);
  });

  test('replay button resets the game', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#gameCanvas');
    await exhaustShots(page);

    // Click the replay button via JS to avoid coordinate scaling issues
    await page.evaluate(() => {
      const c = document.getElementById('gameCanvas');
      if (c && c._replayBtn) {
        const btn = c._replayBtn;
        const rect = c.getBoundingClientRect();
        const scaleX = c.width / rect.width;
        const scaleY = c.height / rect.height;
        const clickX = rect.left + (btn.x + btn.w / 2) / scaleX;
        const clickY = rect.top + (btn.y + btn.h / 2) / scaleY;
        const ev = new MouseEvent('click', { clientX: clickX, clientY: clickY, bubbles: true });
        c.dispatchEvent(ev);
      }
    });

    await page.waitForTimeout(300);
    await expect(page.locator('#score-display')).toContainText('得分：0');
    await expect(page.locator('#shots-display')).toContainText('剩餘球數：10');
  });
});

test.describe('Basketball game – high score persistence (US3)', () => {
  test('high score persists across page reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('basketball_high_score', '5');
    });

    await page.reload();
    await page.waitForSelector('#gameCanvas');

    const storedScore = await page.evaluate(() =>
      localStorage.getItem('basketball_high_score')
    );
    expect(storedScore).toBe('5');
  });
});

test.describe('Basketball game – touch input (SC-005)', () => {
  test('pointer events from touch device fire a shot', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#gameCanvas');
    const canvas = page.locator('#gameCanvas');
    const box = await canvas.boundingBox();

    const startX = box.x + box.width * 0.5;
    const startY = box.y + box.height - 60;
    const endX = startX - 80;
    const endY = startY + 20;

    // Simulate pointer events with pointerType touch
    await page.dispatchEvent('#gameCanvas', 'pointerdown', {
      clientX: startX, clientY: startY, pointerType: 'touch',
    });
    await page.dispatchEvent('#gameCanvas', 'pointermove', {
      clientX: endX, clientY: endY, pointerType: 'touch',
    });
    await page.dispatchEvent('#gameCanvas', 'pointerup', {
      clientX: endX, clientY: endY, pointerType: 'touch',
    });

    await page.waitForTimeout(2000);
    const shotsText = await page.locator('#shots-display').textContent();
    expect(shotsText).toContain('剩餘球數：9');
  });
});
