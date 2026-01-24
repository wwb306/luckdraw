# Design: Toolbox Architecture

## Architecture Overview
为了将项目转变为工具箱，我们需要在前端引入“工具 (Tool)”的概念。

### Tool Metadata Definition
在 `frontend/src/types.ts` 中定义工具接口：
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any; // Lucide icon
  route: string;
  tags: string[];
}
```

### Components
- **`ToolboxHome.vue`** (New): 取代原有的 `Dashboard.vue` 作为 `/` 的默认视图。
  - 顶部包含搜索框。
  - 网格布局展示 `Tool` 列表。
  - 点击工具卡片跳转到对应路由。
- **`LuckyDrawDashboard.vue`** (Renamed from `Dashboard.vue`): 现有的抽奖应用管理页面。

### Routing Structure
更新 `frontend/src/router/index.ts`:
- `/` -> `ToolboxHome.vue`
- `/lucky-draw` -> `LuckyDrawDashboard.vue` (即原 Dashboard 逻辑)
- `/project/:id` -> `ProjectView.vue` (保持不变)

## UI/UX Design
- **Header**: 右上角固定搜索框（`Search` 图标 + Input）。
- **Main**: 响应式网格布局。
- **Search Logic**: 前端过滤工具列表。

## Documentation Updates
- `README.md`: 从“年会抽奖系统”重命名为“Toolbox - Daily Utility Tools”。
- `openspec/project.md`: 更新 Purpose 和 Tech Stack 描述。
