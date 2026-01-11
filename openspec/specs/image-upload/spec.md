# image-upload Specification

## Purpose
TBD - created by archiving change localize-and-fix-ui. Update Purpose after archive.
## Requirements
### Requirement: Users can upload images for each prize tier
The system SHALL allow users to upload custom images for each prize tier. These images MUST be stored persistently as Base64 strings in the database.

#### Scenario: Uploading a new image for a prize
- **Given** I have opened the "系统设置" (System Settings) panel
- **When** I click "上传" (Upload) next to a prize and select an image file
- **Then** the image should be saved to the database as a Base64 string
- **And** the prize list in the settings panel should show the new image preview
- **And** the lucky draw screen should display the prize image when that prize is selected

