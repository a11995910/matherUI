/**
 * Steps 步骤条组件
 * 用于引导用户按照流程完成任务
 */

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

/** 单个步骤的数据 */
export interface StepItem {
    /** 步骤标题 */
    title: string
    /** 步骤描述 */
    description?: string
    /** 步骤图标 */
    icon?: React.ReactNode
    /** 是否禁用 */
    disabled?: boolean
}

/** Steps 组件 Props */
export interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** 步骤数据 */
    items: StepItem[]
    /** 当前步骤（从 0 开始） */
    current?: number
    /** 步骤方向 */
    direction?: "horizontal" | "vertical"
    /** 尺寸 */
    size?: "sm" | "default" | "lg"
    /** 点击步骤时的回调 */
    onChange?: (current: number) => void
    /** 是否可点击 */
    clickable?: boolean
}

/** Step 状态 */
type StepStatus = "wait" | "process" | "finish" | "error"

/**
 * 获取步骤状态
 */
function getStepStatus(index: number, current: number): StepStatus {
    if (index < current) return "finish"
    if (index === current) return "process"
    return "wait"
}

/**
 * Steps - 步骤条组件
 * 
 * @example
 * ```tsx
 * const [current, setCurrent] = useState(1)
 * 
 * <Steps
 *   current={current}
 *   items={[
 *     { title: "第一步", description: "填写基本信息" },
 *     { title: "第二步", description: "上传资料" },
 *     { title: "第三步", description: "完成" },
 *   ]}
 *   onChange={setCurrent}
 *   clickable
 * />
 * ```
 */
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
    (
        {
            className,
            items,
            current = 0,
            direction = "horizontal",
            size = "default",
            onChange,
            clickable = false,
            ...props
        },
        ref
    ) => {
        // 尺寸映射
        const sizeClasses = {
            sm: { icon: "w-6 h-6 text-xs", title: "text-sm", desc: "text-xs" },
            default: { icon: "w-8 h-8 text-sm", title: "text-base", desc: "text-sm" },
            lg: { icon: "w-10 h-10 text-base", title: "text-lg", desc: "text-base" },
        }

        const handleClick = (index: number, disabled?: boolean) => {
            if (clickable && !disabled && onChange) {
                onChange(index)
            }
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "flex",
                    direction === "vertical" ? "flex-col" : "flex-row items-start",
                    className
                )}
                {...props}
            >
                {items.map((item, index) => {
                    const status = getStepStatus(index, current)
                    const isLast = index === items.length - 1

                    return (
                        <div
                            key={index}
                            className={cn(
                                "flex",
                                direction === "vertical"
                                    ? "flex-row"
                                    : "flex-col items-center flex-1",
                                clickable && !item.disabled && "cursor-pointer"
                            )}
                            onClick={() => handleClick(index, item.disabled)}
                        >
                            {/* 步骤指示器区域 */}
                            <div
                                className={cn(
                                    "flex items-center",
                                    direction === "horizontal" && "w-full"
                                )}
                            >
                                {/* 左侧连接线（垂直模式） */}
                                {direction === "vertical" && index > 0 && (
                                    <div className="w-8 flex justify-center">
                                        <div
                                            className={cn(
                                                "w-0.5 h-4 -mt-4",
                                                status === "wait" ? "bg-border" : "bg-primary"
                                            )}
                                        />
                                    </div>
                                )}

                                {/* 步骤图标 */}
                                <div
                                    className={cn(
                                        "flex items-center justify-center border-2 font-bold transition-colors",
                                        sizeClasses[size].icon,
                                        status === "finish" && "bg-primary border-primary text-primary-foreground",
                                        status === "process" && "bg-primary border-primary text-primary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                                        status === "wait" && "bg-muted border-border text-muted-foreground",
                                        item.disabled && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {item.icon ? (
                                        item.icon
                                    ) : status === "finish" ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>

                                {/* 连接线（水平模式） */}
                                {direction === "horizontal" && !isLast && (
                                    <div
                                        className={cn(
                                            "flex-1 h-0.5 mx-2",
                                            index < current ? "bg-primary" : "bg-border"
                                        )}
                                    />
                                )}
                            </div>

                            {/* 步骤内容 */}
                            <div
                                className={cn(
                                    direction === "vertical" ? "ml-3 pb-6" : "mt-2 text-center px-2",
                                    isLast && direction === "vertical" && "pb-0"
                                )}
                            >
                                <div
                                    className={cn(
                                        "font-bold",
                                        sizeClasses[size].title,
                                        status === "wait" && "text-muted-foreground",
                                        item.disabled && "opacity-50"
                                    )}
                                >
                                    {item.title}
                                </div>
                                {item.description && (
                                    <div
                                        className={cn(
                                            "text-muted-foreground mt-0.5",
                                            sizeClasses[size].desc,
                                            item.disabled && "opacity-50"
                                        )}
                                    >
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
)
Steps.displayName = "Steps"

export { Steps }
