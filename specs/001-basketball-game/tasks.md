# Tasks: 001-basketball-game（投籃遊戲）

**Input**：`specs/001-basketball-game/` 內的設計文件  
**Prerequisites**：`plan.md` ✓、`spec.md` ✓、`research.md` ✓、`data-model.md` ✓、`contracts/ui-contract.md` ✓

**Tests**：凡行為變更，測試任務為 REQUIRED，且 MUST 先寫到失敗再進入實作（CA-003）。

**Organization**：任務依使用者故事分組，確保每個故事可獨立實作、測試與驗證。

## 格式：`[ID] [P?] [Story?] 描述`

- **[P]**：可平行執行（不同檔案、無相依）
- **[Story]**：對應使用者故事（US1、US2、US3）
- 描述 MUST 含明確檔案路徑

---

## Phase 1: Setup（專案初始化）

**Purpose**：建立目錄結構、初始化相依套件、設定測試工具

- [X] T001 依 `plan.md` 建立目錄骨架：`docs/js/`、`docs/css/`、`tests/unit/`、`tests/e2e/`
- [X] T002 建立 `package.json`，安裝 Vitest（unit）與 Playwright（e2e）開發相依
- [X] T003 [P] 建立 Vitest 設定檔 `vitest.config.js`（含 jsdom 環境）
- [X] T004 [P] 建立 Playwright 設定檔 `playwright.config.js`（含本地 serve 指令）
- [X] T005 執行 `git status` 驗證階段完成，確認所有設定檔已加入

---

## Phase 2: Foundational（核心基礎）

**Purpose**：所有使用者故事開始前必須完成的共用基礎，不含業務邏輯

- [X] T006 建立 `docs/index.html`，包含 `<canvas>` 元素、得分板 DOM 節點與腳本引用骨架
- [X] T007 [P] 建立 `docs/css/style.css`，定義畫布置中、全版面背景、得分板樣式
- [X] T008 [P] 建立物理常數與模組匯出骨架 `docs/js/physics.js`（僅常數，不含實作）
- [X] T009 [P] 建立空模組骨架：`docs/js/game.js`、`docs/js/input.js`、`docs/js/ui.js`、`docs/js/storage.js`
- [X] T010 執行 `git status` 驗證階段完成，基礎骨架已就緒

**Checkpoint**：Phase 2 完成後，方可進入各使用者故事

---

## Phase 3: User Story 1 - 基本投籃互動（Priority: P1）🎯 MVP

**Goal**：玩家開啟遊戲後可立即投籃，球依拋物線飛行，進框得分，未進球落地後可繼續下一球

**Independent Test**：開啟 `docs/index.html`，執行拖曳投籃，確認拋物線動畫流暢、進框時得分 +1、未進時球回原位

### Tests for User Story 1（行為變更必填，先寫失敗）

- [X] T011 [P] [US1] 在 `tests/unit/physics.test.js` 撰寫 `calculateTrajectory(x0, y0, vx, vy, t)` 失敗測試（重力、DAMPING 常數驗證）
- [X] T012 [P] [US1] 在 `tests/unit/physics.test.js` 撰寫 `isBallInHoop(ballPos, hoopPos, hoopRadius)` 失敗測試（進球判斷邊界值）
- [X] T013 [P] [US1] 在 `tests/e2e/game.spec.js` 撰寫拖曳投籃 → 球飛行 → 進框得分的 Playwright 失敗測試

### Implementation for User Story 1

- [X] T014 [US1] 在 `docs/js/physics.js` 實作 `calculateTrajectory()`（Euler 積分，使用 `GRAVITY`、`DAMPING` 常數）
- [X] T015 [P] [US1] 在 `docs/js/physics.js` 實作 `isBallInHoop()`（`Math.hypot` 近似偵測，搭配由上往下穿越判斷）
- [X] T016 [US1] 在 `docs/js/input.js` 實作 `InputState` 與 `pointerdown`/`pointermove`/`pointerup` 事件處理（滑鼠/觸控統一，`getBoundingClientRect()` 正規化座標，反向 Y 軸）
- [X] T017 [US1] 在 `docs/js/game.js` 實作 `Ball`、`Hoop` 初始化、主遊戲迴圈（`requestAnimationFrame`）與球飛行狀態管理（`isFlying` 旗標防重複投球）
- [X] T018 [US1] 在 `docs/js/ui.js` 實作 Canvas 渲染（籃球、籃框、瞄準線繪製）與進球閃光特效（持續約 0.5 秒）
- [X] T019 [US1] 執行 `npx vitest run tests/unit/physics.test.js`，確認所有 US1 unit 測試通過
- [X] T020 [US1] 執行 Playwright e2e 投籃測試，確認通過；更新 `tasks.md` 勾選狀態與 `git status`

**Checkpoint**：US1 可獨立開啟 `docs/index.html` 並完整驗證投籃互動

---

## Phase 4: User Story 2 - 計分與剩餘球數（Priority: P2）

**Goal**：有限 10 球挑戰，畫面即時顯示得分與剩餘球數，球數用盡後顯示遊戲結束畫面與命中率，可再玩一次

**Independent Test**：投完 10 球後，確認畫面顯示「遊戲結束」、正確得分與命中率，「再玩一次」可重置遊戲

### Tests for User Story 2（行為變更必填，先寫失敗）

- [X] T021 [P] [US2] 在 `tests/unit/score.test.js` 撰寫 `GameSession` 狀態管理失敗測試（`shotsUsed` 遞增、`isOver` 觸發、`hitRate` 計算）
- [X] T022 [P] [US2] 在 `tests/e2e/game.spec.js` 撰寫投完 10 球 → 遊戲結束畫面出現 → 「再玩一次」重置的 Playwright 失敗測試

### Implementation for User Story 2

- [X] T023 [US2] 在 `docs/js/game.js` 實作 `GameSession`（`score`、`shotsUsed`、`hits`、`isOver`、`hitRate` 計算屬性，狀態轉移：PLAYING → OVER）
- [X] T024 [US2] 在 `docs/js/ui.js` 實作得分板即時更新（`得分：{score}`、`剩餘球數：{shotsLeft}`）與遊戲結束畫面（標題、得分、命中率、「再玩一次」按鈕）
- [X] T025 [US2] 在 `docs/js/game.js` 實作「再玩一次」按鈕事件，重置 `GameSession` 並回到 PLAYING 狀態
- [X] T026 [US2] 執行 `npx vitest run tests/unit/score.test.js`，確認所有 US2 unit 測試通過
- [X] T027 [US2] 執行 Playwright e2e 計分測試，確認通過；更新 `tasks.md` 勾選狀態與 `git status`

**Checkpoint**：US1 + US2 可各自獨立驗證；完整 10 球遊戲流程可正常運作

---

## Phase 5: User Story 3 - 最高分紀錄（Priority: P3）

**Goal**：每局結束後自動比對並更新歷史最高分，破紀錄時顯示「新紀錄！」，最高分儲存於 `localStorage` 跨局次保留

**Independent Test**：完成兩局得分不同的遊戲，確認最高分正確取較大值、「新紀錄！」僅在破紀錄時顯示；重整頁面後最高分持久保留

### Tests for User Story 3（行為變更必填，先寫失敗）

- [X] T028 [P] [US3] 在 `tests/unit/storage.test.js` 撰寫 `saveHighScore(score)` / `loadHighScore()` 失敗測試（正常存取、localStorage 不可用時退化為記憶體暫存）
- [X] T029 [P] [US3] 在 `tests/e2e/game.spec.js` 撰寫最高分跨頁面重整持久保留的 Playwright 失敗測試

### Implementation for User Story 3

- [X] T030 [US3] 在 `docs/js/storage.js` 實作 `saveHighScore(score)` 與 `loadHighScore()`（使用 `localStorage` 鍵 `basketball_high_score`；不可用時靜默退化為記憶體暫存值 `0`）
- [X] T031 [US3] 在 `docs/js/ui.js` 遊戲結束畫面新增最高分顯示（`最高紀錄：{highScore}`）與條件顯示「🎉 新紀錄！」特效
- [X] T032 [US3] 在 `docs/js/game.js` 整合 `storage.js`，於遊戲結束時呼叫 `saveHighScore` 並傳遞最新最高分至 `ui.js`
- [X] T033 [US3] 執行 `npx vitest run tests/unit/storage.test.js`，確認所有 US3 unit 測試通過
- [X] T034 [US3] 執行 Playwright e2e 最高分測試，確認通過；更新 `tasks.md` 勾選狀態與 `git status`

**Checkpoint**：所有三個故事可各自獨立驗證；完整遊戲包含計分與最高分功能

---

## Final Phase: Polish & Cross-Cutting

- [X] T035 [P] 建立 `README.md`，包含遊戲說明、本地開發指令（`npx serve docs`）、測試執行指令與 GitHub Pages 部署方式
- [X] T036 執行完整測試套件 `npx vitest run && npx playwright test`，修正所有失敗項目
- [X] T037 [P] 在 `tests/e2e/game.spec.js` 補充觸控事件模擬測試，確認行動裝置操作與桌面滑鼠操作等效（FR-002、SC-005）
- [X] T038 [P] 在 `docs/js/game.js` 確認 `requestAnimationFrame` 迴圈效能（≥ 30 fps），驗證頁面載入後 < 3 秒可投球（SC-001、SC-002）
- [X] T039 執行提交前完整測試，記錄通過結果，更新所有已完成任務的 `tasks.md` 勾選狀態

---

## 依賴與執行順序

```
Phase 1 (Setup)
  └─► Phase 2 (Foundational)
        └─► Phase 3 (US1 - P1) 🎯 MVP
              └─► Phase 4 (US2 - P2)
                    └─► Phase 5 (US3 - P3)
                          └─► Final Phase (Polish)
```

1. **Phase 1**（Setup）可立即開始，無前置條件。
2. **Phase 2**（Foundational）依賴 Phase 1 完成。
3. **Phase 3**（US1）依賴 Phase 2 完成；US1 為 MVP，優先完成。
4. **Phase 4**（US2）依賴 Phase 3 完成（US2 需要 `GameSession` 投球計數）。
5. **Phase 5**（US3）依賴 Phase 4 完成（US3 最高分需要 `score` 與遊戲結束畫面）。
6. **Final Phase** 依賴所有故事完成。

---

## 各故事可平行執行任務示例

### Phase 3 (US1) 內部平行
```
T011 ──┐
T012 ──┼─► T014 ──► T016 ──► T017 ──► T019 ──► T020
T013 ──┘         T015 ──┘   T018 ──┘
```

### Phase 4 (US2) 內部平行
```
T021 ──┐
T022 ──┴─► T023 ──► T024 ──► T025 ──► T026 ──► T027
```

### Phase 5 (US3) 內部平行
```
T028 ──┐
T029 ──┴─► T030 ──► T031 ──► T032 ──► T033 ──► T034
```

---

## 實作策略（MVP 優先）

1. **MVP**（Phase 1 + Phase 2 + Phase 3）：完成基本投籃互動，即可在 GitHub Pages 上部署與示範。
2. **可玩版本**（+ Phase 4）：加入計分、球數限制與遊戲結束流程，遊戲具有完整目標感。
3. **完整版本**（+ Phase 5 + Final Phase）：加入最高分持久紀錄與跨裝置 polish，提升留存價值。

---

## Notes

- `[P]` 代表可平行執行，適合多人或多工進行。
- 每個任務必須標示故事歸屬，確保追溯性至 `spec.md` 使用者故事。
- 每完成一個任務或一組任務，應即時更新勾選狀態。
- 測試任務 MUST 先執行（失敗態確認）再進入對應實作任務，符合 CA-003 TDD 路徑。
- Implement 階段 MUST 避免刪除或覆蓋 `spec.md`、`plan.md`、`tasks.md`。
- `docs/js/storage.js` 為計畫結構延伸（對應 `tests/unit/storage.test.js`），儲存 `saveHighScore`/`loadHighScore` 函式。
