# Proposal: Fix Luck Draw Regression

## Problem
目前的抽奖应用中存在逻辑偏差：
1. 点击停止抽奖后，下方不显示中奖人名单（没有记录）。
2. 点击停止后，依然可以继续点击抽奖，没有正确锁定。

经分析，根本原因为后端 `Project` 模型缺少与 `Winner` 模型的关联关系，导致获取项目详情时 `winners` 列表为空。这进一步导致前端无法正确计算已中奖人数，从而无法显示名单且无法触发锁定逻辑。

## Proposed Changes
1. **后端模型修正**：
   - 在 `backend/app/models.py` 中为 `Project` 模型添加 `winners` 关系。
   - 在 `Winner` 模型中添加回向 `Project` 的关系。
2. **前端逻辑验证**：
   - 确认 `ProjectView.vue` 在获取到 `winners` 数据后能正确更新 UI。
   - 确保 `isFinished` 计算属性在达到抽奖人数上限后能正确禁用按钮。

## Expected Outcome
- 停止抽奖后，中奖名单立即出现在下方。
- 若奖项名额已满，抽奖按钮变为“该奖项已结束”并禁用。
- 刷新页面后，中奖记录依然存在且状态保持锁定。
