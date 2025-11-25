# 贡献指南

感谢您对 MatherUI 的贡献兴趣！本指南将帮助您参与项目开发。

## 目录

- [行为准则](#行为准则)
- [开始贡献](#开始贡献)
- [开发流程](#开发流程)
- [提交规范](#提交规范)
- [代码规范](#代码规范)

## 行为准则

我们致力于为所有人提供友好、安全和欢迎的环境。请：

- 保持尊重和专业
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

## 开始贡献

### 报告问题

如果您发现了 bug 或有功能建议：

1. 检查 [Issues](https://github.com/your-username/matherui/issues) 确保问题未被报告
2. 使用清晰具体的标题
3. 提供详细描述，包括：
   - 复现步骤
   - 期望行为
   - 实际行为
   - 环境信息（浏览器、Node 版本等）

### 提交 Pull Request

1. **Fork 仓库**
   ```bash
   git clone https://github.com/your-username/matherui.git
   cd matherui
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发**
   ```bash
   npm run dev
   ```

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new component"
   ```

6. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 填写 PR 模板
   - 关联相关 Issue
   - 等待审核

## 开发流程

### 添加新组件

1. 在 `src/components/ui/` 创建组件文件
2. 遵循现有组件的结构和风格
3. 确保组件支持亮色/暗色主题
4. 添加 TypeScript 类型定义
5. 在 `src/index.ts` 中导出组件
6. 在文档页面添加使用示例

### 组件开发规范

```tsx
// 使用 CVA (class-variance-authority) 管理变体
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  // 基础样式
  "border-2 border-border shadow-retro",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ComponentProps extends VariantProps<typeof componentVariants> {
  // 额外的 props
}

export function Component({ variant, className, ...props }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant }), className)} {...props} />
  )
}
```

### 样式规范

- 使用 Tailwind CSS
- 保持 2px 黑色边框：`border-2 border-border`
- 使用硬阴影：`shadow-retro`
- 支持主题：使用 `bg-card`, `text-foreground` 等主题变量
- 无圆角或极小圆角

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Type

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具改动

### 示例

```bash
feat(button): add icon support
fix(input): correct focus border color in dark mode
docs(readme): update installation guide
```

## 代码规范

### TypeScript

- 所有组件必须有类型定义
- 导出组件 Props 接口
- 避免使用 `any`

### React

- 使用 React 19 特性
- 优先使用函数组件
- 必要时使用 `React.memo` 优化性能

### 测试

- 为新组件编写测试
- 确保测试覆盖率 > 80%

```bash
npm run test
```

## 发布流程

仅限维护者：

1. 更新 `CHANGELOG.md`
2. 更新 `package.json` 版本号
3. 创建 Git tag
4. 运行 `npm publish`

## 需要帮助？

- 查看 [文档](https://github.com/your-username/matherui#readme)
- 查看 [Issues](https://github.com/your-username/matherui/issues)
- 加入讨论

感谢您的贡献！ ❤️
