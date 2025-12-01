import { useState, useEffect, useRef } from 'react'

/**
 * Count Up 数字递增动画 Hook
 * 
 * @param end - 目标数值
 * @param duration - 动画持续时间（毫秒）
 * @param start - 起始数值
 * @param decimals - 小数位数
 * @param startOnMount - 是否在挂载时自动开始
 */
export function useCountUp(
    end: number,
    duration: number = 2000,
    start: number = 0,
    decimals: number = 0,
    startOnMount: boolean = true
) {
    const [count, setCount] = useState(start)
    const [isRunning, setIsRunning] = useState(false)
    const rafRef = useRef<number | null>(null)
    const startTimeRef = useRef<number | null>(null)

    const animate = (currentTime: number) => {
        if (!startTimeRef.current) {
            startTimeRef.current = currentTime
        }

        const elapsed = currentTime - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)

        // 使用 easeOutQuart 缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = start + (end - start) * easeOutQuart

        setCount(Number(currentValue.toFixed(decimals)))

        if (progress < 1) {
            rafRef.current = requestAnimationFrame(animate)
        } else {
            setIsRunning(false)
            setCount(Number(end.toFixed(decimals)))
        }
    }

    const startAnimation = () => {
        if (isRunning) return
        
        setIsRunning(true)
        startTimeRef.current = null
        setCount(start)
        rafRef.current = requestAnimationFrame(animate)
    }

    const reset = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
        }
        setIsRunning(false)
        setCount(start)
        startTimeRef.current = null
    }

    useEffect(() => {
        if (startOnMount) {
            startAnimation()
        }

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [end, duration, start, decimals, startOnMount])

    return { count, isRunning, startAnimation, reset }
}
