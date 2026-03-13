# ddd Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-13

## Active Technologies

- (001-basketball-game) HTML5 Canvas、原生 JavaScript（ES2020+）、Vitest、Playwright

## Project Structure

```text
docs/          # 靜態前端（GitHub Pages 部署根目錄）
  index.html
  css/style.css
  js/game.js, physics.js, input.js, ui.js
tests/
  unit/        # Vitest unit tests
  e2e/         # Playwright e2e tests
specs/         # 規格文件（不進入 docs/）
```

## Commands

```bash
# 安裝依賴
npm install

# 本機開發伺服器
npx serve docs

# Unit 測試（Vitest）
npm run test:unit

# E2E 測試（Playwright）
npm run test:e2e

# 所有測試
npm test
```

## Code Style

JavaScript：遵循 ES2020+ 標準；無 TypeScript；無建置步驟。  
命名：camelCase 函式與變數、PascalCase 類別、UPPER_SNAKE_CASE 常數。

## Recent Changes

- 001-basketball-game: Added plan, research, data-model, contracts, quickstart

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
