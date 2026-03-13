# 實作計畫：001-basketball-game

**分支**：`001-basketball-game` | **日期**：2026-03-13 | **規格**：`specs/001-basketball-game/spec.md`
**輸入**：來自 `specs/001-basketball-game/spec.md` 的功能規格

## 摘要

製作一款瀏覽器端投籃遊戲。玩家透過滑鼠拖曳或觸控滑動操控投籃，球依拋物線飛行，進框得分。每局 10 球，有計分板與遊戲結束畫面（含命中率、最高分、再玩一次）。最高分儲存於 localStorage。

**技術方案**：純 HTML5 Canvas + 原生 JavaScript，零依賴，靜態網站部署至 GitHub Pages 的 `docs/` 資料夾。測試使用 Vitest（unit）+ Playwright（e2e）。

## 技術背景

**語言/版本**：HTML5、CSS3、JavaScript（ES2020+，無 TypeScript，無建置步驟）  
**主要相依**：無執行時期依賴；開發依賴 Vitest、Playwright、serve  
**儲存**：`localStorage`（僅儲存最高分）  
**測試工具**：Vitest（unit）、Playwright（e2e）  
**目標平台**：瀏覽器（Chrome、Firefox、Safari）；桌面與行動裝置  
**專案型態**：web（靜態前端）  
**效能目標**：動畫 ≥ 30 fps；頁面載入後 < 3 秒可投球  
**限制條件**：無後端；無帳號系統；MVP 固定 10 球、固定籃框位置  
**規模範圍**：單人單頁面應用，2 個畫面狀態（PLAYING / OVER）

## Constitution Check

*Gate：進入 Phase 0 前必須通過；Phase 1 設計後需再次檢查。*

- [x] 規格優先：`spec.md` 已存在（狀態：草稿），範圍可追溯至 FR-001～FR-010 及三個使用者故事。
- [x] 語言一致：`spec.md` 與本 `plan.md` 均使用繁體中文（zh-TW）。
- [x] MVP 與簡單方案：P1（基本投籃）可獨立交付驗證；採純 Canvas + 原生 JS 最小可行方案。
- [x] TDD 策略：物理邏輯（`physics.js`）、計分（`score.js`）、儲存（`storage.js`）先以 Vitest 撰寫失敗測試，再實作，再通過；e2e 以 Playwright 驗證整合流程。
- [x] 網站預設策略：已確認以靜態前端（`docs/` 資料夾）為唯一部署單元，優先 GitHub Pages。
- [x] 規格保護：Implement 階段明確禁止刪除 `spec.md`、`plan.md`、`tasks.md`（見 Engineering Standards）。
- [x] 可重現性：已於「階段性 Git 驗證點」節定義各階段驗證命令。

## 階段性 Git 驗證點（必填）

- Specify：`git status` 檢查、規格檔更新確認。
- Plan：`git diff -- spec.md plan.md` 檢查追溯一致性。
- Tasks：`tasks.md` 任務與故事映射、初始勾選狀態檢查。
- Implement：每完成一批任務執行測試與 `git status`，同步更新 `tasks.md` 勾選。
- Review：提交前執行必要測試/檢查，並附上執行證據。

## 專案結構

### 文件（本功能）

```text
specs/001-basketball-game/
├── plan.md              # 本檔（/speckit.plan 產出）
├── research.md          # Phase 0 產出 ✓
├── data-model.md        # Phase 1 產出 ✓
├── quickstart.md        # Phase 1 產出 ✓
├── contracts/           # Phase 1 產出 ✓
│   └── ui-contract.md
└── tasks.md             # Phase 2 產出（/speckit.tasks）
```

### 原始碼（儲存庫根目錄）

```text
# 選項 2：網站專案（靜態前端，GitHub Pages）
docs/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── game.js       # 主遊戲迴圈、狀態管理（GameSession）
    ├── physics.js    # 拋物線軌跡計算、進球碰撞偵測
    ├── input.js      # 滑鼠/觸控輸入正規化
    └── ui.js         # 得分板、遊戲結束畫面、進球特效

tests/
├── unit/
│   ├── physics.test.js
│   ├── score.test.js
│   └── storage.test.js
└── e2e/
    └── game.spec.js

package.json
README.md
```

**結構決策**：採靜態前端單層結構，無後端，符合 MVP 原則。`docs/` 資料夾為 GitHub Pages 部署根目錄，無需建置步驟。JS 依職責拆為 4 個模組（game、physics、input、ui），保持單一責任、易於 unit 測試。

## 複雜度追蹤

> **僅在 Constitution Check 例外時填寫**

本計畫無 Constitution Check 違規，所有決策均符合最小可行方案原則，無需額外記錄。

| 違規項目 | 必要原因 | 被拒絕的更簡方案與理由 |
|----------|----------|------------------------|
| （無）   | —        | —                      |
