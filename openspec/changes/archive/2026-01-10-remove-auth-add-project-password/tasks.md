# Tasks: Remove Authentication and Add Project Password Protection

- [x] **Infrastructure & Types**
    - [x] 修改 `types.ts` 中的 `Project` 接口，添加 `password?: string`。
    - [x] 修改 `types.ts` 中的 `Project` 接口，将 `ownerId` 设为可选或移除。

- [x] **Storage Logic**
    - [x] 更新 `utils/storage.ts` 中的 `getProjects`，移除 `userId` 过滤逻辑。
    - [x] 更新 `utils/storage.ts` 中的 `createProject`，增加 `password` 参数并存储。
    - [x] 删除 `utils/storage.ts` 中所有与 `User` 相关的导出函数和常量（`getUsers`, `saveUser`, `loginUser`, `USERS` key）。

- [x] **Main Application Logic**
    - [x] 修改 `App.tsx`：
        - [x] 移除 `currentUser` 状态和 `handleLogin`/`handleLogout` 逻辑。
        - [x] 直接在根部控制 `currentProject` 的显示。
        - [x] 移除对 `LoginScreen` 的导入 and 渲染。

- [x] **Dashboard UI**
    - [x] 修改 `components/ProjectDashboard.tsx`：
        - [x] 移除 Header 中的用户信息和登出按钮。
        - [x] 更新 `ProjectDashboardProps` 接口，移除 `user` 和 `onLogout`。
        - [x] 在“创建项目”模态框中增加密码输入字段（`newProjectPassword`）。
        - [x] 实现点击项目卡片时的密码验证逻辑：
            - [x] 如果项目有密码，显示密码输入模态框。
            - [x] 验证通过后调用 `onSelectProject`。

- [x] **Cleanup**
    - [x] 删除 `components/LoginScreen.tsx`。
    - [x] 移除 `openspec/specs/auth/spec.md` (或将其标记为 Deprecated)。
    - [x] 更新 `openspec/specs/project-management/spec.md` 以反映无需登录和包含密码保护的新现状。
    - [x] 将本次变更的相关文件归档到 `openspec/changes/archive/`。
