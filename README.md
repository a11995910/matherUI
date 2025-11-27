# MatherUI

<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB.svg" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg" alt="TypeScript" />
</div>

<p align="center">
  <strong>一个具有独特复古/野兽派风格的 React 组件库</strong>
</p>

<p align="center">
  MatherUI 是一个受 MotherDuck 启发的 React 组件库，采用大胆的设计语言：2px 纯黑边框、硬阴影、高对比度配色。
</p>

## ✨ 特性

- 🎨 **独特美学** - 复古/野兽派设计风格，大胆的黑色边框和硬阴影
- 📦 **丰富组件** - 45+ 个精心设计的 UI 组件
- 🔧 **TypeScript** - 完整的类型定义支持
- 🎯 **易于定制** - 基于 Tailwind CSS，轻松定制样式
- ♿ **可访问性** - 遵循 WAI-ARIA 设计模式
- 📱 **响应式** - 所有组件都支持响应式设计

## 📦 安装

```bash
npm install matherui
# 或
yarn add matherui
# 或
pnpm add matherui
```

## 🚀 快速开始

### 1. 前置要求

确保你的项目已配置 [Tailwind CSS](https://tailwindcss.com/docs/installation)。

### 2. 配置 Tailwind CSS

在你的 `tailwind.config.js` 中添加 MatherUI 的路径和主题配置：

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // 添加 MatherUI 组件路径
    "./node_modules/matherui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // MatherUI 主题配色
      colors: {
        background: "#fbf9f5",
        foreground: "#1a1a1a",
        primary: { DEFAULT: "#66b3ff", foreground: "#000000" },
        secondary: { DEFAULT: "#ff8f4d", foreground: "#000000" },
        muted: { DEFAULT: "#f0eee9", foreground: "#666666" },
        border: "#000000",
        card: { DEFAULT: "#ffffff", foreground: "#1a1a1a" },
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,1)',
        'retro-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
}
```

### 3. 导入样式（可选）

MatherUI 提供了预设的主题变量和暗色模式支持：

```tsx
// 在你的入口文件中导入
import 'matherui/styles.css'
```

如果你想完全自定义主题，可以跳过此步骤，直接在 Tailwind 配置中定义颜色变量。

### 4. 使用组件

```tsx
import { Button } from 'matherui'

function App() {
  return (
    <Button onClick={() => alert('Hello!')}>
      点击我
    </Button>
  )
}
```

## 📚 组件列表

### 基础组件
- **Button** - 按钮（多种变体）
- **Typography** - 排版组件（H1-H3、P）
- **Badge** - 徽章标签
- **Tag** - 可关闭标签

### 表单组件
- **Input** - 输入框
- **InputNumber** - 数字输入框
- **Textarea** - 多行文本输入
- **Checkbox** - 复选框
- **RadioGroup** - 单选按钮组
- **Switch** - 开关
- **Slider** - 滑块
- **Select** - 下拉选择
- **DatePicker** - 日期选择器
- **TimePicker** - 时间选择器
- **TreeSelect** - 树状选择器
- **Upload** - 文件上传
- **Label** - 表单标签

### 布局组件
- **Card** - 卡片容器
- **Container** - 响应式容器
- **Separator** - 分隔线

### 数据展示
- **Table** - 数据表格
- **Avatar** - 头像
- **Image** - 图片（预览、缩放）
- **Carousel** - 轮播图
- **Skeleton** - 加载占位
- **Progress** - 进度条
- **Spinner** - 加载动画
- **Empty** - 空状态
- **Rate** - 评分
- **Steps** - 步骤条
- **Timeline** - 时间线
- **Calendar** - 日历

### 导航组件
- **Menu** - 导航菜单
- **Tabs** - 标签页
- **Accordion** - 手风琴
- **Breadcrumb** - 面包屑
- **Pagination** - 分页
- **DropdownMenu** - 下拉菜单

### 反馈组件
- **Alert** - 提示框
- **Dialog** - 对话框/弹窗
- **Drawer** - 抽屉
- **Tooltip** - 工具提示
- **Toast** - 消息通知
- **Popover** - 气泡卡片

### 其他组件
- **CodeBlock** - 代码展示
- **ThemeToggle** - 主题切换

## 🎨 设计系统

### 配色方案
- **背景色**: `#fbf9f5` (米白色)
- **前景色**: `#1a1a1a` (近黑色)
- **主色**: `#66b3ff` (天蓝色)
- **次色**: `#ff8f4d` (橙色)
- **边框色**: `#000000` (纯黑)

### 排版
- **标题**: Merriweather (衬线字体)
- **正文**: Inter (无衬线字体)
- **代码**: 系统默认 Monospace

### 设计特色
- **边框**: 所有组件统一使用 2px 纯黑边框
- **阴影**: 硬阴影效果 `4px 4px 0px 0px #000`
- **圆角**: 无圆角或极小圆角（与传统圆润设计形成对比）

## 📖 文档

访问 [组件文档](./docs) 查看每个组件的详细使用说明。

## 🎯 示例

运行示例项目：

```bash
git clone https://github.com/a11995910/matherUI.git
cd matherUI
npm install
npm run dev
```

访问 `http://localhost:5174` 查看所有组件的实时演示。

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](./CONTRIBUTING.md)。

## 📄 许可证

MIT License - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 🙏 致谢

- 设计灵感来自 [MotherDuck](https://motherduck.com/)
- 基于 [Radix UI](https://www.radix-ui.com/) 构建
- 使用 [Tailwind CSS](https://tailwindcss.com/) 进行样式管理

---

<p align="center">
  Made with ❤️ by the MatherUI Team
</p>
