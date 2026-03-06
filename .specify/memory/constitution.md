<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
  - I. Spec-First Delivery -> I. 規格優先與繁中一致性
  - II. Independent, Prioritized User Value -> II. 獨立且可排序的最小可行價值
  - III. Test-First Verification (NON-NEGOTIABLE) -> III. TDD 驗證優先（不可妥協）
  - IV. Simplicity with Explicit Tradeoffs -> IV. 簡單優先與避免過度設計
  - V. Reproducible Engineering Hygiene -> V. 可重現流程與 Git 驗證點
- Added sections: None
- Removed sections: None
- Templates requiring updates:
  - ✅ updated .specify/templates/spec-template.md
  - ✅ updated .specify/templates/plan-template.md
  - ✅ updated .specify/templates/tasks-template.md
  - ⚠ pending .specify/templates/commands/*.md (目錄不存在，無檔案可更新)
  - ✅ updated README.md
- Deferred items: None
-->

# ddd Constitution

## Core Principles

### I. 規格優先與繁中一致性
所有非瑣碎變更在撰寫正式程式碼前，MUST 先有核准的 `spec.md` 與
`plan.md`。`spec.md`、相關規格文件，以及代理在流程中的正式回覆 MUST 使用
繁體中文（zh-TW）。

Rationale: 先定義需求與語言一致性可降低誤解、避免範圍漂移，並確保跨階段可追蹤。

### II. 獨立且可排序的最小可行價值
工作 MUST 依優先序切成可獨立實作、可獨立驗證的使用者故事（P1、P2、P3...）。
P1 MUST 可單獨形成 MVP。解法 MUST 優先採最小可行與簡單方案，不得為假設性需求
預先導入過度設計。

Rationale: 以最小切片交付可更快驗證價值、降低風險，並避免不必要複雜度。

### III. TDD 驗證優先（不可妥協）
凡涉及行為變更的任務，MUST 先寫自動化測試且先觀察失敗，再進行實作，最後使測試通過。
測試層級 MUST 以可證明行為的最小層級為準（unit/integration/contract）。

Rationale: Red-Green-Refactor 能提供可驗證證據，並在早期阻擋回歸缺陷。

### IV. 簡單優先與避免過度設計
實作 MUST 以滿足當前需求的最簡設計為原則。若必須引入額外結構或操作複雜度，
MUST 在 `plan.md` 的 Complexity Tracking 明確記錄原因與被拒絕的更簡替代方案。

Rationale: 複雜度必須是有意識且可審查的決策，而非預設做法。

### V. 可重現流程與 Git 驗證點
每個階段（Specify/Plan/Tasks/Implement/Review）MUST 定義可重現的 Git 驗證點
（例如 `git status` 乾淨度檢查、提交前檢查、必要測試命令）。若為網站專案，
預設 MUST 以前端靜態網站為主，並優先採可部署至 GitHub Pages 的結構。

Rationale: 可重現檢查可降低協作落差；網站預設策略可減少不必要後端負擔並加速上線。

## Engineering Standards

- `tasks.md` MUST 保持可追蹤進度：任務執行時需持續更新勾選狀態，且勾選需對應可驗證產出。
- Implement 階段 MUST 避免刪除、覆蓋或重置規格文件（尤其是 `spec.md`、`plan.md`、`tasks.md`）；
  套用模板時僅允許最小必要差異更新。
- 行為變更 MUST 在 `spec.md` 具備可驗收情境與可衡量成功標準。
- 技術未知項 MUST 以 `NEEDS CLARIFICATION` 或等價標記顯式揭露，並在進入實作前解決。

## Workflow and Quality Gates

1. Specify: 以繁體中文建立或更新 `spec.md`，包含優先序故事、驗收情境、邊界條件與成功指標。
2. Plan: 產出 `plan.md` 並完成 Constitution Check，確認最小可行方案與 TDD 策略。
3. Tasks: 建立 `tasks.md`，以故事分組，且測試任務在實作任務之前。
4. Implement: 依優先序執行並即時維護 `tasks.md` 勾選進度，不得刪除或覆蓋規格文件。
5. Review: PR MUST 附上需求追溯、測試證據與各階段 Git 驗證點執行證據。

## Governance

本憲章優先於本儲存庫中其他交付慣例。修訂 MUST 同時滿足：
(1) 有文件化提案，(2) 已同步更新受影響模板或指引，(3) 依版本政策更新版本。

本憲章採語意化版本：
- MAJOR: 不相容治理變更，或原則移除/重大重定義。
- MINOR: 新增原則/章節，或強制規範實質擴充。
- PATCH: 不改變語義的文字澄清、措辭修正與排版改善。

合規審查 MUST 至少在 Plan 階段（Constitution Check）與 PR Review 階段執行。
不合規變更 MUST 被阻擋，或需有具期限的例外核准與理由。

**Version**: 1.1.0 | **Ratified**: 2026-03-06 | **Last Amended**: 2026-03-06
