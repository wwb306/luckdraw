# Tasks: Project Toolbox Conversion

## Phase 1: Infrastructure & Meta-data
- [ ] 定义工具元数据结构
  - 修改 `frontend/src/types.ts`
  - 增加工具配置列表 (现阶段仅包含 Lucky Draw)
- [ ] 重构路由
  - 更新 `frontend/src/router/index.ts`
  - 创建新的主页组件 `frontend/src/views/Home.vue` (Toolbox 首页)
  - 将 `frontend/src/views/Dashboard.vue` 重命名或移动为抽奖应用入口

## Phase 2: Frontend Implementation
- [ ] 开发 Toolbox 首页
  - 实现工具网格展示
  - 实现搜索功能
- [ ] 集成现有的抽奖应用
  - 确保从 Toolbox 首页点击后能正确进入抽奖管理页面

## Phase 3: Documentation
- [ ] 更新项目说明文档
  - 修改 `README.md`
  - 修改 `openspec/project.md`

## Phase 4: Validation
- [ ] 手动测试主页搜索功能
- [ ] 手动测试工具跳转流程
