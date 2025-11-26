/**
 * Rate 评分组件
 * 用于对事物进行评级操作或展示评价
 */

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

/** Rate 组件 Props */
export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** 当前评分值 */
    value?: number
    /** 默认值（非受控模式） */
    defaultValue?: number
    /** 总星数 */
    count?: number
    /** 值变化回调 */
    onChange?: (value: number) => void
    /** 是否允许半选 */
    allowHalf?: boolean
    /** 是否允许清除（再次点击清零） */
    allowClear?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 是否只读 */
    readonly?: boolean
    /** 自定义字符 */
    character?: React.ReactNode
    /** 尺寸 */
    size?: "sm" | "default" | "lg"
    /** 自定义颜色 */
    color?: string
}

/**
 * Rate - 评分组件
 * 
 * @example
 * ```tsx
 * // 基本用法
 * const [value, setValue] = useState(3)
 * <Rate value={value} onChange={setValue} />
 * 
 * // 半选
 * <Rate allowHalf defaultValue={2.5} />
 * 
 * // 只读展示
 * <Rate value={4} readonly />
 * ```
 */
const Rate = React.forwardRef<HTMLDivElement, RateProps>(
    (
        {
            className,
            value: controlledValue,
            defaultValue = 0,
            count = 5,
            onChange,
            allowHalf = false,
            allowClear = true,
            disabled = false,
            readonly = false,
            character,
            size = "default",
            color,
            ...props
        },
        ref
    ) => {
        // 内部状态（非受控模式）
        const [internalValue, setInternalValue] = React.useState(defaultValue)
        // 悬停状态
        const [hoverValue, setHoverValue] = React.useState<number | null>(null)

        // 判断受控/非受控
        const isControlled = controlledValue !== undefined
        const currentValue = isControlled ? controlledValue : internalValue

        // 显示的值（悬停优先）
        const displayValue = hoverValue !== null ? hoverValue : currentValue

        // 尺寸映射
        const sizeClasses = {
            sm: "w-4 h-4",
            default: "w-6 h-6",
            lg: "w-8 h-8",
        }

        const gapClasses = {
            sm: "gap-0.5",
            default: "gap-1",
            lg: "gap-1.5",
        }

        // 处理点击
        const handleClick = (index: number, isHalf: boolean) => {
            if (disabled || readonly) return

            let newValue = isHalf ? index + 0.5 : index + 1

            // 允许清除时，再次点击相同值清零
            if (allowClear && newValue === currentValue) {
                newValue = 0
            }

            if (!isControlled) {
                setInternalValue(newValue)
            }
            onChange?.(newValue)
        }

        // 处理鼠标移动
        const handleMouseMove = (e: React.MouseEvent, index: number) => {
            if (disabled || readonly) return

            const target = e.currentTarget as HTMLElement
            const rect = target.getBoundingClientRect()
            const x = e.clientX - rect.left
            const isHalf = allowHalf && x < rect.width / 2

            setHoverValue(isHalf ? index + 0.5 : index + 1)
        }

        // 处理鼠标离开
        const handleMouseLeave = () => {
            if (disabled || readonly) return
            setHoverValue(null)
        }

        // 渲染单个星星
        const renderStar = (index: number) => {
            const isFull = displayValue >= index + 1
            const isHalf = allowHalf && displayValue >= index + 0.5 && displayValue < index + 1

            const starColor = color || (isFull || isHalf ? "#facc15" : undefined)

            return (
                <div
                    key={index}
                    className={cn(
                        "relative cursor-pointer transition-transform",
                        disabled && "cursor-not-allowed opacity-50",
                        readonly && "cursor-default",
                        !disabled && !readonly && "hover:scale-110"
                    )}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onClick={(e) => {
                        const target = e.currentTarget as HTMLElement
                        const rect = target.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const clickedHalf = allowHalf && x < rect.width / 2
                        handleClick(index, clickedHalf)
                    }}
                >
                    {/* 背景星星（空心） */}
                    <span className={cn("block", sizeClasses[size])}>
                        {character || (
                            <Star
                                className={cn(
                                    "w-full h-full",
                                    "text-muted-foreground/30"
                                )}
                            />
                        )}
                    </span>

                    {/* 前景星星（实心） */}
                    {(isFull || isHalf) && (
                        <span
                            className={cn(
                                "absolute inset-0 overflow-hidden",
                                sizeClasses[size]
                            )}
                            style={{ width: isHalf ? "50%" : "100%" }}
                        >
                            {character || (
                                <Star
                                    className="w-full h-full fill-current"
                                    style={{ color: starColor }}
                                />
                            )}
                        </span>
                    )}
                </div>
            )
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "inline-flex items-center",
                    gapClasses[size],
                    className
                )}
                onMouseLeave={handleMouseLeave}
                role="radiogroup"
                aria-label="评分"
                {...props}
            >
                {Array.from({ length: count }, (_, index) => renderStar(index))}
            </div>
        )
    }
)
Rate.displayName = "Rate"

export { Rate }
