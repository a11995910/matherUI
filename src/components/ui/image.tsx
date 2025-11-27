import * as React from "react"
import { cn } from "../../lib/utils"
import { X, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react"

/**
 * Image 组件属性
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** 图片地址 */
    src: string
    /** 替代文本 */
    alt?: string
    /** 宽度 */
    width?: number | string
    /** 高度 */
    height?: number | string
    /** 是否支持预览 */
    preview?: boolean
    /** 预览图地址（默认使用 src） */
    previewSrc?: string
    /** 加载失败时的占位图 */
    fallback?: string
    /** 占位符（加载中显示） */
    placeholder?: React.ReactNode
    /** 图片填充模式 */
    fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

/**
 * 预览弹窗组件
 */
interface PreviewModalProps {
    src: string
    alt?: string
    onClose: () => void
}

const PreviewModal: React.FC<PreviewModalProps> = ({ src, alt, onClose }) => {
    const [scale, setScale] = React.useState(1)
    const [rotation, setRotation] = React.useState(0)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = React.useState(false)
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })

    // 键盘事件
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === '+' || e.key === '=') handleZoomIn()
            if (e.key === '-') handleZoomOut()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // 阻止背景滚动
    React.useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const handleZoomIn = () => setScale(s => Math.min(s + 0.25, 5))
    const handleZoomOut = () => setScale(s => Math.max(s - 0.25, 0.25))
    const handleRotate = () => setRotation(r => (r + 90) % 360)
    const handleReset = () => {
        setScale(1)
        setRotation(0)
        setPosition({ x: 0, y: 0 })
    }

    // 下载图片
    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = src
        link.download = alt || 'image'
        link.click()
    }

    // 拖拽处理
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true)
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = () => setIsDragging(false)

    // 滚轮缩放
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        if (e.deltaY < 0) handleZoomIn()
        else handleZoomOut()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 背景遮罩 */}
            <div
                className="absolute inset-0 bg-black/80"
                onClick={onClose}
            />

            {/* 工具栏 */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-background border-2 border-border shadow-retro p-2">
                <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-muted transition-colors"
                    title="缩小"
                >
                    <ZoomOut className="h-5 w-5" />
                </button>
                <span className="px-2 min-w-[60px] text-center font-mono text-sm">
                    {Math.round(scale * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-muted transition-colors"
                    title="放大"
                >
                    <ZoomIn className="h-5 w-5" />
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                    onClick={handleRotate}
                    className="p-2 hover:bg-muted transition-colors"
                    title="旋转"
                >
                    <RotateCw className="h-5 w-5" />
                </button>
                <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-muted transition-colors"
                    title="下载"
                >
                    <Download className="h-5 w-5" />
                </button>
                <div className="w-px h-6 bg-border mx-1" />
                <button
                    onClick={handleReset}
                    className="px-3 py-1 text-sm hover:bg-muted transition-colors"
                    title="重置"
                >
                    重置
                </button>
            </div>

            {/* 关闭按钮 */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-background border-2 border-border shadow-retro hover:bg-muted transition-colors"
            >
                <X className="h-5 w-5" />
            </button>

            {/* 图片 */}
            <div
                className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="max-w-[90vw] max-h-[90vh] object-contain select-none"
                    style={{
                        transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x / scale}px, ${position.y / scale}px)`,
                        transition: isDragging ? 'none' : 'transform 0.2s ease'
                    }}
                    draggable={false}
                />
            </div>
        </div>
    )
}

/**
 * Image - 图片组件
 * 支持预览、缩放、旋转、加载状态
 * 
 * @example
 * ```tsx
 * <Image src="/photo.jpg" alt="照片" preview />
 * <Image src="/photo.jpg" width={200} height={200} fit="cover" />
 * ```
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({
        src,
        alt = '',
        width,
        height,
        preview = false,
        previewSrc,
        fallback,
        placeholder,
        fit = 'cover',
        className,
        style,
        ...props
    }, ref) => {
        const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading')
        const [showPreview, setShowPreview] = React.useState(false)

        // 加载完成
        const handleLoad = () => setStatus('loaded')

        // 加载失败
        const handleError = () => {
            setStatus('error')
            if (fallback) {
                // 如果有 fallback，尝试加载它
            }
        }

        // 打开预览
        const handlePreview = () => {
            if (preview && status === 'loaded') {
                setShowPreview(true)
            }
        }

        // 对象填充模式映射
        const fitClasses = {
            contain: 'object-contain',
            cover: 'object-cover',
            fill: 'object-fill',
            none: 'object-none',
            'scale-down': 'object-scale-down'
        }

        return (
            <>
                <div
                    className={cn(
                        "relative inline-block overflow-hidden border-2 border-border bg-muted",
                        preview && status === 'loaded' && "cursor-pointer group",
                        className
                    )}
                    style={{ width, height, ...style }}
                    onClick={handlePreview}
                >
                    {/* 加载中占位 */}
                    {status === 'loading' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                            {placeholder || (
                                <div className="w-8 h-8 border-2 border-border border-t-primary animate-spin" />
                            )}
                        </div>
                    )}

                    {/* 加载失败 */}
                    {status === 'error' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
                            {fallback ? (
                                <img
                                    src={fallback}
                                    alt={alt}
                                    className={cn("w-full h-full", fitClasses[fit])}
                                />
                            ) : (
                                <>
                                    <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs">加载失败</span>
                                </>
                            )}
                        </div>
                    )}

                    {/* 图片 */}
                    <img
                        ref={ref}
                        src={src}
                        alt={alt}
                        onLoad={handleLoad}
                        onError={handleError}
                        className={cn(
                            "w-full h-full transition-opacity",
                            fitClasses[fit],
                            status === 'loading' && "opacity-0",
                            status === 'loaded' && "opacity-100"
                        )}
                        {...props}
                    />

                    {/* 预览遮罩 */}
                    {preview && status === 'loaded' && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )}
                </div>

                {/* 预览弹窗 */}
                {showPreview && (
                    <PreviewModal
                        src={previewSrc || src}
                        alt={alt}
                        onClose={() => setShowPreview(false)}
                    />
                )}
            </>
        )
    }
)
Image.displayName = "Image"

export { Image }
