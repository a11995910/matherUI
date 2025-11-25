/**
 * 文档模块统一导出
 */

// 类型
export type { PropItem, CodeExample, ComponentDoc, NavCategory, NavItem } from "./types"

// 配置
export { navConfig, getAllComponentIds, getComponentById } from "./config"

// 共享组件
export { PropsTable } from "./components/PropsTable"
export { DocSection, DocExample } from "./components/DocSection"
export { Sidebar } from "./components/Sidebar"

// 组件文档（按需导入）
export {
    ButtonDoc,
    InputDoc,
    LabelDoc,
    BreadcrumbDoc,
    PaginationDoc,
    ToastDoc,
    DrawerDoc,
    SeparatorDoc,
    TreeSelectDoc,
} from "./components/docs"
