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
- 📦 **丰富组件** - 20+ 个精心设计的 UI 组件
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

### 1. 安装依赖

确保你的项目已安装以下依赖：

```bash
npm install react react-dom tailwindcss
```

### 2. 配置 Tailwind CSS

在 `tailwind.config.js` 中添加 MatherUI 的路径：

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/mather-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // MatherUI 的自定义配色
      colors: {
        background: "#fbf9f5",
        foreground: "#1a1a1a",
        primary: "#66b3ff",
        secondary: "#ff8f4d",
        // ... 更多颜色配置
      },
    },
  },
}
```

### 3. 使用组件

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
- **Input** - 输入框
- **Textarea** - 多行文本输入
- **Checkbox** - 复选框
- **Radio** - 单选按钮
- **Switch** - 开关
- **Slider** - 滑块
- **Progress** - 进度条

### 布局组件
- **Card** - 卡片容器
- **Container** - 响应式容器
- **Section** - 页面分区

### 数据展示
- **Table** - 数据表格
- **Badge** - 徽章标签
- **Avatar** - 头像
- **Skeleton** - 加载占位
- **Spinner** - 加载动画

### 导航组件
- **Navbar** - 导航栏
- **Footer** - 页脚
- **Tabs** - 标签页
- **Dropdown Menu** - 下拉菜单

### 反馈组件
- **Alert** - 提示框
- **Dialog** - 对话框/弹窗
- **Tooltip** - 工具提示
- **Toast** - 通知

### 其他组件
- **Accordion** - 手风琴
- **CodeBlock** - 代码展示
- **Typography** - 排版组件

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
