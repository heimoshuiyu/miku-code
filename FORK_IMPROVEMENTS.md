# Qwen Code Fork 改进点文档

## 概述

本文档记录了相对于 `origin/main` 分支，该 fork 项目所做的主要改进和优化。当前分支领先 `origin/main` 6 个提交，包含功能增强、代码重构和用户体验改进。

## 主要改进点

### 1. 系统消息控制功能 🆕

**提交**: `c2817be` - feat: disable system messages by default in config  
**提交**: `7f6f2d0` - feat: add system command and enhance builtin command loader with config updates

#### 改进内容：
- **默认禁用系统消息**：在配置中将 `enableSystemMessage` 默认值设为 `false`，减少不必要的系统消息干扰
- **新增 `/system` 命令**：提供完整的系统消息控制功能
  - `/system on` - 启用系统消息
  - `/system off` - 禁用系统消息  
  - `/system status` - 查看当前状态

#### 影响文件：
- `packages/core/src/config/config.ts` - 配置系统
- `packages/cli/src/ui/commands/systemCommand.ts` - 新增系统命令
- `packages/cli/src/services/BuiltinCommandLoader.ts` - 命令加载器增强
- `packages/core/src/core/openaiContentGenerator.ts` - 内容生成器适配

### 2. 环境变量 Token 限制配置 🆕

**提交**: `348b21f` - feat: DEFAULT_TOKEN_LIMIT env

#### 改进内容：
- **环境变量支持**：通过 `DEFAULT_TOKEN_LIMIT` 环境变量自定义默认 token 限制
- **灵活配置**：支持数值格式（如 `1000000`）和单位格式（如 `1M`、`1024K`）
- **向后兼容**：未设置环境变量时使用默认值 1,048,576 tokens

#### 影响文件：
- `packages/core/src/core/tokenLimits.ts` - Token 限制逻辑

### 3. 移除自动更新功能 🗑️

**提交**: `b408b09` - refac: remove auto-update functionality and related components

#### 改进内容：
- **简化架构**：完全移除自动更新相关功能，减少代码复杂度
- **清理依赖**：删除大量测试文件和实现代码
- **提升稳定性**：避免自动更新可能带来的不稳定因素

#### 删除文件：
- `packages/cli/src/ui/components/UpdateNotification.tsx`
- `packages/cli/src/ui/utils/updateCheck.ts`
- `packages/cli/src/utils/handleAutoUpdate.ts`
- `packages/cli/src/utils/installationInfo.ts`
- `packages/cli/src/utils/updateEventEmitter.ts`
- 相关测试文件（共删除 2726 行代码）

### 4. Ascii Art 优化 🎨

**提交**: `47a5bb3` - refac: MIKU AsciiArt

#### 改进内容：
- **代码简化**：重构 AsciiArt 组件，减少代码重复
- **统一风格**：保持三种尺寸的 logo 风格一致
- **性能优化**：移除冗余的导出和定义

#### 影响文件：
- `packages/cli/src/ui/components/AsciiArt.ts`

## 技术改进总结

### 代码质量提升
- ✅ 移除冗余的自动更新功能，简化代码架构
- ✅ 重构 AsciiArt 组件，提高代码可维护性
- ✅ 增强配置系统的灵活性和可扩展性

### 用户体验改进
- ✅ 提供系统消息的精细控制，减少干扰
- ✅ 支持环境变量配置，提高部署灵活性
- ✅ 简化功能集，专注于核心价值

### 系统稳定性
- ✅ 移除自动更新功能，避免潜在的稳定性问题
- ✅ 增强配置验证和错误处理
- ✅ 保持向后兼容性

## 配置说明

### 新增配置项
```typescript
// 系统消息控制（默认禁用）
enableSystemMessage: boolean = false

// 通过环境变量设置默认 token 限制
// 支持格式：1000000, 1M, 1024K
process.env.DEFAULT_TOKEN_LIMIT
```

### 使用示例
```bash
# 设置默认 token 限制
export DEFAULT_TOKEN_LIMIT=2M

# 在 CLI 中控制系统消息
/system on    # 启用系统消息
/system off   # 禁用系统消息
/system status # 查看状态
```

## 后续建议

1. **文档更新**：更新用户文档说明新的配置选项和命令
2. **测试覆盖**：为新增功能添加完整的测试用例
3. **性能监控**：监控 token 限制配置对性能的影响
4. **用户反馈**：收集用户对系统消息控制功能的反馈

---

*文档生成时间：2025-09-04*  
*基于提交：c2817be (领先 origin/main 6 个提交)*