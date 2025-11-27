import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, Circle, AlertCircle, Clock } from "lucide-react"

/**
 * 时间线项类型
 */
export interface TimelineItem {
    /** 唯一标识 */
    key?: string
    /** 标题 */
    title: React.ReactNode
    /** 描述内容 */
    description?: React.ReactNode
    /** 时间 */
    time?: React.ReactNode
    /** 状态 */
    status?: 'default' | 'success' | 'error' | 'pending'
    /** 自定义图标 */
    icon?: React.ReactNode
    /** 自定义颜色 */
    color?: string
}

/**
 * Timeline 组件属性
 */
export interface TimelineProps {
    /** 时间线项 */
    items: TimelineItem[]
    /** 模式 */
    mode?: 'left' | 'right' | 'alternate'
    /** 是否倒序 */
    reverse?: boolean
    /** 是否显示尾部 */
    pending?: React.ReactNode
    /** 自定义类名 */
    className?: string
}

/**
 * 状态图标映射
 */
const statusIcons = {
    default: <Circle className="h-3 w-3" />,
    success: <Check className="h-3 w-3" />,
    error: <AlertCircle className="h-3 w-3" />,
    pending: <Clock className="h-3 w-3" />
}

/**
 * 状态颜色映射
 */
const statusColors = {
    default: 'bg-muted-foreground',
    success: 'bg-green-500',
    error: 'bg-red-500',
    pending: 'bg-yellow-500'
}

/**
 * Timeline - 时间线
 * 用于展示时间流信息
 * 
 * @example
 * ```tsx
 * <Timeline
 *   items={[
 *     { title: '创建订单', time: '2024-01-01', status: 'success' },
 *     { title: '支付完成', time: '2024-01-02', status: 'success' },
 *     { title: '配送中', time: '2024-01-03', status: 'pending' },
 *   ]}
 * />
 * ```
 */
const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
    ({
        items,
        mode = 'left',
        reverse = false,
        pending,
        className,
    }, ref) => {
        // 处理倒序
        const displayItems = reverse ? [...items].reverse() : items

        // 如果有 pending，添加到末尾
        const allItems = pending
            ? [...displayItems, { title: pending, status: 'pending' as const }]
            : displayItems

        return (
            <div
                ref={ref}
                className={cn(
                    "relative",
                    mode === 'alternate' && "max-w-2xl mx-auto",
                    className
                )}
            >
                {allItems.map((item, index) => {
                    const status = item.status || 'default'
                    const isLast = index === allItems.length - 1

                    return (
                        <div
                            key={item.key || index}
                            className={cn(
                                "relative flex",
                                mode === 'alternate' && "justify-center",
                                mode === 'right' && "flex-row-reverse"
                            )}
                        >
                            {/* 左侧内容（alternate 模式） */}
                            {mode === 'alternate' && (
                                <div className={cn(
                                    "flex-1 pr-8",
                                    index % 2 === 0 ? "text-right" : "invisible"
                                )}>
                                    {index % 2 === 0 && (
                                        <>
                                            <div className="font-medium">{item.title}</div>
                                            {item.description && (
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {item.description}
                                                </div>
                                            )}
                                            {item.time && (
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {item.time}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                            {/* 时间线节点 */}
                            <div className="relative flex flex-col items-center">
                                {/* 节点 */}
                                <div
                                    className={cn(
                                        "w-8 h-8 flex items-center justify-center border-2 border-border bg-background z-10",
                                        item.color ? '' : statusColors[status].replace('bg-', 'border-')
                                    )}
                                    style={item.color ? { borderColor: item.color } : undefined}
                                >
                                    {item.icon || (
                                        <span className={cn(
                                            "text-white",
                                            item.color ? '' : statusColors[status]
                                        )} style={item.color ? { color: item.color } : undefined}>
                                            {statusIcons[status]}
                                        </span>
                                    )}
                                </div>

                                {/* 连接线 */}
                                {!isLast && (
                                    <div className="w-0.5 flex-1 min-h-[40px] bg-border" />
                                )}
                            </div>

                            {/* 右侧内容 */}
                            <div className={cn(
                                "flex-1 pb-8",
                                mode === 'left' && "pl-4",
                                mode === 'right' && "pr-4 text-right",
                                mode === 'alternate' && "pl-8",
                                mode === 'alternate' && index % 2 === 0 && "invisible"
                            )}>
                                {(mode !== 'alternate' || index % 2 === 1) && (
                                    <>
                                        <div className="font-medium">{item.title}</div>
                                        {item.description && (
                                            <div className="text-sm text-muted-foreground mt-1">
                                                {item.description}
                                            </div>
                                        )}
                                        {item.time && (
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {item.time}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
)
Timeline.displayName = "Timeline"

export { Timeline }
