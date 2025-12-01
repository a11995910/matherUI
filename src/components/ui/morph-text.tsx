import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * MorphText 组件属性
 */
export interface MorphTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** 要循环显示的文本数组 */
    texts: string[]
    /** 变形动画持续时间（毫秒） */
    morphDuration?: number
    /** 每个文本显示停留时间（毫秒） */
    displayDuration?: number
}

/**
 * MorphText - 文字变形动画组件
 * 文字平滑地变形为另一个词
 * 
 * @example
 * ```tsx
 * <MorphText texts={['创新', '设计', '体验']} />
 * ```
 */
const MorphText = React.forwardRef<HTMLSpanElement, MorphTextProps>(
    ({
        texts,
        morphDuration = 1000,
        displayDuration = 2000,
        className,
        ...props
    }, ref) => {
        const [currentIndex, setCurrentIndex] = React.useState(0)
        const [nextIndex, setNextIndex] = React.useState(1)
        const [morphProgress, setMorphProgress] = React.useState(0)
        const [isAnimating, setIsAnimating] = React.useState(false)

        const text1Ref = React.useRef<HTMLSpanElement>(null)
        const text2Ref = React.useRef<HTMLSpanElement>(null)
        const rafRef = React.useRef<number | null>(null)
        const startTimeRef = React.useRef<number | null>(null)

        // 变形动画
        const animateMorph = React.useCallback((timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp
            }

            const elapsed = timestamp - startTimeRef.current
            const progress = Math.min(elapsed / morphDuration, 1)

            // easeInOutQuad 缓动
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2

            setMorphProgress(eased)

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animateMorph)
            } else {
                // 动画完成
                setCurrentIndex(nextIndex)
                setNextIndex((nextIndex + 1) % texts.length)
                setMorphProgress(0)
                setIsAnimating(false)
                startTimeRef.current = null
            }
        }, [morphDuration, nextIndex, texts.length])

        // 定时触发变形
        React.useEffect(() => {
            const timeout = setTimeout(() => {
                if (!isAnimating) {
                    setIsAnimating(true)
                    rafRef.current = requestAnimationFrame(animateMorph)
                }
            }, displayDuration)

            return () => {
                clearTimeout(timeout)
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current)
                }
            }
        }, [currentIndex, isAnimating, displayDuration, animateMorph])

        // 应用模糊效果
        const blur1 = Math.min(8 * morphProgress, 8)
        const blur2 = Math.min(8 * (1 - morphProgress), 8)
        const opacity1 = 1 - morphProgress
        const opacity2 = morphProgress

        return (
            <span
                ref={ref}
                className={cn("relative inline-block", className)}
                {...props}
            >
                {/* 当前文本 */}
                <span
                    ref={text1Ref}
                    className="inline-block"
                    style={{
                        filter: `blur(${blur1}px)`,
                        opacity: opacity1,
                        position: isAnimating ? 'absolute' : 'relative',
                        left: 0,
                        top: 0,
                    }}
                >
                    {texts[currentIndex]}
                </span>

                {/* 下一个文本 */}
                {isAnimating && (
                    <span
                        ref={text2Ref}
                        className="inline-block"
                        style={{
                            filter: `blur(${blur2}px)`,
                            opacity: opacity2,
                        }}
                    >
                        {texts[nextIndex]}
                    </span>
                )}
            </span>
        )
    }
)
MorphText.displayName = "MorphText"

export { MorphText }
