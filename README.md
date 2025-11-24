# Antigravity Quota Watcher

一个用于实时监控 Antigravity AI 模型使用配额的 VS Code 插件。

## ✨ 功能特点

- **实时监控**：自动检测并定时轮询配额使用情况
- **状态栏显示**：在 VS Code 底部状态栏显示当前配额
- **智能预警**：配额不足时自动变色提醒
- **自动检测**：无需手动配置，自动检测 Antigravity 服务端口和认证信息

## 🔧 工作原理

插件通过以下步骤自动监控配额：

1. **进程检测**：扫描系统进程找到 `language_server_windows_x64.exe`
2. **端口识别**：自动解析进程参数获取 HTTP/HTTPS 端口
3. **认证获取**：自动提取 CSRF Token 用于 API 认证
4. **定时轮询**：按设定间隔调用 Antigravity API 获取配额数据
5. **状态更新**：在状态栏实时显示剩余配额和使用情况

## ⚙️ 配置选项

打开 VS Code 设置（`文件` > `首选项` > `设置`），搜索 `Antigravity Quota Watcher`：

### 启用自动监控
```json
"antigravityQuotaWatcher.enabled": true
```
- **类型**：布尔值
- **默认值**：`true`
- **说明**：是否启用自动配额监控

### 轮询间隔
```json
"antigravityQuotaWatcher.pollingInterval": 60
```
- **类型**：数字
- **默认值**：`60`（秒）
- **说明**：配额数据刷新频率，建议设置为 30-300 秒

### 警告阈值
```json
"antigravityQuotaWatcher.warningThreshold": 50
```
- **类型**：数字
- **默认值**：`50`（百分比）
- **说明**：配额低于此百分比时状态栏显示橙色警告

### 临界阈值
```json
"antigravityQuotaWatcher.criticalThreshold": 30
```
- **类型**：数字
- **默认值**：`30`（百分比）
- **说明**：配额低于此百分比时状态栏显示红色警告

### API 方法选择
```json
"antigravityQuotaWatcher.apiMethod": "GET_USER_STATUS"
```
- **类型**：枚举 `"GET_USER_STATUS"` 或 `"COMMAND_MODEL_CONFIG"`
- **默认值**：`"GET_USER_STATUS"`
- **说明**：
  - `GET_USER_STATUS`：获取完整配额信息（推荐）
  - `COMMAND_MODEL_CONFIG`：兼容模式，适用于部分环境

## 📋 使用方法

1. **安装插件**：在 VS Code 扩展市场搜索 "Antigravity Quota Watcher" 并安装
2. **启动 Antigravity**：确保 Antigravity 客户端正在运行
3. **自动监控**：插件会自动检测并开始监控，状态栏显示配额信息

### 命令面板

按 `Ctrl+Shift+P`（Windows）或 `Cmd+Shift+P`（Mac）打开命令面板，输入以下命令：

- **Antigravity: 刷新配额** - 手动刷新配额数据
- **Antigravity: 重新检测端口** - 重新检测 Antigravity 服务端口
- **Antigravity: 显示配额详情** - 查看详细配额信息（开发中）

## 🎯 状态栏说明

状态栏显示格式：`🚀 模型名称 X/Y (Z%)`

- **X**：已使用配额
- **Y**：总配额
- **Z%**：剩余百分比

### 三级颜色预警系统

状态栏背景色会根据剩余配额自动变化：

- **🟢 绿色**：剩余配额 ≥ 50%（充足）
- **🟠 橙色**：剩余配额 30%-50%（中等）
- **🔴 红色**：剩余配额 < 30%（不足）

您可以在设置中自定义 `warningThreshold`（橙色阈值）和 `criticalThreshold`（红色阈值）来调整预警级别。

## 📝 注意事项

- 插件需要 Antigravity 客户端运行才能正常工作
- 首次启动会延迟 6 秒开始监控，避免频繁请求
- 如果状态栏显示错误，可使用"重新检测端口"命令修复

## 📄 许可证

MIT License
