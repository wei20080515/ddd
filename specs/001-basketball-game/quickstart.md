# 快速入門：001-basketball-game

**產出日期**：2026-03-13

---

## 環境需求

| 工具 | 版本 | 用途 |
|------|------|------|
| Node.js | >= 18.x | 執行測試（Vitest / Playwright） |
| 瀏覽器 | 任何現代瀏覽器 | 執行遊戲 |
| Git | 任意 | 版本控制 |

---

## 快速啟動（開發）

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動本機開發伺服器

```bash
npx serve docs
```

開啟瀏覽器至 `http://localhost:3000`，即可玩遊戲。

> **無需建置步驟**：遊戲為純靜態 HTML/CSS/JS，直接在瀏覽器開啟 `docs/index.html` 亦可。

---

## 執行測試

### Unit 測試（Vitest）

```bash
npm run test:unit
```

涵蓋範圍：
- `physics.test.js` → 拋物線軌跡計算、進球碰撞偵測
- `score.test.js` → 命中率計算、得分更新
- `storage.test.js` → localStorage 讀寫與退化行為

### E2E 測試（Playwright）

```bash
npm run test:e2e
```

涵蓋範圍：
- 拖曳投籃 → 進框偵測 → 得分更新
- 10 球投完 → 遊戲結束畫面
- 最高分跨頁面重整後持久保留

### 全部測試

```bash
npm test
```

---

## 部署至 GitHub Pages

1. 確保程式碼在 `docs/` 資料夾
2. 前往 GitHub Repo → Settings → Pages
3. Source 設為 `main` 分支、`/docs` 資料夾
4. 儲存後，幾分鐘內可透過 `https://{username}.github.io/{repo}` 訪問

---

## 專案結構說明

```
(儲存庫根目錄)
├── docs/
│   ├── index.html        # 遊戲入口
│   ├── css/
│   │   └── style.css     # 樣式
│   └── js/
│       ├── game.js       # 主遊戲迴圈、狀態管理
│       ├── physics.js    # 拋物線軌跡計算、進球碰撞偵測
│       ├── input.js      # 滑鼠/觸控輸入正規化
│       └── ui.js         # 得分板、遊戲結束畫面、進球特效
├── tests/
│   ├── unit/
│   │   ├── physics.test.js
│   │   ├── score.test.js
│   │   └── storage.test.js
│   └── e2e/
│       └── game.spec.js
├── package.json
└── specs/                # 規格文件（不進入 docs/）
```

---

## TDD 工作流程

本專案遵循 TDD（測試驅動開發）原則（見 Constitution III）：

```
1. 撰寫失敗的測試（Red）
   npm run test:unit  →  預期失敗

2. 實作最小程式碼使測試通過（Green）
   npm run test:unit  →  全部通過

3. 重構優化（Refactor）
   npm run test:unit  →  仍然通過

4. e2e 驗證完整流程
   npm run test:e2e   →  全部通過
```

---

## Git 驗證點

每個階段提交前執行：

```bash
# 確認無未預期檔案
git status

# 確認規格文件未被修改
git diff -- specs/001-basketball-game/spec.md

# 執行測試
npm test
```
