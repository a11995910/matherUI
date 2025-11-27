import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

/**
 * 菜单项类型
 */
export interface MenuItem {
    /** 唯一标识 */
    key: string
    /** 显示标签 */
    label: React.ReactNode
    /** 图标 */
    icon?: React.ReactNode
    /** 子菜单 */
    children?: MenuItem[]
    /** 是否禁用 */
    disabled?: boolean
    /** 分割线（如果为 true，此项显示为分割线） */
    divider?: boolean
}

/**
 * Menu 组件属性
 */
export interface MenuProps {
    /** 菜单项 */
    items: MenuItem[]
    /** 菜单模式 */
    mode?: 'vertical' | 'horizontal' | 'inline'
    /** 当前选中的菜单项 key */
    selectedKey?: string
    /** 默认选中的菜单项 key */
    defaultSelectedKey?: string
    /** 当前展开的子菜单 key 数组 */
    openKeys?: string[]
    /** 默认展开的子菜单 key 数组 */
    defaultOpenKeys?: string[]
    /** 选中菜单项时的回调 */
    onSelect?: (key: string) => void
    /** 子菜单展开/收起的回调 */
    onOpenChange?: (openKeys: string[]) => void
    /** 是否折叠（仅 inline 模式有效） */
    collapsed?: boolean
    /** 自定义类名 */
    className?: string
}

/**
 * Menu - 导航菜单
 * 支持垂直、水平、内嵌三种模式
 * 
 * @example
 * ```tsx
 * <Menu
 *   mode="inline"
 *   items={[
 *     { key: 'home', label: '首页', icon: <HomeIcon /> },
 *     { key: 'settings', label: '设置', children: [...] }
 *   ]}
 *   onSelect={(key) => console.log(key)}
 * />
 * ```
 */
const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
    ({
        items,
        mode = 'vertical',
        selectedKey,
        defaultSelectedKey,
        openKeys,
        defaultOpenKeys = [],
        onSelect,
        onOpenChange,
        collapsed = false,
        className,
    }, ref) => {
        const [internalSelectedKey, setInternalSelectedKey] = React.useState(
            selectedKey || defaultSelectedKey || ''
        )
        const [internalOpenKeys, setInternalOpenKeys] = React.useState<string[]>(
            openKeys || defaultOpenKeys
        )

        // 同步外部 selectedKey
        React.useEffect(() => {
            if (selectedKey !== undefined) {
                setInternalSelectedKey(selectedKey)
            }
        }, [selectedKey])

        // 同步外部 openKeys
        React.useEffect(() => {
            if (openKeys !== undefined) {
                setInternalOpenKeys(openKeys)
            }
        }, [openKeys])

        // 选中菜单项
        const handleSelect = (key: string) => {
            setInternalSelectedKey(key)
            onSelect?.(key)
        }

        // 切换子菜单展开状态
        const toggleSubMenu = (key: string) => {
            const newOpenKeys = internalOpenKeys.includes(key)
                ? internalOpenKeys.filter(k => k !== key)
                : [...internalOpenKeys, key]
            setInternalOpenKeys(newOpenKeys)
            onOpenChange?.(newOpenKeys)
        }

        // 渲染菜单项
        const renderMenuItem = (item: MenuItem, level: number = 0) => {
            if (item.divider) {
                return (
                    <div
                        key={item.key}
                        className="my-2 border-t-2 border-border"
                    />
                )
            }

            const hasChildren = item.children && item.children.length > 0
            const isOpen = internalOpenKeys.includes(item.key)
            const isSelected = internalSelectedKey === item.key

            // 水平模式下的子菜单
            if (mode === 'horizontal' && hasChildren) {
                return (
                    <div key={item.key} className="relative group">
                        <button
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 transition-colors",
                                "hover:bg-muted",
                                item.disabled && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={item.disabled}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        <div className="absolute top-full left-0 hidden group-hover:block min-w-[160px] bg-background border-2 border-border shadow-retro z-50">
                            {item.children!.map(child => renderMenuItem(child, level + 1))}
                        </div>
                    </div>
                )
            }

            // 有子菜单的项
            if (hasChildren) {
                return (
                    <div key={item.key}>
                        <button
                            onClick={() => toggleSubMenu(item.key)}
                            className={cn(
                                "w-full flex items-center justify-between gap-2 px-4 py-2 transition-colors",
                                "hover:bg-muted",
                                item.disabled && "opacity-50 cursor-not-allowed",
                                mode === 'inline' && level > 0 && "pl-8"
                            )}
                            disabled={item.disabled}
                        >
                            <div className="flex items-center gap-2">
                                {item.icon}
                                {!collapsed && <span>{item.label}</span>}
                            </div>
                            {!collapsed && (
                                <ChevronRight
                                    className={cn(
                                        "h-4 w-4 transition-transform",
                                        isOpen && "rotate-90"
                                    )}
                                />
                            )}
                        </button>
                        {/* 子菜单 */}
                        {!collapsed && (
                            <div
                                className={cn(
                                    "overflow-hidden transition-all",
                                    isOpen ? "max-h-96" : "max-h-0"
                                )}
                            >
                                {item.children!.map(child => renderMenuItem(child, level + 1))}
                            </div>
                        )}
                    </div>
                )
            }

            // 普通菜单项
            return (
                <button
                    key={item.key}
                    onClick={() => !item.disabled && handleSelect(item.key)}
                    className={cn(
                        "w-full flex items-center gap-2 px-4 py-2 text-left transition-colors",
                        "hover:bg-muted",
                        isSelected && "bg-primary/10 border-l-4 border-primary font-medium",
                        item.disabled && "opacity-50 cursor-not-allowed",
                        mode === 'inline' && level > 0 && "pl-8",
                        mode === 'horizontal' && "w-auto"
                    )}
                    disabled={item.disabled}
                >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                </button>
            )
        }

        return (
            <nav
                ref={ref}
                className={cn(
                    "border-2 border-border bg-background",
                    mode === 'horizontal' && "flex items-center",
                    mode === 'vertical' && "min-w-[200px]",
                    mode === 'inline' && "min-w-[200px]",
                    collapsed && "min-w-[60px] w-[60px]",
                    className
                )}
            >
                {items.map(item => renderMenuItem(item))}
            </nav>
        )
    }
)
Menu.displayName = "Menu"

export { Menu }
