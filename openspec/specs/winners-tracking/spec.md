# winners-tracking Specification

## Purpose
TBD - created by archiving change fix-luck-draw-regression. Update Purpose after archive.
## Requirements
### Requirement: Get Project Details with Winners
获取项目详情时 MUST 包含该项目下的所有中奖记录。

#### Scenario: Successfully fetching project details
- **Given** a project exists with some recorded winners
- **When** calling `GET /api/projects/{id}`
- **Then** the response MUST include a `winners` field containing a list of all winners associated with that project.

### Requirement: Display Winners in Frontend
前端在加载或更新项目数据后，MUST 在页面下方显示当前所选奖项的中奖名单。

#### Scenario: Displaying current prize winners
- **Given** a user is viewing a prize in a project
- **When** the project data is loaded or updated (e.g., after a draw)
- **Then** the UI MUST display all winners for the currently selected prize in the winners list area below the drawing stage.

### Requirement: Lock Drawing When Prize is Finished
当某个奖项的中奖人数达到设定上限时，抽奖按钮 MUST 被禁用并显示结束状态。

#### Scenario: Disabling the start button
- **Given** the number of winners for the current prize has reached the prize's total count
- **When** the user views the drawing stage
- **Then** the "Start Draw" button MUST be disabled and its text MUST change to "该奖项已结束".

