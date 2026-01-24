# ui-and-history Specification

## Purpose
TBD - created by archiving change fix-ui-and-history. Update Purpose after archive.
## Requirements
### Requirement: Compact Start Button
开始抽奖按钮 SHALL 具有更小的内边距和字体大小，以使 UI 更加精致。

#### Scenario: Shrinking the start button size
- **GIVEN** I am on the ProjectView page
- **THEN** the "开始抽奖" button should have smaller padding and font size for a more refined look.

### Requirement: Reduced Layout Spacing
主舞台区域（展示抽奖过程或准备状态的框）SHALL 与上方标题栏保持自然的间距，减少多余的空白。

#### Scenario: Natural contact between stage and header
- **GIVEN** I have selected a prize but not yet started drawing
- **THEN** the "准备好开始了吗" box should be positioned higher, with minimal gap to the header.

### Requirement: Persistent Winner History
切换奖项后重新切回时，该奖项已产生的获奖名单 SHALL 保持显示。

#### Scenario: Viewing winners after switching prizes
- **GIVEN** I have drawn winners for Prize A
- **AND** I switch to Prize B
- **AND** I switch back to Prize A
- **THEN** the list of Prize A winners should still be visible on the screen.

