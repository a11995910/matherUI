import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * TiltCard 组件属性
 */
export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 最大倾斜角度 */
    maxTilt?: number
    /** 是否启用缩放效果 */
    scale?: boolean
    /** 缩放比例 */
    scaleAmount?: number
    /** 透视距离 */
    perspective?: number
    /** 过渡速度（秒） */
    transitionSpeed?: number
    /** 子元素 */
    children: React.ReactNode
}

/**
 * TiltCard - 3D 倾斜卡片组件（性能优化版）
 * 直接操作 DOM 样式，避免 React 重渲染
 * 使用 requestAnimationFrame 节流
 * 
 * @example
 * ```tsx
 * <TiltCard maxTilt={15}>
 *   <Card>卡片内容</Card>
 * </TiltCard>
 * ```
 */
const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
    ({
        maxTilt = 10,
        scale = true,
        scaleAmount = 1.02,
        perspective = 1000,
        transitionSpeed = 0.15,
        className,
        children,
        ...props
    }, ref) => {
        const cardRef = React.useRef<HTMLDivElement>(null)
        const rafRef = React.useRef<number | null>(null)

        // 使用原生事件处理，直接操作 DOM，避免 React 重渲染
        React.useEffect(() => {
            const card = cardRef.current
            if (!card) return

            const handleMouseMove = (e: MouseEvent) => {
                // 使用 requestAnimationFrame 节流
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current)
                }

                rafRef.current = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect()
                    const centerX = rect.width / 2
                    const centerY = rect.height / 2

                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top

                    const rotateX = ((y - centerY) / centerY) * -maxTilt
                    const rotateY = ((x - centerX) / centerX) * maxTilt
                    const scaleValue = scale ? scaleAmount : 1

                    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleValue}, ${scaleValue}, ${scaleValue})`
                })
            }

            const handleMouseLeave = () => {
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current)
                }
                card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
            }

            card.addEventListener('mousemove', handleMouseMove, { passive: true })
            card.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current)
                }
                card.removeEventListener('mousemove', handleMouseMove)
                card.removeEventListener('mouseleave', handleMouseLeave)
            }
        }, [maxTilt, scale, scaleAmount, perspective])

        return (
            <div
                ref={(node) => {
                    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node
                    if (typeof ref === 'function') {
                        ref(node)
                    } else if (ref) {
                        ref.current = node
                    }
                }}
                className={cn(
                    "transform-gpu",
                    className
                )}
                style={{
                    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
                    transition: `transform ${transitionSpeed}s ease-out`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
                {...props}
            >
                {children}
            </div>
        )
    }
)
TiltCard.displayName = "TiltCard"

export { TiltCard }
