/**
 * 组件文档索引
 * 在这里导出所有组件文档，方便统一管理
 * 
 * 添加新组件文档步骤：
 * 1. 在 docs/components/docs/ 目录创建 XxxDoc.tsx
 * 2. 在此文件中导出
 * 3. 在 docs/config.ts 的 navConfig 中添加导航项
 */

// 基础组件
export { ButtonDoc } from "./ButtonDoc"

// 表单组件
export { InputDoc } from "./InputDoc"
export { LabelDoc } from "./LabelDoc"

// 导航组件
export { BreadcrumbDoc } from "./BreadcrumbDoc"
export { PaginationDoc } from "./PaginationDoc"

// 反馈组件（新增）
export { ToastDoc } from "./ToastDoc"
export { DrawerDoc } from "./DrawerDoc"

// 布局组件（新增）
export { SeparatorDoc } from "./SeparatorDoc"

// 高级组件（新增）
export { TreeSelectDoc } from "./TreeSelectDoc"
export { DatePickerDoc } from "./DatePickerDoc"
export { StepsDoc } from "./StepsDoc"
export { RateDoc } from "./RateDoc"
export { TagDoc } from "./TagDoc"
export { EmptyDoc } from "./EmptyDoc"
