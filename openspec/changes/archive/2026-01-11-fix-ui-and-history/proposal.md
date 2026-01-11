# Proposal: Fix UI and History Display Issues

## Problem
1. **抽奖按钮过大**：当前的开始抽奖按钮占据空间较多，需要适当缩小。
2. **布局间距过大**：“准备好开始了吗”提示框与上方区域存在过多空白，需要自然接触。
3. **抽奖记录显示 Bug**：抽奖完成后，如果切换奖项再切回来，之前的抽奖记录（获奖名单）不会在页面上显示，除非再次开始抽奖或刷新。

## Proposed Changes
### UI 调整
- 修改 `ProjectView.vue` 中的按钮样式，减小 `padding` 和 `font-size`。
- 调整“准备好开始了吗”区域的布局，通过移除不必要的 `justify-center` 或 `spacer` 来减少间距。
- 确保布局在没有抽奖记录和有抽奖记录时都能保持紧凑和自然。

### 抽奖记录修复
- 修改 `ProjectView.vue` 中的 `Winners List` 显示逻辑。
- 目前 `v-if` 条件包含 `(isRolling || displayParticipants.length > 0)`，这导致在未开始滚动且没有临时显示名单（如刚切回该奖项）时，历史记录被隐藏。
- 应移除这个限制，只要有 `currentPrizeWinners` 就显示名单。

## Impact
- 提升 UI 视觉体验，使其更精致、紧凑。
- 确保用户能随时查看已抽出的获奖名单，提高系统的可靠性感知。
