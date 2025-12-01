import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * GradientText 组件属性
 */
export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** 渐变颜色数组 */
    colors?: string[]
    /** 动画持续时间（秒） */
    duration?: number
    /** 是否启用动画 */
    animate?: boolean
    /** 渐变角度（度） */
    angle?: number
    /** 子元素 */
    children: React.ReactNode
}

/**
 * GradientText - 渐变动画文字组件
 * 文字显示流动的渐变色效果
 * 
 * @example
 * ```tsx
 * <GradientText colors={['#ff6b6b', '#4ecdc4', '#66b3ff']}>
 *   渐变文字
 * </GradientText>
 * ```
 */
const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
    ({
        colors = ['#66b3ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#66b3ff'],
        duration = 3,
        animate = true,
        angle = 90,
        className,
        children,
        ...props
    }, ref) => {
        const gradientId = React.useId()
        const gradientColors = colors.join(', ')

        return (
            <>
                <span
                    ref={ref}
                    className={cn(
                        "bg-clip-text text-transparent font-bold",
                        className
                    )}
                    style={{
                        backgroundImage: `linear-gradient(${angle}deg, ${gradientColors})`,
                        backgroundSize: animate ? '200% 200%' : '100% 100%',
                        animation: animate ? `gradient-flow-${gradientId} ${duration}s ease infinite` : undefined,
                    }}
                    {...props}
                >
                    {children}
                </span>

                {animate && (
                    <style>{`
                        @keyframes gradient-flow-${gradientId} {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `}</style>
                )}
            </>
        )
    }
)
GradientText.displayName = "GradientText"

/**
 * GradientBorder 组件属性
 */
export interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 渐变颜色数组 */
    colors?: string[]
    /** 动画持续时间（秒） */
    duration?: number
    /** 边框宽度 */
    borderWidth?: number
    /** 圆角 */
    borderRadius?: number
    /** 子元素 */
    children: React.ReactNode
}

/**
 * GradientBorder - 渐变动画边框组件
 * 
 * @example
 * ```tsx
 * <GradientBorder colors={['#ff6b6b', '#4ecdc4']}>
 *   <div>内容</div>
 * </GradientBorder>
 * ```
 */
const GradientBorder = React.forwardRef<HTMLDivElement, GradientBorderProps>(
    ({
        colors = ['#66b3ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#66b3ff'],
        duration = 3,
        borderWidth = 2,
        borderRadius = 0,
        className,
        children,
        ...props
    }, ref) => {
        const gradientId = React.useId()
        const gradientColors = colors.join(', ')

        return (
            <>
                <div
                    ref={ref}
                    className={cn("relative p-[2px]", className)}
                    style={{
                        padding: `${borderWidth}px`,
                        borderRadius: `${borderRadius}px`,
                        background: `linear-gradient(90deg, ${gradientColors})`,
                        backgroundSize: '200% 200%',
                        animation: `gradient-border-${gradientId} ${duration}s ease infinite`,
                    }}
                    {...props}
                >
                    <div
                        className="bg-background h-full w-full"
                        style={{ borderRadius: `${Math.max(0, borderRadius - borderWidth)}px` }}
                    >
                        {children}
                    </div>
                </div>

                <style>{`
                    @keyframes gradient-border-${gradientId} {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}</style>
            </>
        )
    }
)
GradientBorder.displayName = "GradientBorder"

export { GradientText, GradientBorder }
