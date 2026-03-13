# 實作計畫：[FEATURE]

**分支**：`[###-feature-name]` | **日期**：[DATE] | **規格**：[link]
**輸入**：來自 `/specs/[###-feature-name]/spec.md` 的功能規格

**說明**：此模板由 `/speckit.plan` 指令填入。執行流程請見 `.specify/templates/plan-template.md`。

## 摘要

[摘錄自 spec：核心需求 + 預計技術方案（以最小可行方案為優先）]

## 技術背景

**語言/版本**：[例如 Python 3.11、TypeScript 5.x 或 NEEDS CLARIFICATION]  
**主要相依**：[例如 FastAPI、React、Vite 或 NEEDS CLARIFICATION]  
**儲存**：[如適用，例如 PostgreSQL、檔案系統、N/A]  
**測試工具**：[例如 pytest、vitest、playwright 或 NEEDS CLARIFICATION]  
**目標平台**：[例如 Linux、瀏覽器、行動裝置或 NEEDS CLARIFICATION]  
**專案型態**：[例如 library/cli/web/mobile 或 NEEDS CLARIFICATION]  
**效能目標**：[領域指標或 NEEDS CLARIFICATION]  
**限制條件**：[領域限制或 NEEDS CLARIFICATION]  
**規模範圍**：[使用者量級、畫面數、服務數或 NEEDS CLARIFICATION]

## Constitution Check

*Gate：進入 Phase 0 前必須通過；Phase 1 設計後需再次檢查。*

- [ ] 規格優先：`spec.md` 已存在且核准，範圍可追溯至需求與使用者故事。
- [ ] 語言一致：規格與計畫內容使用繁體中文（zh-TW）。
- [ ] MVP 與簡單方案：切片可獨立交付，且方案優先最小可行、避免過度設計。
- [ ] TDD 策略：行為變更工作已定義先失敗測試，再實作，再通過的流程與測試層級。
- [ ] 網站預設策略：若為網站專案，已確認以前端靜態網站為預設並優先 GitHub Pages 部署。
- [ ] 規格保護：Implement 階段不得刪除或覆蓋 `spec.md`、`plan.md`、`tasks.md`。
- [ ] 可重現性：每個階段均定義可重現 git 驗證點與驗證命令。

## 階段性 Git 驗證點（必填）

- Specify：`git status` 檢查、規格檔更新確認。
- Plan：`git diff -- spec.md plan.md` 檢查追溯一致性。
- Tasks：`tasks.md` 任務與故事映射、初始勾選狀態檢查。
- Implement：每完成一批任務執行測試與 `git status`，同步更新 `tasks.md` 勾選。
- Review：提交前執行必要測試/檢查，並附上執行證據。

## 專案結構

### 文件（本功能）

```text
specs/[###-feature]/
├── plan.md              # 本檔（/speckit.plan 產出）
├── research.md          # Phase 0 產出
├── data-model.md        # Phase 1 產出
├── quickstart.md        # Phase 1 產出
├── contracts/           # Phase 1 產出
└── tasks.md             # Phase 2 產出（/speckit.tasks）
```

### 原始碼（儲存庫根目錄）

<!--
  請以實際專案結構取代下列範例；刪除未使用選項。
  若為網站專案，預設以靜態前端結構優先。
-->

```text
# [未使用請移除] 選項 1：單一專案（預設）
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [未使用請移除] 選項 2：網站專案（預設先採靜態前端）
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
└── tests/

# 若確有需求再加入 backend/

# [未使用請移除] 選項 3：行動端 + API
api/
└── [同 backend 結構]

ios/ 或 android/
└── [平台模組、流程與測試]
```

**結構決策**：[記錄採用的結構與原因，並說明為何符合最小可行原則]

## 複雜度追蹤

> **僅在 Constitution Check 例外時填寫**

| 違規項目 | 必要原因 | 被拒絕的更簡方案與理由 |
|----------|----------|------------------------|
| [例如額外服務] | [目前必要性] | [為何既有方案不足] |
