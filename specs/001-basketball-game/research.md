# 研究報告：001-basketball-game

**產出日期**：2026-03-13  
**來源規格**：`specs/001-basketball-game/spec.md`

---

## 決策 1：技術堆疊

**決策**：純 HTML5 Canvas + 原生 JavaScript（零依賴靜態網站）

**理由**：
- 零依賴 = 無需建置步驟，直接部署 GitHub Pages
- 整個遊戲原始碼 < 50 KB，載入速度快
- 直接控制物理計算（拋物線軌跡僅為簡單線性代數）
- 瀏覽器原生支援 `requestAnimationFrame`，可達 60 fps
- Canvas 碰撞偵測對本遊戲複雜度已足夠

**考慮過的替代方案**：
- **Phaser.js**：對簡單 2D 射擊遊戲過重（約 600 KB 壓縮後），引入不必要複雜度。
- **p5.js**：偏向創意編碼/藝術專案，物理計算彈性不如原生 Canvas。

---

## 決策 2：測試框架

**決策**：Vitest 用於 unit 測試（物理邏輯）+ Playwright 用於 e2e 關鍵流程

**理由**：
- Vitest 與原生 ES modules 相容，無需額外轉譯設定，可在 jsdom 環境測試 localStorage 邏輯。
- Playwright 在真實瀏覽器中測試，可模擬滑鼠/觸控事件，驗證遊戲互動流程。
- Canvas 視覺渲染細節（動畫流暢度等）接受人工 QA，不納入自動化測試範圍。

**可測試的 unit 函式**：
- `calculateTrajectory(x0, y0, vx, vy, t) → {x, y}`（拋物線物理）
- `isBallInHoop(ballPos, hoopPos, hoopRadius) → boolean`（進球判斷）
- `calculateHitRate(hits, shots) → number`（命中率）
- `saveHighScore(score)` / `loadHighScore() → number`（localStorage）

**e2e 關鍵流程**（Playwright）：
- 拖曳滑鼠 → 球射出 → 進框偵測與得分增加
- 投完 10 球 → 遊戲結束畫面出現
- 最高分跨頁面重整後持久保留

**考慮過的替代方案**：
- 純 Jest：Canvas API 在 jsdom 中模擬不完整，渲染測試困難。

---

## 決策 3：專案結構

**決策**：使用 `docs/` 資料夾作為 GitHub Pages 部署根目錄

**理由**：
- GitHub Pages 原生支援 `main` 分支 + `/docs` 資料夾設定
- 根目錄保持整潔，測試與設定檔與遊戲原始碼分離
- 無需額外 CI/CD 或 `gh-pages` 分支

**目錄結構**：
```
(儲存庫根目錄)
├── docs/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── game.js       # 主遊戲迴圈與狀態管理
│       ├── physics.js    # 拋物線軌跡、碰撞偵測
│       ├── input.js      # 滑鼠/觸控輸入正規化
│       └── ui.js         # 得分板、遊戲結束畫面、特效
├── tests/
│   ├── unit/
│   │   ├── physics.test.js
│   │   ├── score.test.js
│   │   └── storage.test.js
│   └── e2e/
│       └── game.spec.js
├── package.json
└── README.md
```

---

## 決策 4：拋物線軌跡動畫

**決策**：Euler 積分法 + `requestAnimationFrame` 迴圈，使用 GRAVITY 與 DAMPING 常數

**理由**：
- Euler 積分（`x += vx`、`y += vy`）對休閒射擊遊戲精度已足夠
- 可調整常數即可調整遊戲手感，不需複雜物理引擎
- 每幀計算量極低，可穩定維持 60 fps

**物理常數（建議初始值）**：
- `GRAVITY = 0.5` px/frame²（向下加速度）
- `DAMPING = 0.98`（每幀速度衰減 2%，模擬空氣阻力）
- `VELOCITY_MULTIPLIER = 0.15`（拖曳距離轉換為初速度的係數）

**考慮過的替代方案**：
- Runge-Kutta 積分：精度更高，但對休閒遊戲過度設計。
- 精確拋物線方程式：可用，但喪失可調整的遊戲手感彈性。

---

## 決策 5：觸控與滑鼠輸入正規化

**決策**：統一指標事件處理器，以拖曳向量計算初速度

**理由**：
- 單一處理器 `e.clientX || e.touches[0].clientX` 同時支援滑鼠與觸控
- `getBoundingClientRect()` 正規化座標，正確處理頁面捲動與縮放
- 反向拖曳（向下拖 → 向上投）符合投籃直覺
- 防抖機制：球在飛行中時忽略新的輸入操作

**防重複投球機制**：
- 以 `isFlying: boolean` 狀態旗標控制，球未落地前不接受新的 `pointerDown` 事件

---

## 解決的 NEEDS CLARIFICATION 項目

| 原始未知項 | 決策 |
|----------|------|
| 技術堆疊選擇 | 純 HTML5 Canvas + 原生 JS |
| 測試工具 | Vitest（unit）+ Playwright（e2e） |
| 目標平台 | 瀏覽器（桌面 + 行動裝置） |
| 部署結構 | `docs/` 資料夾 → GitHub Pages |
| 物理實作 | Euler 積分 + 可調物理常數 |
| 輸入正規化 | 統一指標事件，反向拖曳投籃 |
