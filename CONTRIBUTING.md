# 贡献指南

感谢您对影院管理系统项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 检查 [Issues](../../issues) 页面，确保问题未被报告
2. 创建新的 Issue，提供详细信息：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（操作系统、浏览器版本等）

### 提交代码

1. **Fork 项目**
   ```bash
   # 点击页面右上角的 Fork 按钮
   ```

2. **克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cinema-management-system.git
   cd cinema-management-system
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行修改**
   - 遵循项目的代码规范
   - 添加必要的注释
   - 确保代码可以正常运行

5. **提交更改**
   ```bash
   git add .
   git commit -m "描述你的更改"
   ```

   **提交信息规范：**
   - `feat: 新功能`
   - `fix: 修复bug`
   - `docs: 文档更新`
   - `style: 代码格式调整`
   - `refactor: 重构`
   - `test: 测试相关`
   - `chore: 构建/工具链相关`

6. **推送到远程**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 访问您的 Fork 仓库
   - 点击 "New Pull Request"
   - 填写 PR 标题和描述
   - 等待审核

## 开发规范

### 后端代码规范

- 遵循阿里巴巴 Java 开发规范
- 类名使用大驼峰命名法
- 方法名使用小驼峰命名法
- 常量使用全大写字母，下划线分隔
- 添加必要的注释和文档

### 前端代码规范

- 使用 TypeScript
- 组件名使用大驼峰命名法
- 变量和函数使用小驼峰命名法
- 使用 ESLint 和 Prettier 保证代码质量

### 数据库规范

- 表名使用小写字母，下划线分隔
- 字段名使用小写字母，下划线分隔
- 必要的索引和外键约束
- 使用逻辑删除

## 测试

在提交 PR 之前，请确保：

- 代码可以正常编译
- 所有功能正常运行
- 没有引入新的警告或错误

## 文档

如果您的更改涉及到：

- 新功能：请更新相关文档
- API 变更：请更新 API 文档
- 配置变更：请更新部署文档

## 行为准则

- 尊重他人
- 使用友好和包容的语言
- 接受建设性的批评
- 关注对社区最有利的事情

## 问题？

如果您有任何问题，请随时：

- 创建 Issue
- 发送邮件

感谢您的贡献！🎉

