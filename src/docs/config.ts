/**
 * 组件文档导航配置
 * 定义组件分类和导航结构
 */

import type { NavCategory } from "./types"

/**
 * 文档导航配置
 * 添加新组件时只需在对应分类的 items 中添加即可
 */
export const navConfig: NavCategory[] = [
    {
        name: "基础组件",
        items: [
            { id: "button", label: "Button 按钮", href: "#button" },
            { id: "typography", label: "Typography 排版", href: "#typography" },
            { id: "badge", label: "Badge 徽章", href: "#badge" },
        ],
    },
    {
        name: "表单组件",
        items: [
            { id: "input", label: "Input 输入框", href: "#input" },
            { id: "textarea", label: "Textarea 多行文本", href: "#textarea" },
            { id: "checkbox", label: "Checkbox 复选框", href: "#checkbox" },
            { id: "radio", label: "RadioGroup 单选组", href: "#radio" },
            { id: "switch", label: "Switch 开关", href: "#switch" },
            { id: "slider", label: "Slider 滑块", href: "#slider" },
        ],
    },
    {
        name: "数据展示",
        items: [
            { id: "card", label: "Card 卡片", href: "#card" },
            { id: "table", label: "Table 表格", href: "#table" },
            { id: "avatar", label: "Avatar 头像", href: "#avatar" },
            { id: "skeleton", label: "Skeleton 骨架屏", href: "#skeleton" },
            { id: "progress", label: "Progress 进度条", href: "#progress" },
            { id: "spinner", label: "Spinner 加载动画", href: "#spinner" },
        ],
    },
    {
        name: "反馈组件",
        items: [
            { id: "alert", label: "Alert 提示框", href: "#alert" },
        ],
    },
    {
        name: "导航组件",
        items: [
            { id: "tabs", label: "Tabs 标签页", href: "#tabs" },
            { id: "accordion", label: "Accordion 手风琴", href: "#accordion" },
            { id: "breadcrumb", label: "Breadcrumb 面包屑", href: "#breadcrumb" },
            { id: "pagination", label: "Pagination 分页", href: "#pagination" },
        ],
    },
    {
        name: "反馈组件（新增）",
        isNew: true,
        items: [
            { id: "toast", label: "Toast 消息提醒", href: "#toast" },
            { id: "drawer", label: "Drawer 抽屉", href: "#drawer" },
        ],
    },
    {
        name: "布局组件（新增）",
        isNew: true,
        items: [
            { id: "separator", label: "Separator 分隔线", href: "#separator" },
            { id: "label", label: "Label 表单标签", href: "#label" },
        ],
    },
    {
        name: "高级组件（新增）",
        isNew: true,
        items: [
            { id: "tree-select", label: "TreeSelect 树状选择器", href: "#tree-select" },
            { id: "date-picker", label: "DatePicker 日期选择", href: "#date-picker" },
            { id: "steps", label: "Steps 步骤条", href: "#steps" },
            { id: "rate", label: "Rate 评分", href: "#rate" },
            { id: "tag", label: "Tag 标签", href: "#tag" },
            { id: "empty", label: "Empty 空状态", href: "#empty" },
            { id: "input-number", label: "InputNumber 数字输入框", href: "#input-number" },
            { id: "time-picker", label: "TimePicker 时间选择器", href: "#time-picker" },
            { id: "upload", label: "Upload 文件上传", href: "#upload" },
            { id: "image", label: "Image 图片", href: "#image" },
            { id: "carousel", label: "Carousel 轮播图", href: "#carousel" },
            { id: "menu", label: "Menu 导航菜单", href: "#menu" },
            { id: "timeline", label: "Timeline 时间线", href: "#timeline" },
            { id: "calendar", label: "Calendar 日历", href: "#calendar" },
        ],
    },
]

/**
 * 获取所有组件ID列表
 */
export const getAllComponentIds = (): string[] => {
    return navConfig.flatMap(category => category.items.map(item => item.id))
}

/**
 * 根据ID获取组件信息
 */
export const getComponentById = (id: string) => {
    for (const category of navConfig) {
        const item = category.items.find(item => item.id === id)
        if (item) return { ...item, category: category.name }
    }
    return null
}
