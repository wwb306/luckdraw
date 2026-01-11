# Project Context

## Purpose
本项目是一个**年会抽奖系统 (Lucky Draw Pro)**，旨在为企业年会或活动提供一个简单、有趣且功能强大的抽奖解决方案。

主要功能包括：
- **人员与奖项管理**：支持通过 Excel 模板批量导入参与者名单和奖项配置。
- **抽奖互动**：提供激动人心的滚动抽奖动画效果，支持分批次抽取。
- **数据导出**：支持将中奖结果导出为 Excel 文件。
- **本地化运行**：数据在浏览器端处理，无需复杂的后端部署。

## Tech Stack
- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Used for all UI styling, utilizing `slate` color palette and gradients)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Core Libraries**:
  - `xlsx`: Excel processing (Import/Export)
  - `canvas-confetti`: Celebration animations
  - `file-saver`: File saving capabilities

## Project Conventions

### Code Style
- **Components**: Functional Components with Hooks (`useState`, `useEffect`, `useRef`).
- **Styling**: Utility-first CSS using Tailwind classes directly in JSX.
- **Naming**:
  - Components: PascalCase (e.g., `ConfigPanel.tsx`)
  - Functions/Variables: camelCase (e.g., `handleStart`, `currentPrize`)
  - Files: Match export name.
- **Directory Structure**:
  - `src/components/`: UI Components
  - `src/utils/`: Helper functions (especially `excelHelper.ts`)
  - `src/types.ts`: TypeScript interfaces

### Architecture Patterns
- **Single Page Application (SPA)**: The entire app runs within `App.tsx` as the main orchestrator.
- **Local State Management**: Uses React `useState` for managing participants, prizes, and UI state.
- **Data Persistence**: Session-based. Data is loaded into memory from Excel and lost on refresh.
- **Separation of Concerns**: UI rendering is separated from complex data processing (Excel logic in `utils/`).

### Testing Strategy
- Currently, there are no explicit tests configured.
- *Future*: Consider adding unit tests for `utils/excelHelper.ts`.

### Git Workflow
- Standard feature-branch workflow.

## Domain Context
- **Participant (人员)**: Attributes: `id`, `name`, `um` (User ID), `department`.
- **Prize (奖项)**: Attributes: `id`, `tier`, `name`, `count`, `winners`, `image`.
- **Logic**:
  - Winners are removed from the available pool.
  - Draws can be done in batches (e.g., draw 5 winners at a time).

## Important Constraints
- **Client-Side Only**: Logic runs entirely in the browser.
- **Data Safety**: Refreshing the page **clears all data**.

## External Dependencies
- **Gemini API** (Optional/Template): Configured but not currently central to the core draw logic.
