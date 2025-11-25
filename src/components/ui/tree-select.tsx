/**
 * TreeSelect 树状选择器组件
 * 用于选择树形结构数据，如组织架构、角色权限等
 * 
 * @description 支持单选/多选、展开/折叠、搜索过滤等功能
 * @example
 * const treeData = [
 *   {
 *     id: '1',
 *     label: '技术部',
 *     children: [
 *       { id: '1-1', label: '前端组' },
 *       { id: '1-2', label: '后端组' },
 *     ]
 *   }
 * ]
 * 
 * <TreeSelect
 *   data={treeData}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="选择部门"
 * />
 */
import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { ChevronRight, ChevronDown, Check, Search, X, Building2, User, Folder } from "lucide-react"
import { cn } from "../../lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

// ============ 类型定义 ============

/** 树节点数据结构 */
export interface TreeNode {
    /** 唯一标识 */
    id: string
    /** 显示标签 */
    label: string
    /** 子节点 */
    children?: TreeNode[]
    /** 是否禁用 */
    disabled?: boolean
    /** 节点图标类型 */
    icon?: "folder" | "user" | "department" | React.ReactNode
    /** 额外数据 */
    data?: Record<string, unknown>
}

/** TreeSelect 组件属性 */
export interface TreeSelectProps {
    /** 树形数据 */
    data: TreeNode[]
    /** 选中的值（单选为字符串，多选为数组） */
    value?: string | string[]
    /** 值改变回调 */
    onChange?: (value: string | string[], nodes: TreeNode | TreeNode[]) => void
    /** 占位文本 */
    placeholder?: string
    /** 是否多选 */
    multiple?: boolean
    /** 是否可搜索 */
    searchable?: boolean
    /** 搜索占位文本 */
    searchPlaceholder?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 默认展开的节点ID */
    defaultExpandedKeys?: string[]
    /** 是否默认展开所有节点 */
    defaultExpandAll?: boolean
    /** 自定义类名 */
    className?: string
    /** 下拉面板最大高度 */
    maxHeight?: number
    /** 是否显示清除按钮 */
    clearable?: boolean
    /** 空数据提示文本 */
    emptyText?: string
}

// ============ 辅助函数 ============

/**
 * 根据ID查找节点
 */
const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
        if (node.id === id) return node
        if (node.children) {
            const found = findNodeById(node.children, id)
            if (found) return found
        }
    }
    return null
}

/**
 * 获取所有节点ID（用于默认展开所有）
 */
const getAllNodeIds = (nodes: TreeNode[]): string[] => {
    const ids: string[] = []
    const traverse = (nodeList: TreeNode[]) => {
        for (const node of nodeList) {
            ids.push(node.id)
            if (node.children) traverse(node.children)
        }
    }
    traverse(nodes)
    return ids
}

/**
 * 搜索过滤节点
 */
const filterNodes = (nodes: TreeNode[], keyword: string): TreeNode[] => {
    const result: TreeNode[] = []
    for (const node of nodes) {
        const matchSelf = node.label.toLowerCase().includes(keyword.toLowerCase())
        const filteredChildren = node.children ? filterNodes(node.children, keyword) : []
        
        if (matchSelf || filteredChildren.length > 0) {
            result.push({
                ...node,
                children: filteredChildren.length > 0 ? filteredChildren : node.children,
            })
        }
    }
    return result
}

// ============ 子组件：树节点 ============

interface TreeNodeItemProps {
    node: TreeNode
    level: number
    expandedKeys: Set<string>
    selectedKeys: Set<string>
    multiple: boolean
    onToggle: (id: string) => void
    onSelect: (node: TreeNode) => void
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
    node,
    level,
    expandedKeys,
    selectedKeys,
    multiple,
    onToggle,
    onSelect,
}) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedKeys.has(node.id)
    const isSelected = selectedKeys.has(node.id)

    // 渲染节点图标
    const renderIcon = () => {
        if (React.isValidElement(node.icon)) return node.icon
        switch (node.icon) {
            case "department":
                return <Building2 className="h-4 w-4 text-muted-foreground" />
            case "user":
                return <User className="h-4 w-4 text-muted-foreground" />
            case "folder":
            default:
                return hasChildren ? (
                    <Folder className="h-4 w-4 text-muted-foreground" />
                ) : null
        }
    }

    return (
        <div>
            <div
                className={cn(
                    "flex items-center gap-1 py-2 px-2 cursor-pointer",
                    "hover:bg-muted transition-colors",
                    "border-2 border-transparent",
                    isSelected && "bg-primary/10 border-primary",
                    node.disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={() => {
                    if (node.disabled) return
                    onSelect(node)
                }}
            >
                {/* 展开/折叠按钮 */}
                <button
                    type="button"
                    className={cn(
                        "h-5 w-5 flex items-center justify-center",
                        "hover:bg-accent rounded",
                        !hasChildren && "invisible"
                    )}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (hasChildren) onToggle(node.id)
                    }}
                >
                    {hasChildren && (
                        isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )
                    )}
                </button>

                {/* 多选框 */}
                {multiple && (
                    <div
                        className={cn(
                            "h-4 w-4 border-2 border-border flex items-center justify-center",
                            isSelected && "bg-primary border-primary"
                        )}
                    >
                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                )}

                {/* 图标 */}
                {renderIcon()}

                {/* 标签 */}
                <span className="text-sm font-medium flex-1">{node.label}</span>

                {/* 单选选中标记 */}
                {!multiple && isSelected && (
                    <Check className="h-4 w-4 text-primary" />
                )}
            </div>

            {/* 子节点 */}
            {hasChildren && isExpanded && (
                <div>
                    {node.children!.map((child) => (
                        <TreeNodeItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandedKeys={expandedKeys}
                            selectedKeys={selectedKeys}
                            multiple={multiple}
                            onToggle={onToggle}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// ============ 主组件 ============

/**
 * TreeSelect 树状选择器组件
 */
export const TreeSelect: React.FC<TreeSelectProps> = ({
    data,
    value,
    onChange,
    placeholder = "请选择",
    multiple = false,
    searchable = true,
    searchPlaceholder = "搜索...",
    disabled = false,
    defaultExpandedKeys = [],
    defaultExpandAll = false,
    className,
    maxHeight = 300,
    clearable = true,
    emptyText = "暂无数据",
}) => {
    // 弹出框状态
    const [open, setOpen] = useState(false)
    // 搜索关键词
    const [searchKeyword, setSearchKeyword] = useState("")
    // 展开的节点
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
        if (defaultExpandAll) {
            return new Set(getAllNodeIds(data))
        }
        return new Set(defaultExpandedKeys)
    })

    // 选中的节点ID集合
    const selectedKeys = useMemo(() => {
        if (!value) return new Set<string>()
        if (Array.isArray(value)) return new Set(value)
        return new Set([value])
    }, [value])

    // 过滤后的数据
    const filteredData = useMemo(() => {
        if (!searchKeyword) return data
        return filterNodes(data, searchKeyword)
    }, [data, searchKeyword])

    // 获取显示的标签
    const displayLabel = useMemo(() => {
        if (!value) return ""
        if (Array.isArray(value)) {
            if (value.length === 0) return ""
            const labels = value
                .map((id) => findNodeById(data, id)?.label)
                .filter(Boolean)
            return labels.join(", ")
        }
        return findNodeById(data, value)?.label || ""
    }, [value, data])

    // 切换展开状态
    const handleToggle = useCallback((id: string) => {
        setExpandedKeys((prev) => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }, [])

    // 选择节点
    const handleSelect = useCallback((node: TreeNode) => {
        if (multiple) {
            const currentValue = Array.isArray(value) ? value : []
            const newValue = selectedKeys.has(node.id)
                ? currentValue.filter((id) => id !== node.id)
                : [...currentValue, node.id]
            
            const selectedNodes = newValue
                .map((id) => findNodeById(data, id))
                .filter((n): n is TreeNode => n !== null)
            
            onChange?.(newValue, selectedNodes)
        } else {
            onChange?.(node.id, node)
            setOpen(false)
        }
    }, [multiple, value, selectedKeys, data, onChange])

    // 清除选择
    const handleClear = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(multiple ? [] : "", multiple ? [] : ({} as TreeNode))
    }, [multiple, onChange])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <button
                    type="button"
                    className={cn(
                        "flex items-center justify-between w-full",
                        "h-10 px-3 py-2 text-sm",
                        "border-2 border-border bg-background",
                        "shadow-retro hover:shadow-retro-hover",
                        "hover:translate-x-[2px] hover:translate-y-[2px]",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        "transition-all",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                >
                    <span className={cn(
                        "truncate",
                        !displayLabel && "text-muted-foreground"
                    )}>
                        {displayLabel || placeholder}
                    </span>
                    <div className="flex items-center gap-1">
                        {clearable && displayLabel && !disabled && (
                            <span
                                className="h-4 w-4 flex items-center justify-center hover:bg-muted rounded"
                                onClick={handleClear}
                            >
                                <X className="h-3 w-3" />
                            </span>
                        )}
                        <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            open && "rotate-180"
                        )} />
                    </div>
                </button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0"
                align="start"
            >
                {/* 搜索框 */}
                {searchable && (
                    <div className="p-2 border-b-2 border-border">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                className={cn(
                                    "w-full h-8 pl-8 pr-3 text-sm",
                                    "border-2 border-border bg-background",
                                    "focus:outline-none focus:ring-2 focus:ring-ring"
                                )}
                                placeholder={searchPlaceholder}
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* 树形列表 */}
                <div
                    className="overflow-y-auto"
                    style={{ maxHeight }}
                >
                    {filteredData.length > 0 ? (
                        filteredData.map((node) => (
                            <TreeNodeItem
                                key={node.id}
                                node={node}
                                level={0}
                                expandedKeys={expandedKeys}
                                selectedKeys={selectedKeys}
                                multiple={multiple}
                                onToggle={handleToggle}
                                onSelect={handleSelect}
                            />
                        ))
                    ) : (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            {emptyText}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}

TreeSelect.displayName = "TreeSelect"

export default TreeSelect
