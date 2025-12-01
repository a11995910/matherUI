import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

/**
 * Collapsible 组件属性
 */
export interface CollapsibleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** 标题内容 */
    title: React.ReactNode
    /** 默认是否展开 */
    defaultOpen?: boolean
    /** 受控模式：是否展开 */
    open?: boolean
    /** 展开状态变化回调 */
    onOpenChange?: (open: boolean) => void
    /** 标题额外样式 */
    titleClassName?: string
    /** 内容区域额外样式 */
    contentClassName?: string
    /** 图标位置 */
    iconPosition?: 'left' | 'right'
    /** 子元素 */
    children: React.ReactNode
}

/**
 * Collapsible - 折叠/展开组件
 * 支持受控和非受控模式，带平滑动画
 * 
 * @example
 * ```tsx
 * <Collapsible title="基础组件" defaultOpen>
 *   <div>Button</div>
 *   <div>Input</div>
 * </Collapsible>
 * ```
 */
const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
    ({
        title,
        defaultOpen = true,
        open: controlledOpen,
        onOpenChange,
        titleClassName,
        contentClassName,
        iconPosition = 'left',
        className,
        children,
        ...props
    }, ref) => {
        // 支持受控和非受控模式
        const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
        const isControlled = controlledOpen !== undefined
        const isOpen = isControlled ? controlledOpen : internalOpen

        const contentRef = React.useRef<HTMLDivElement>(null)
        const [contentHeight, setContentHeight] = React.useState<number | undefined>(
            defaultOpen ? undefined : 0
        )

        // 计算内容高度用于动画
        React.useEffect(() => {
            if (contentRef.current) {
                if (isOpen) {
                    const height = contentRef.current.scrollHeight
                    setContentHeight(height)
                    // 动画完成后移除固定高度，允许内容自适应
                    const timer = setTimeout(() => {
                        setContentHeight(undefined)
                    }, 200)
                    return () => clearTimeout(timer)
                } else {
                    // 先设置当前高度，再设为 0 触发动画
                    const height = contentRef.current.scrollHeight
                    setContentHeight(height)
                    requestAnimationFrame(() => {
                        setContentHeight(0)
                    })
                }
            }
        }, [isOpen])

        const handleToggle = () => {
            const newOpen = !isOpen
            if (!isControlled) {
                setInternalOpen(newOpen)
            }
            onOpenChange?.(newOpen)
        }

        return (
            <div
                ref={ref}
                className={cn("", className)}
                {...props}
            >
                {/* 标题栏 - 可点击 */}
                <button
                    type="button"
                    onClick={handleToggle}
                    className={cn(
                        "flex items-center w-full text-left gap-2 py-2 px-1 hover:bg-muted/50 transition-colors rounded",
                        titleClassName
                    )}
                    aria-expanded={isOpen}
                >
                    {iconPosition === 'left' && (
                        <ChevronDown 
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200",
                                isOpen ? "rotate-0" : "-rotate-90"
                            )} 
                        />
                    )}
                    <span className="flex-1 font-bold text-sm text-muted-foreground">
                        {title}
                    </span>
                    {iconPosition === 'right' && (
                        <ChevronDown 
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200",
                                isOpen ? "rotate-0" : "-rotate-90"
                            )} 
                        />
                    )}
                </button>

                {/* 内容区域 - 带高度动画 */}
                <div
                    ref={contentRef}
                    className={cn(
                        "overflow-hidden transition-[height] duration-200 ease-out",
                        contentClassName
                    )}
                    style={{ 
                        height: contentHeight !== undefined ? `${contentHeight}px` : 'auto'
                    }}
                >
                    <div className="pt-1">
                        {children}
                    </div>
                </div>
            </div>
        )
    }
)
Collapsible.displayName = "Collapsible"

export { Collapsible }
