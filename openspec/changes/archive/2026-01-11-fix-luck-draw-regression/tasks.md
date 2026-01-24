# Tasks: Fix Luck Draw Regression

- [x] **Backend: Update Models**
  - [x] 修改 `backend/app/models.py` 中的 `Project` 模型，添加 `winners` 关系。
  - [x] 修改 `backend/app/models.py` 中的 `Winner` 模型，添加 `project` 关系。
  - [x] 验证后端 API `/api/projects/{id}` 返回的 JSON 中包含 `winners` 列表。

- [x] **Frontend: UI Verification**
  - [x] 验证 `frontend/src/views/ProjectView.vue` 下方的中奖名单在点击停止后正确显示。
  - [x] 验证中奖名单在页面刷新后依然显示。
  - [x] 验证抽奖按钮在名额已满时被禁用且显示“该奖项已结束”。

- [x] **Validation**
  - [x] 运行 `npx openspec validate fix-luck-draw-regression --strict` 确保规范一致性。
