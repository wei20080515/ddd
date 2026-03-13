# 🏀 投籃遊戲（Basketball Game）

A browser-based basketball shooting game built with pure HTML5 Canvas + vanilla JavaScript. No build step required — just open and play.

## 🎮 How to Play

1. Drag the ball from the bottom of the screen toward the hoop and release to shoot.
2. The ball follows a parabolic arc. Aim carefully!
3. You have **10 shots** per game. Try to score as many as possible.
4. When all shots are used, the **Game Over** screen shows your score, hit rate, and high score.
5. Click **再玩一次 (Play Again)** to restart.

## 🚀 Local Development

```sh
# Install dev dependencies (Vitest + Playwright)
npm install

# Start a local server to preview the game
npx serve docs
# Open http://localhost:3000 in your browser
```

## 🧪 Running Tests

```sh
# Unit tests (physics, scoring, storage)
npm run test:unit
# or
npx vitest run tests/unit/

# End-to-end tests (requires a running server on port 3000)
npm run test:e2e
# or
npx playwright test

# Install Playwright browsers (first time only)
npx playwright install
```

## 📦 Project Structure

```
docs/             ← GitHub Pages root (game source)
├── index.html
├── css/style.css
└── js/
    ├── game.js       Main game loop & entry point
    ├── game-logic.js GameSession & Ball classes
    ├── physics.js    Trajectory calculation & collision detection
    ├── input.js      Mouse/touch input normalisation
    ├── ui.js         Canvas rendering, scoreboard & game-over UI
    └── storage.js    localStorage high-score persistence

tests/
├── unit/             Vitest unit tests
│   ├── physics.test.js
│   ├── score.test.js
│   └── storage.test.js
└── e2e/              Playwright end-to-end tests
    └── game.spec.js
```

## 🌐 GitHub Pages Deployment

The game is deployed automatically from the `docs/` folder on the `main` branch.

Go to **Settings → Pages → Source** and set it to `main` / `docs/`.
