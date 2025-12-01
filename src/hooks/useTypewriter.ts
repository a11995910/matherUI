import { useState, useEffect, useRef } from 'react'

/**
 * 打字机效果 Hook
 * 实现文字的打字和删除动画效果
 * 
 * @param texts - 要循环显示的文本数组
 * @param typeSpeed - 打字速度（毫秒）
 * @param deleteSpeed - 删除速度（毫秒）
 * @param pauseTime - 打完后暂停时间（毫秒）
 */
export function useTypewriter(
    texts: string[],
    typeSpeed: number = 100,
    deleteSpeed: number = 50,
    pauseTime: number = 2000
) {
    const [displayText, setDisplayText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const charIndexRef = useRef(0)

    useEffect(() => {
        const currentText = texts[textIndex]
        let delay: number

        if (!isDeleting) {
            // 打字阶段
            if (charIndexRef.current < currentText.length) {
                delay = typeSpeed
                const timeout = setTimeout(() => {
                    charIndexRef.current += 1
                    setDisplayText(currentText.substring(0, charIndexRef.current))
                }, delay)
                return () => clearTimeout(timeout)
            } else {
                // 打完了，暂停后开始删除
                delay = pauseTime
                const timeout = setTimeout(() => {
                    setIsDeleting(true)
                }, delay)
                return () => clearTimeout(timeout)
            }
        } else {
            // 删除阶段
            if (charIndexRef.current > 0) {
                delay = deleteSpeed
                const timeout = setTimeout(() => {
                    charIndexRef.current -= 1
                    setDisplayText(currentText.substring(0, charIndexRef.current))
                }, delay)
                return () => clearTimeout(timeout)
            } else {
                // 删完了，切换到下一个文本
                delay = 500
                const timeout = setTimeout(() => {
                    setIsDeleting(false)
                    setTextIndex(prev => (prev + 1) % texts.length)
                }, delay)
                return () => clearTimeout(timeout)
            }
        }
    }, [texts, textIndex, displayText, isDeleting, typeSpeed, deleteSpeed, pauseTime])

    return displayText
}
