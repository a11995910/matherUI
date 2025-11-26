/**
 * Tag 标签组件
 * 用于标记和分类，支持多种颜色和可关闭功能
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

/** Tag 样式变体 */
const tagVariants = cva(
    "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium border-2 transition-colors",
    {
        variants: {
            /** 颜色变体 */
            variant: {
                default: "bg-primary text-primary-foreground border-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                secondary: "bg-secondary text-secondary-foreground border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                outline: "bg-background text-foreground border-border",
                success: "bg-green-500 text-white border-green-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                warning: "bg-yellow-500 text-black border-yellow-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                error: "bg-red-500 text-white border-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                info: "bg-blue-500 text-white border-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            },
            /** 尺寸变体 */
            size: {
                sm: "text-xs px-2 py-0",
                default: "text-xs px-2.5 py-0.5",
                lg: "text-sm px-3 py-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

/** Tag 组件 Props */
export interface TagProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof tagVariants> {
    /** 是否可关闭 */
    closable?: boolean
    /** 关闭时的回调 */
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
    /** 自定义关闭图标 */
    closeIcon?: React.ReactNode
    /** 标签图标 */
    icon?: React.ReactNode
    /** 是否显示边框 */
    bordered?: boolean
}

/**
 * Tag - 标签组件
 * 
 * @example
 * ```tsx
 * // 基本用法
 * <Tag>标签</Tag>
 * 
 * // 不同颜色
 * <Tag variant="success">成功</Tag>
 * <Tag variant="warning">警告</Tag>
 * <Tag variant="error">错误</Tag>
 * 
 * // 可关闭
 * <Tag closable onClose={() => console.log('closed')}>
 *   可关闭标签
 * </Tag>
 * ```
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
    (
        {
            className,
            variant,
            size,
            closable = false,
            onClose,
            closeIcon,
            icon,
            bordered = true,
            children,
            ...props
        },
        ref
    ) => {
        const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            onClose?.(e)
        }

        return (
            <span
                ref={ref}
                className={cn(
                    tagVariants({ variant, size }),
                    !bordered && "border-transparent shadow-none",
                    className
                )}
                {...props}
            >
                {/* 前置图标 */}
                {icon && <span className="mr-0.5">{icon}</span>}

                {/* 内容 */}
                {children}

                {/* 关闭按钮 */}
                {closable && (
                    <button
                        type="button"
                        onClick={handleClose}
                        className="ml-0.5 -mr-1 p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                        aria-label="关闭"
                    >
                        {closeIcon || <X className="h-3 w-3" />}
                    </button>
                )}
            </span>
        )
    }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
