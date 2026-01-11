# Design: Winners Tracking and Locking

## Architecture
本系统采用 FastAPI 后端和 Vue 3 (Pinia) 前端。抽奖结果通过 POST 请求发送至 `/api/projects/{project_id}/draw`。

### Backend Data Flow
1. `ProjectDetail` Schema 定义了 `winners: List[Winner]`。
2. 当调用 `GET /api/projects/{project_id}` 时，SQLAlchemy 会根据模型定义填充数据。
3. 之前由于 `models.Project` 缺少 `winners` 关系，即使数据库中有记录，SQLAlchemy 也不会在查询结果对象上暴露该属性。

### Frontend Reactivity
1. `ProjectView.vue` 通过 `projectStore.currentProject` 响应式引用数据。
2. `currentPrizeWinners` 是一个基于 `project.winners` 的计算属性。
3. `isFinished` 依赖于 `currentPrizeWinners.length`。
4. 一旦后端模型修复，数据流将恢复正常，UI 将自动反映最新状态。

## Implementation Details
### Backend Model Update
在 `backend/app/models.py` 中：
```python
class Project(Base):
    # ...
    winners = relationship("Winner", back_populates="project", cascade="all, delete-orphan")

class Winner(Base):
    # ...
    project = relationship("Project", back_populates="winners")
```

### Frontend Validation
确认 `ProjectView.vue` 的 `handleStop` 在 `await projectStore.recordWinners(...)` 之后，数据已同步：
```ts
await projectStore.recordWinners(props.id, drawData)
// 由于 recordWinners 内部会调用 fetchProjectDetail，
// currentProject 会被更新，触发计算属性重新计算。
```
