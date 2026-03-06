---
description: "功能實作任務清單模板"
---

# Tasks: [FEATURE NAME]

**Input**：`/specs/[###-feature-name]/` 內的設計文件  
**Prerequisites**：`plan.md`（必要）、`spec.md`（必要）、`research.md`、`data-model.md`、`contracts/`

**Tests**：凡行為變更，測試任務為 REQUIRED，且 MUST 先寫到失敗再進入實作。僅文件調整等非行為變更可註明理由後省略測試。

**Organization**：任務依使用者故事分組，確保每個故事可獨立實作、測試與驗證。

## 格式：`[ID] [P?] [Story] 描述`

- **[P]**：可平行執行（不同檔案、無相依）
- **[Story]**：對應使用者故事（US1、US2、US3）
- 描述 MUST 含明確檔案路徑

## 路徑慣例

- **單一專案**：`src/`、`tests/`
- **網站專案**：預設 `frontend/`（靜態站，優先 GitHub Pages）
- **行動專案**：`api/src/`、`ios/` 或 `android/`
- 以下範例以單一專案為主，請依 `plan.md` 實際結構調整

## Constitution Coverage

- 任務 MUST 可追溯到對應使用者故事與需求。
- 行為變更時，測試任務 MUST 先於實作任務。
- 任務執行期間 MUST 維持 `tasks.md` 勾選進度可追蹤且與實際產出一致。
- Implement 階段 MUST 避免刪除或覆蓋 `spec.md`、`plan.md`、`tasks.md`。
- 若命令、環境或驗證方式變更，MUST 增列可重現性更新任務。
- 每個階段 MUST 具備 git 驗證點任務（狀態檢查或提交前檢查）。

<!--
  注意：下列任務僅為示例。/speckit.tasks 產生實際 tasks.md 時必須替換。
-->

## Phase 1: Setup（共用基礎）

**Purpose**：專案初始化與基本結構

- [ ] T001 依實作計畫建立目錄與檔案骨架
- [ ] T002 初始化 [language] 專案與必要相依
- [ ] T003 [P] 設定 lint/format 工具
- [ ] T004 新增階段 git 驗證任務與執行說明（例如 `git status`）

---

## Phase 2: Foundational（阻塞前置）

**Purpose**：所有使用者故事開始前必須完成的核心基礎

- [ ] T005 建立核心資料模型/共用模組
- [ ] T006 [P] 建立錯誤處理與記錄機制
- [ ] T007 [P] 建立測試基礎設施與範例失敗測試
- [ ] T008 建立規格檔保護檢查（避免刪除/覆蓋）

**Checkpoint**：基礎完成後，使用者故事可開始

---

## Phase 3: User Story 1 - [標題]（Priority: P1）🎯 MVP

**Goal**：[此故事交付目標]

**Independent Test**：[如何單獨驗證此故事]

### Tests for User Story 1（行為變更必填）

> 先寫測試並確認失敗，再開始實作。

- [ ] T009 [P] [US1] 合約/單元/整合測試：`tests/[type]/test_[name].*`

### Implementation for User Story 1

- [ ] T010 [P] [US1] 實作核心元件：`src/[path]/[file].*`
- [ ] T011 [US1] 完成故事流程與錯誤處理：`src/[path]/[file].*`
- [ ] T012 [US1] 執行測試並更新 `tasks.md` 勾選狀態
- [ ] T013 [US1] 執行 git 驗證點（`git status`、必要提交前檢查）

**Checkpoint**：US1 可獨立運作與驗證

---

## Phase 4: User Story 2 - [標題]（Priority: P2）

**Goal**：[此故事交付目標]

**Independent Test**：[如何單獨驗證此故事]

### Tests for User Story 2（行為變更必填）

- [ ] T014 [P] [US2] 測試：`tests/[type]/test_[name].*`

### Implementation for User Story 2

- [ ] T015 [P] [US2] 實作元件：`src/[path]/[file].*`
- [ ] T016 [US2] 完成流程與整合
- [ ] T017 [US2] 測試通過、更新 `tasks.md` 勾選與 git 驗證點

**Checkpoint**：US1 與 US2 可各自獨立驗證

---

## Phase 5: User Story 3 - [標題]（Priority: P3）

**Goal**：[此故事交付目標]

**Independent Test**：[如何單獨驗證此故事]

### Tests for User Story 3（行為變更必填）

- [ ] T018 [P] [US3] 測試：`tests/[type]/test_[name].*`

### Implementation for User Story 3

- [ ] T019 [P] [US3] 實作元件：`src/[path]/[file].*`
- [ ] T020 [US3] 完成流程與整合
- [ ] T021 [US3] 測試通過、更新 `tasks.md` 勾選與 git 驗證點

**Checkpoint**：所有故事可獨立驗證

---

## Final Phase: Polish & Cross-Cutting

- [ ] T022 [P] 文件更新（含可重現操作）
- [ ] T023 程式碼整理與必要重構（不得破壞既有故事獨立性）
- [ ] T024 [P] 補強測試（如需要）
- [ ] T025 執行提交前檢查並記錄結果

---

## 依賴與執行順序

1. Setup（Phase 1）可立即開始。
2. Foundational（Phase 2）完成前，不可進入任何使用者故事。
3. User Story 階段可依人力平行，但仍應遵循優先序（P1 → P2 → P3）。
4. 每個故事內固定順序：先測試失敗，再實作，再測試通過，再更新勾選與 git 驗證點。

---

## Notes

- `[P]` 代表可平行執行。
- 每個任務必須標示故事歸屬，確保追溯性。
- 每完成一個任務或一組任務，應即時更新勾選。
- 避免模糊任務、跨故事硬耦合與同檔衝突。
