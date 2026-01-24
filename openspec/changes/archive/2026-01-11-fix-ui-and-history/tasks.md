# Tasks: Fix UI and History Display Issues

- [x] 调整按钮大小与布局间距 @frontend
    - [x] 在 `ProjectView.vue` 中修改开始按钮样式（减小 padding 和字体）
    - [x] 移除 `justify-center` 和底部 `spacer` 以减少内容上方间距
- [x] 修复历史记录显示逻辑 @frontend
    - [x] 修改 `ProjectView.vue` 中中奖名单容器的 `v-if` 条件，使其在有数据时始终显示
- [x] 验证修复 @validation
    - [x] 检查 UI 布局是否符合“自然接触”且按钮大小合适
    - [x] 验证切换奖项后中奖记录是否能正确恢复显示
