/**
 * 组件文档类型定义
 * 用于统一管理文档数据结构
 */

import type { ReactNode } from "react"

/**
 * Props 表格行数据
 */
export interface PropItem {
    /** 属性名 */
    prop: string
    /** 类型 */
    type: string
    /** 默认值 */
    default: string
    /** 描述 */
    description: string
}

/**
 * 代码示例
 */
export interface CodeExample {
    /** 示例标题 */
    title: string
    /** 示例描述 */
    description?: string
    /** 演示组件 */
    demo: ReactNode
    /** 代码片段 */
    code: string
}

/**
 * 组件文档配置
 */
export interface ComponentDoc {
    /** 组件ID（用于锚点） */
    id: string
    /** 组件英文名 */
    name: string
    /** 组件中文名 */
    title: string
    /** 组件描述 */
    description: string
    /** 代码示例列表 */
    examples: CodeExample[]
    /** Props 表格数据 */
    props: PropItem[]
}

/**
 * 组件分类
 */
export interface ComponentCategory {
    /** 分类ID */
    id: string
    /** 分类名称 */
    name: string
    /** 是否为新增分类 */
    isNew?: boolean
    /** 该分类下的组件ID列表 */
    components: string[]
}

/**
 * 导航项
 */
export interface NavItem {
    /** 组件ID */
    id: string
    /** 显示名称（英文 + 中文） */
    label: string
    /** 锚点链接 */
    href: string
}

/**
 * 导航分类
 */
export interface NavCategory {
    /** 分类名称 */
    name: string
    /** 是否为新增 */
    isNew?: boolean
    /** 导航项列表 */
    items: NavItem[]
}
