import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Carousel 组件属性
 */
export interface CarouselProps {
    /** 子元素（轮播项） */
    children: React.ReactNode
    /** 是否自动播放 */
    autoplay?: boolean
    /** 自动播放间隔（毫秒） */
    autoplayInterval?: number
    /** 是否显示箭头 */
    arrows?: boolean
    /** 是否显示指示器 */
    dots?: boolean
    /** 指示器位置 */
    dotsPosition?: 'bottom' | 'top' | 'left' | 'right'
    /** 是否无限循环 */
    infinite?: boolean
    /** 动画速度（毫秒） */
    speed?: number
    /** 初始索引 */
    initialIndex?: number
    /** 切换回调 */
    onChange?: (index: number) => void
    /** 自定义类名 */
    className?: string
    /** 高度 */
    height?: number | string
}

/**
 * CarouselItem 组件属性
 */
export interface CarouselItemProps {
    children: React.ReactNode
    className?: string
}

/**
 * CarouselItem - 轮播项
 */
const CarouselItem: React.FC<CarouselItemProps> = ({ children, className }) => {
    return (
        <div className={cn("flex-shrink-0 w-full h-full", className)}>
            {children}
        </div>
    )
}
CarouselItem.displayName = "CarouselItem"

/**
 * Carousel - 轮播图/走马灯
 * 支持自动播放、无限循环、指示器
 * 
 * @example
 * ```tsx
 * <Carousel autoplay arrows>
 *   <CarouselItem><img src="/1.jpg" /></CarouselItem>
 *   <CarouselItem><img src="/2.jpg" /></CarouselItem>
 * </Carousel>
 * ```
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({
        children,
        autoplay = false,
        autoplayInterval = 3000,
        arrows = true,
        dots = true,
        dotsPosition = 'bottom',
        infinite = true,
        speed = 300,
        initialIndex = 0,
        onChange,
        className,
        height = 300,
    }, ref) => {
        const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
        const [isTransitioning, setIsTransitioning] = React.useState(false)
        const [isPaused, setIsPaused] = React.useState(false)
        const containerRef = React.useRef<HTMLDivElement>(null)
        const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

        // 获取子元素数组
        const items = React.Children.toArray(children)
        const itemCount = items.length

        // 处理无限循环：复制首尾元素
        const extendedItems = infinite
            ? [items[itemCount - 1], ...items, items[0]]
            : items
        const extendedIndex = infinite ? currentIndex + 1 : currentIndex

        // 切换到指定索引
        const goTo = React.useCallback((index: number, withTransition = true) => {
            if (isTransitioning) return

            let targetIndex = index
            if (infinite) {
                if (index < 0) targetIndex = itemCount - 1
                if (index >= itemCount) targetIndex = 0
            } else {
                if (index < 0) targetIndex = 0
                if (index >= itemCount) targetIndex = itemCount - 1
            }

            if (withTransition) setIsTransitioning(true)
            setCurrentIndex(targetIndex)
            onChange?.(targetIndex)
        }, [isTransitioning, itemCount, infinite, onChange])

        // 上一个
        const prev = () => goTo(currentIndex - 1)

        // 下一个
        const next = () => goTo(currentIndex + 1)

        // 处理无限循环过渡
        React.useEffect(() => {
            if (!infinite || !isTransitioning) return

            const timer = setTimeout(() => {
                setIsTransitioning(false)
            }, speed)

            return () => clearTimeout(timer)
        }, [currentIndex, infinite, isTransitioning, speed])

        // 自动播放
        React.useEffect(() => {
            if (!autoplay || isPaused || itemCount <= 1) return

            autoplayRef.current = setInterval(() => {
                next()
            }, autoplayInterval)

            return () => {
                if (autoplayRef.current) {
                    clearInterval(autoplayRef.current)
                }
            }
        }, [autoplay, autoplayInterval, isPaused, currentIndex, itemCount])

        // 键盘导航
        React.useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowLeft') prev()
                if (e.key === 'ArrowRight') next()
            }

            const container = containerRef.current
            if (container) {
                container.addEventListener('keydown', handleKeyDown)
                return () => container.removeEventListener('keydown', handleKeyDown)
            }
        }, [currentIndex])

        // 触摸滑动支持
        const touchStartRef = React.useRef<number>(0)
        const handleTouchStart = (e: React.TouchEvent) => {
            touchStartRef.current = e.touches[0].clientX
            setIsPaused(true)
        }
        const handleTouchEnd = (e: React.TouchEvent) => {
            const diff = touchStartRef.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) {
                if (diff > 0) next()
                else prev()
            }
            setIsPaused(false)
        }

        // 指示器位置样式
        const dotsPositionClasses = {
            bottom: 'bottom-4 left-1/2 -translate-x-1/2 flex-row',
            top: 'top-4 left-1/2 -translate-x-1/2 flex-row',
            left: 'left-4 top-1/2 -translate-y-1/2 flex-col',
            right: 'right-4 top-1/2 -translate-y-1/2 flex-col'
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden border-2 border-border bg-background",
                    className
                )}
                style={{ height }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                tabIndex={0}
            >
                {/* 轮播内容 */}
                <div
                    ref={containerRef}
                    className="flex h-full"
                    style={{
                        transform: `translateX(-${extendedIndex * 100}%)`,
                        transition: isTransitioning ? `transform ${speed}ms ease-in-out` : 'none'
                    }}
                >
                    {extendedItems.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-full">
                            {item}
                        </div>
                    ))}
                </div>

                {/* 左箭头 */}
                {arrows && itemCount > 1 && (
                    <button
                        onClick={prev}
                        className={cn(
                            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                            "w-10 h-10 flex items-center justify-center",
                            "bg-background border-2 border-border shadow-retro",
                            "hover:bg-muted transition-colors",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        disabled={!infinite && currentIndex === 0}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                )}

                {/* 右箭头 */}
                {arrows && itemCount > 1 && (
                    <button
                        onClick={next}
                        className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                            "w-10 h-10 flex items-center justify-center",
                            "bg-background border-2 border-border shadow-retro",
                            "hover:bg-muted transition-colors",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        disabled={!infinite && currentIndex === itemCount - 1}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                )}

                {/* 指示器 */}
                {dots && itemCount > 1 && (
                    <div className={cn(
                        "absolute flex gap-2 z-10",
                        dotsPositionClasses[dotsPosition]
                    )}>
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                className={cn(
                                    "w-3 h-3 border-2 border-border transition-all",
                                    currentIndex === index
                                        ? "bg-primary shadow-retro-hover"
                                        : "bg-background hover:bg-muted"
                                )}
                                aria-label={`跳转到第 ${index + 1} 页`}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }
)
Carousel.displayName = "Carousel"

export { Carousel, CarouselItem }
