# 資料模型：001-basketball-game

**產出日期**：2026-03-13  
**來源規格**：`specs/001-basketball-game/spec.md`

---

## 實體定義

### 1. GameSession（遊戲局）

代表一次完整的遊戲對局。

| 欄位 | 型別 | 說明 | 驗證規則 |
|------|------|------|----------|
| `score` | `number` | 本局得分（進球數） | `>= 0`，`<= totalShots` |
| `totalShots` | `number` | 本局總球數（固定 10） | `=== 10`（MVP 固定值） |
| `shotsUsed` | `number` | 已投球數 | `0 <= shotsUsed <= totalShots` |
| `hits` | `number` | 本局進球數 | `0 <= hits <= shotsUsed` |
| `isOver` | `boolean` | 遊戲是否結束 | `shotsUsed === totalShots` 時為 `true` |
| `hitRate` | `number` | 命中率（唯讀計算屬性） | `hits / totalShots * 100`（%） |

**狀態轉移**：
```
IDLE → PLAYING → OVER
  │                │
  └── (再玩一次) ──┘
```
- `IDLE`：遊戲載入，尚未投球
- `PLAYING`：至少投過一球，尚有剩餘球數
- `OVER`：`shotsUsed === totalShots`，顯示結算畫面

---

### 2. Ball（籃球）

代表當前飛行中的籃球狀態（單例，每局共用）。

| 欄位 | 型別 | 說明 |
|------|------|------|
| `x` | `number` | 目前 X 座標（像素） |
| `y` | `number` | 目前 Y 座標（像素） |
| `vx` | `number` | X 軸速度（像素/幀） |
| `vy` | `number` | Y 軸速度（像素/幀） |
| `radius` | `number` | 球的半徑（固定值，像素） |
| `isFlying` | `boolean` | 球是否正在飛行中 |

**初始位置**：畫面底部中央偏右（模擬球員站位）。

**狀態轉移**：
```
IDLE → FLYING → SCORED (進球) → IDLE（重置）
             └→ MISSED  (落地) → IDLE（重置）
```

---

### 3. Hoop（籃框）

代表固定的籃框目標（不可移動，MVP 範疇）。

| 欄位 | 型別 | 說明 |
|------|------|------|
| `x` | `number` | 籃框中心 X 座標（像素） |
| `y` | `number` | 籃框中心 Y 座標（像素） |
| `radius` | `number` | 進球偵測半徑（像素） |
| `rimLeft` | `number` | 左側籃框邊緣 X（用於碰撞） |
| `rimRight` | `number` | 右側籃框邊緣 X（用於碰撞） |

**碰撞偵測規則**：
- 進球條件：球心在兩個籃框邊緣之間，且球的 Y 位置通過籃框 Y（由上往下穿越）
- `Math.hypot(ball.x - hoop.x, ball.y - hoop.y) <= hoop.radius` 作為近似偵測

---

### 4. HighScore（最高分紀錄）

儲存於瀏覽器 `localStorage` 的跨局次持久資料。

| 欄位 | 型別 | 說明 | 儲存鍵 |
|------|------|------|--------|
| `value` | `number` | 歷史最高得分 | `basketball_high_score` |

**驗證規則**：
- 存取時若 `localStorage` 不可用（隱私模式），退化為記憶體內的本局最高分
- `value >= 0`，為整數

---

### 5. InputState（輸入狀態）

追蹤玩家當前的指標拖曳操作（滑鼠或觸控）。

| 欄位 | 型別 | 說明 |
|------|------|------|
| `isAiming` | `boolean` | 是否正在瞄準（按下但未放開） |
| `startX` | `number` | 拖曳起點 X（畫布座標） |
| `startY` | `number` | 拖曳起點 Y（畫布座標） |
| `currentX` | `number` | 目前指標 X（畫布座標） |
| `currentY` | `number` | 目前指標 Y（畫布座標） |

---

## 關係圖

```
GameSession
  ├── 包含 1 個 Ball（當前球狀態）
  ├── 參照 1 個 Hoop（固定不變）
  ├── 關聯 1 個 HighScore（localStorage）
  └── 關聯 1 個 InputState（當前輸入）
```

---

## 計算衍生值

| 計算項目 | 公式 | 說明 |
|----------|------|------|
| 命中率 | `hits / totalShots * 100` | 遊戲結束時顯示 |
| 剩餘球數 | `totalShots - shotsUsed` | 畫面即時顯示 |
| 是否破紀錄 | `score > highScore.value` | 遊戲結束時判斷 |
| 投射初速度 | `drag * VELOCITY_MULTIPLIER` | 放開時計算 |

---

## 物理常數（參考 research.md）

| 常數 | 數值 | 說明 |
|------|------|------|
| `GRAVITY` | `0.5` px/frame² | 向下加速度 |
| `DAMPING` | `0.98` | 每幀速度衰減係數 |
| `VELOCITY_MULTIPLIER` | `0.15` | 拖曳距離轉初速倍率 |
| `TOTAL_SHOTS` | `10` | 每局球數 |
| `BALL_RADIUS` | `15` | 球的半徑（像素） |
