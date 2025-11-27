import * as React from "react"
import { cn } from "../../lib/utils"
import { Upload as UploadIcon, X, File, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react"

/**
 * 文件项类型
 */
export interface UploadFile {
    /** 文件唯一标识 */
    uid: string
    /** 文件名 */
    name: string
    /** 文件大小 */
    size?: number
    /** 文件类型 */
    type?: string
    /** 上传状态 */
    status: 'uploading' | 'done' | 'error'
    /** 上传进度 */
    percent?: number
    /** 预览地址 */
    url?: string
    /** 缩略图地址 */
    thumbUrl?: string
    /** 原始文件对象 */
    originFile?: File
    /** 错误信息 */
    error?: string
}

/**
 * Upload 组件属性
 */
export interface UploadProps {
    /** 文件列表 */
    fileList?: UploadFile[]
    /** 默认文件列表 */
    defaultFileList?: UploadFile[]
    /** 文件列表改变时的回调 */
    onChange?: (fileList: UploadFile[]) => void
    /** 上传前的钩子 */
    beforeUpload?: (file: File) => boolean | Promise<boolean>
    /** 自定义上传实现 */
    customRequest?: (options: { file: File; onProgress: (percent: number) => void; onSuccess: () => void; onError: (error: Error) => void }) => void
    /** 接受的文件类型 */
    accept?: string
    /** 是否支持多选 */
    multiple?: boolean
    /** 最大文件数量 */
    maxCount?: number
    /** 最大文件大小（字节） */
    maxSize?: number
    /** 是否禁用 */
    disabled?: boolean
    /** 展示类型 */
    listType?: 'text' | 'picture' | 'picture-card'
    /** 是否支持拖拽上传 */
    drag?: boolean
    /** 提示文字 */
    tip?: string
    /** 自定义类名 */
    className?: string
    /** 子元素 */
    children?: React.ReactNode
}

/**
 * 生成唯一ID
 */
const generateUid = () => `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

/**
 * 格式化文件大小
 */
const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

/**
 * Upload - 文件上传组件
 * 支持拖拽上传、多文件、图片预览
 * 
 * @example
 * ```tsx
 * <Upload drag multiple accept="image/*">
 *   <p>点击或拖拽文件到此处上传</p>
 * </Upload>
 * ```
 */
const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
    ({
        fileList,
        defaultFileList = [],
        onChange,
        beforeUpload,
        customRequest,
        accept,
        multiple = false,
        maxCount,
        maxSize,
        disabled = false,
        listType = 'text',
        drag = false,
        tip,
        className,
        children,
    }, ref) => {
        const [internalFileList, setInternalFileList] = React.useState<UploadFile[]>(
            fileList || defaultFileList
        )
        const [isDragging, setIsDragging] = React.useState(false)
        const inputRef = React.useRef<HTMLInputElement>(null)

        // 同步外部 fileList
        React.useEffect(() => {
            if (fileList !== undefined) {
                setInternalFileList(fileList)
            }
        }, [fileList])

        // 更新文件列表
        const updateFileList = (newList: UploadFile[]) => {
            setInternalFileList(newList)
            onChange?.(newList)
        }

        // 处理文件
        const handleFiles = async (files: FileList | File[]) => {
            const fileArray = Array.from(files)
            
            for (const file of fileArray) {
                // 检查数量限制
                if (maxCount && internalFileList.length >= maxCount) {
                    console.warn(`最多只能上传 ${maxCount} 个文件`)
                    break
                }

                // 检查大小限制
                if (maxSize && file.size > maxSize) {
                    console.warn(`文件 ${file.name} 超过大小限制`)
                    continue
                }

                // beforeUpload 钩子
                if (beforeUpload) {
                    const canUpload = await beforeUpload(file)
                    if (!canUpload) continue
                }

                // 创建文件项
                const uploadFile: UploadFile = {
                    uid: generateUid(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    status: 'uploading',
                    percent: 0,
                    originFile: file,
                }

                // 如果是图片，生成预览
                if (file.type.startsWith('image/')) {
                    uploadFile.thumbUrl = URL.createObjectURL(file)
                }

                // 添加到列表
                const newList = [...internalFileList, uploadFile]
                updateFileList(newList)

                // 执行上传
                if (customRequest) {
                    customRequest({
                        file,
                        onProgress: (percent) => {
                            updateFileList(newList.map(f =>
                                f.uid === uploadFile.uid ? { ...f, percent } : f
                            ))
                        },
                        onSuccess: () => {
                            updateFileList(newList.map(f =>
                                f.uid === uploadFile.uid ? { ...f, status: 'done', percent: 100 } : f
                            ))
                        },
                        onError: (error) => {
                            updateFileList(newList.map(f =>
                                f.uid === uploadFile.uid ? { ...f, status: 'error', error: error.message } : f
                            ))
                        },
                    })
                } else {
                    // 模拟上传完成
                    setTimeout(() => {
                        setInternalFileList(prev => prev.map(f =>
                            f.uid === uploadFile.uid ? { ...f, status: 'done', percent: 100 } : f
                        ))
                    }, 500)
                }
            }
        }

        // 点击上传
        const handleClick = () => {
            if (!disabled) {
                inputRef.current?.click()
            }
        }

        // 文件选择
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                handleFiles(e.target.files)
                e.target.value = '' // 清空以便重复选择同一文件
            }
        }

        // 拖拽处理
        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault()
            if (!disabled) setIsDragging(true)
        }

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault()
            setIsDragging(false)
        }

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault()
            setIsDragging(false)
            if (!disabled && e.dataTransfer.files) {
                handleFiles(e.dataTransfer.files)
            }
        }

        // 移除文件
        const handleRemove = (uid: string) => {
            const file = internalFileList.find(f => f.uid === uid)
            if (file?.thumbUrl) {
                URL.revokeObjectURL(file.thumbUrl)
            }
            updateFileList(internalFileList.filter(f => f.uid !== uid))
        }

        // 渲染文件列表
        const renderFileList = () => {
            if (listType === 'picture-card') {
                return (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {internalFileList.map(file => (
                            <div
                                key={file.uid}
                                className={cn(
                                    "relative w-24 h-24 border-2 border-border bg-muted flex items-center justify-center overflow-hidden group",
                                    file.status === 'error' && "border-red-500"
                                )}
                            >
                                {file.thumbUrl ? (
                                    <img src={file.thumbUrl} alt={file.name} className="w-full h-full object-cover" />
                                ) : (
                                    <File className="h-8 w-8 text-muted-foreground" />
                                )}
                                
                                {/* 上传中遮罩 */}
                                {file.status === 'uploading' && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white text-sm">{file.percent}%</span>
                                    </div>
                                )}

                                {/* 删除按钮 */}
                                <button
                                    type="button"
                                    onClick={() => handleRemove(file.uid)}
                                    className="absolute top-1 right-1 p-1 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>

                                {/* 状态图标 */}
                                {file.status === 'done' && (
                                    <CheckCircle className="absolute bottom-1 right-1 h-4 w-4 text-green-500" />
                                )}
                                {file.status === 'error' && (
                                    <AlertCircle className="absolute bottom-1 right-1 h-4 w-4 text-red-500" />
                                )}
                            </div>
                        ))}

                        {/* 上传按钮 */}
                        {(!maxCount || internalFileList.length < maxCount) && (
                            <div
                                onClick={handleClick}
                                className={cn(
                                    "w-24 h-24 border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors",
                                    disabled && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <UploadIcon className="h-6 w-6 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground mt-1">上传</span>
                            </div>
                        )}
                    </div>
                )
            }

            // 文本/图片列表
            return (
                <div className="mt-2 space-y-2">
                    {internalFileList.map(file => (
                        <div
                            key={file.uid}
                            className={cn(
                                "flex items-center gap-3 p-2 border-2 border-border bg-background",
                                file.status === 'error' && "border-red-500"
                            )}
                        >
                            {/* 图标/缩略图 */}
                            {listType === 'picture' && file.thumbUrl ? (
                                <img src={file.thumbUrl} alt={file.name} className="w-10 h-10 object-cover border border-border" />
                            ) : file.type?.startsWith('image/') ? (
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            ) : (
                                <File className="h-5 w-5 text-muted-foreground" />
                            )}

                            {/* 文件信息 */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{file.name}</p>
                                {file.size && (
                                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                )}
                                {file.status === 'uploading' && (
                                    <div className="w-full h-1 bg-muted mt-1">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${file.percent}%` }}
                                        />
                                    </div>
                                )}
                                {file.status === 'error' && file.error && (
                                    <p className="text-xs text-red-500">{file.error}</p>
                                )}
                            </div>

                            {/* 状态/操作 */}
                            <div className="flex items-center gap-2">
                                {file.status === 'done' && <CheckCircle className="h-4 w-4 text-green-500" />}
                                {file.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                                <button
                                    type="button"
                                    onClick={() => handleRemove(file.uid)}
                                    className="p-1 hover:bg-muted transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }

        return (
            <div ref={ref} className={cn("w-full", className)}>
                {/* 隐藏的文件输入 */}
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    className="hidden"
                    disabled={disabled}
                />

                {/* 上传区域 */}
                {listType !== 'picture-card' && (
                    <div
                        onClick={handleClick}
                        onDragOver={drag ? handleDragOver : undefined}
                        onDragLeave={drag ? handleDragLeave : undefined}
                        onDrop={drag ? handleDrop : undefined}
                        className={cn(
                            "border-2 border-dashed border-border p-6 text-center cursor-pointer transition-all",
                            "hover:border-primary",
                            drag && "min-h-[150px] flex flex-col items-center justify-center",
                            isDragging && "border-primary bg-primary/5 shadow-retro",
                            disabled && "opacity-50 cursor-not-allowed hover:border-border"
                        )}
                    >
                        {children || (
                            <>
                                <UploadIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    {drag ? '点击或拖拽文件到此处上传' : '点击上传文件'}
                                </p>
                                {tip && <p className="text-xs text-muted-foreground mt-1">{tip}</p>}
                            </>
                        )}
                    </div>
                )}

                {/* 文件列表 */}
                {renderFileList()}
            </div>
        )
    }
)
Upload.displayName = "Upload"

export { Upload }
