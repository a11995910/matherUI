import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Marquee 组件属性
 */
export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 滚动方向 */
    direction?: 'left' | 'right'
    /** 动画持续时间（秒） */
    duration?: number
    /** 是否在悬停时暂停 */
    pauseOnHover?: boolean
    /** 是否反向（仅在 direction 基础上反向） */
    reverse?: boolean
    /** 间隔（重复内容之间的间距） */
    gap?: number
    /** 子元素 */
    children: React.ReactNode
}

/**
 * Marquee - 无限滚动/跑马灯组件
 * 内容无限循环滚动，支持悬停暂停
 * 使用精确的宽度计算实现真正的无缝循环
 * 
 * @example
 * ```tsx
 * <Marquee duration={20} pauseOnHover>
 *   <span>Item 1</span>
 *   <span>Item 2</span>
 *   <span>Item 3</span>
 * </Marquee>
 * ```
 */
const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
    ({
        direction = 'left',
        duration = 20,
        pauseOnHover = true,
        reverse = false,
        gap = 16,
        className,
        children,
        ...props
    }, ref) => {
        const contentRef = React.useRef<HTMLDivElement>(null)
        const [contentWidth, setContentWidth] = React.useState(0)
        const animationId = React.useId().replace(/:/g, '')

        const actualDirection = reverse 
            ? (direction === 'left' ? 'right' : 'left')
            : direction

        // 计算内容实际宽度
        React.useEffect(() => {
            if (contentRef.current) {
                const width = contentRef.current.offsetWidth
                setContentWidth(width + gap) // 加上 gap 确保无缝
            }
        }, [children, gap])

        // 动态生成 keyframes
        const keyframes = contentWidth > 0 ? `
            @keyframes marquee-${animationId} {
                from { transform: translateX(${actualDirection === 'left' ? '0' : `-${contentWidth}px`}); }
                to { transform: translateX(${actualDirection === 'left' ? `-${contentWidth}px` : '0'}); }
            }
        ` : ''

        return (
            <div
                ref={ref}
                className={cn(
                    "overflow-hidden",
                    className
                )}
                {...props}
            >
                <div
                    className={cn(
                        "flex w-max",
                        pauseOnHover && "hover:[animation-play-state:paused]"
                    )}
                    style={{
                        animation: contentWidth > 0 
                            ? `marquee-${animationId} ${duration}s linear infinite` 
                            : undefined,
                        gap: `${gap}px`,
                    }}
                >
                    {/* 原始内容 - 用于测量宽度 */}
                    <div 
                        ref={contentRef}
                        className="flex shrink-0 items-center" 
                        style={{ gap: `${gap}px` }}
                    >
                        {children}
                    </div>
                    {/* 复制内容 1 - 实现无缝循环 */}
                    <div 
                        className="flex shrink-0 items-center" 
                        style={{ gap: `${gap}px` }} 
                        aria-hidden
                    >
                        {children}
                    </div>
                    {/* 复制内容 2 - 确保长内容也能无缝 */}
                    <div 
                        className="flex shrink-0 items-center" 
                        style={{ gap: `${gap}px` }} 
                        aria-hidden
                    >
                        {children}
                    </div>
                </div>

                {/* 动态生成的关键帧动画 */}
                <style>{keyframes}</style>
            </div>
        )
    }
)
Marquee.displayName = "Marquee"

export { Marquee }
