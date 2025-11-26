/**
 * Empty 空状态组件
 * 用于展示空数据时的占位提示
 */

import * as React from "react"
import { cn } from "../../lib/utils"

/** Empty 组件 Props */
export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 自定义图标 */
    icon?: React.ReactNode
    /** 标题文字 */
    title?: string
    /** 描述文字 */
    description?: string
    /** 底部操作区域 */
    action?: React.ReactNode
    /** 图片地址（替代默认图标） */
    image?: string
    /** 图片样式 */
    imageStyle?: React.CSSProperties
}

/**
 * 默认空状态图标
 */
function DefaultEmptyIcon({ className }: { className?: string }) {
    return (
        <svg
            className={cn("text-muted-foreground", className)}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="8"
                y="16"
                width="48"
                height="36"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            />
            <path
                d="M8 24h48"
                stroke="currentColor"
                strokeWidth="2"
            />
            <circle cx="14" cy="20" r="2" fill="currentColor" />
            <circle cx="22" cy="20" r="2" fill="currentColor" />
            <circle cx="30" cy="20" r="2" fill="currentColor" />
            <rect x="20" y="32" width="24" height="4" rx="1" fill="currentColor" opacity="0.3" />
            <rect x="24" y="40" width="16" height="4" rx="1" fill="currentColor" opacity="0.3" />
        </svg>
    )
}

/**
 * Empty - 空状态组件
 * 
 * @example
 * ```tsx
 * <Empty description="暂无数据" />
 * 
 * <Empty 
 *   title="没有找到结果"
 *   description="请尝试其他搜索条件"
 *   action={<Button>重新搜索</Button>}
 * />
 * ```
 */
const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
    ({ className, icon, title, description = "暂无数据", action, image, imageStyle, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center justify-center py-12 px-4 text-center",
                    className
                )}
                {...props}
            >
                {/* 图标/图片区域 */}
                <div className="mb-4">
                    {image ? (
                        <img
                            src={image}
                            alt={title || "empty"}
                            style={imageStyle}
                            className="max-w-[120px] h-auto"
                        />
                    ) : icon ? (
                        icon
                    ) : (
                        <DefaultEmptyIcon className="w-16 h-16" />
                    )}
                </div>

                {/* 标题 */}
                {title && (
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        {title}
                    </h3>
                )}

                {/* 描述 */}
                {description && (
                    <p className="text-sm text-muted-foreground max-w-xs">
                        {description}
                    </p>
                )}

                {/* 操作区域 */}
                {action && (
                    <div className="mt-6">
                        {action}
                    </div>
                )}
            </div>
        )
    }
)
Empty.displayName = "Empty"

export { Empty }
