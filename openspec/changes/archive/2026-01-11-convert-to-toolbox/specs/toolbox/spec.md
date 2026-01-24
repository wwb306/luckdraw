# Specification Delta: Toolbox Platform

## MODIFIED Requirements

### Requirement: Platform Identity
本项目 SHALL 从单一的“抽奖应用”演变为“个人工具箱 (Toolbox)”，支持集成多种日常开发与办公工具。

#### Scenario: User Accesses Homepage
- **Given** 用户访问应用根路径 `/`
- **When** 页面加载完成
- **Then** 用户应看到一个包含所有可用工具列表的网格视图，并且右上角包含一个搜索框。

## ADDED Requirements

### Requirement: Tool Discovery
工具箱 SHALL 支持通过关键字搜索工具。

#### Scenario: User Searches for a Tool
- **Given** 用户在主页搜索框输入 "Lucky"
- **When** 搜索框内容发生变化
- **Then** 工具列表应动态过滤，仅显示名称或描述中包含 "Lucky" 的工具。

### Requirement: Tool Redirection
用户点击工具卡片后 SHALL 被引导至该工具的独立操作界面。

#### Scenario: User Opens Lucky Draw
- **Given** 用户在主页看到 "Lucky Draw Pro" 工具卡片
- **When** 用户点击该卡片
- **Then** 浏览器应跳转至 `/lucky-draw` 路径，显示抽奖项目管理界面。
