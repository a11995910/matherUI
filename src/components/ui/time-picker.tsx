import * as React from "react"
import { cn } from "../../lib/utils"
import { Clock, ChevronUp, ChevronDown } from "lucide-react"

/**
 * TimePicker 组件属性
 */
export interface TimePickerProps {
    /** 当前值 (HH:mm 或 HH:mm:ss 格式) */
    value?: string
    /** 默认值 */
    defaultValue?: string
    /** 值改变时的回调 */
    onChange?: (value: string) => void
    /** 是否显示秒 */
    showSeconds?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 占位符 */
    placeholder?: string
    /** 12小时制 */
    use12Hours?: boolean
    /** 小时步长 */
    hourStep?: number
    /** 分钟步长 */
    minuteStep?: number
    /** 秒步长 */
    secondStep?: number
    /** 自定义类名 */
    className?: string
}

/**
 * TimePicker - 时间选择器
 * 支持小时/分钟/秒选择，12/24小时制
 * 
 * @example
 * ```tsx
 * <TimePicker defaultValue="12:30" />
 * <TimePicker showSeconds use12Hours />
 * ```
 */
const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
    ({
        value,
        defaultValue = '',
        onChange,
        showSeconds = false,
        disabled = false,
        placeholder = '选择时间',
        use12Hours = false,
        hourStep = 1,
        minuteStep = 1,
        secondStep = 1,
        className,
    }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false)
        const [internalValue, setInternalValue] = React.useState(value || defaultValue)
        const containerRef = React.useRef<HTMLDivElement>(null)

        // 解析时间值
        const parseTime = (timeStr: string) => {
            const parts = timeStr.split(':')
            let hour = parseInt(parts[0]) || 0
            const minute = parseInt(parts[1]) || 0
            const second = parseInt(parts[2]) || 0
            let period: 'AM' | 'PM' = 'AM'

            if (use12Hours) {
                if (hour >= 12) {
                    period = 'PM'
                    if (hour > 12) hour -= 12
                }
                if (hour === 0) hour = 12
            }

            return { hour, minute, second, period }
        }

        const { hour, minute, second, period } = parseTime(internalValue)

        // 同步外部 value
        React.useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value)
            }
        }, [value])

        // 点击外部关闭
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false)
                }
            }
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }, [])

        // 格式化输出
        const formatTime = (h: number, m: number, s: number, p?: 'AM' | 'PM') => {
            let finalHour = h
            if (use12Hours && p) {
                if (p === 'PM' && h !== 12) finalHour = h + 12
                if (p === 'AM' && h === 12) finalHour = 0
            }
            const hourStr = String(finalHour).padStart(2, '0')
            const minStr = String(m).padStart(2, '0')
            const secStr = String(s).padStart(2, '0')
            return showSeconds ? `${hourStr}:${minStr}:${secStr}` : `${hourStr}:${minStr}`
        }

        // 更新时间
        const updateTime = (newHour: number, newMinute: number, newSecond: number, newPeriod?: 'AM' | 'PM') => {
            const formatted = formatTime(newHour, newMinute, newSecond, use12Hours ? newPeriod : undefined)
            setInternalValue(formatted)
            onChange?.(formatted)
        }

        // 调整值（带循环）
        const adjustValue = (current: number, delta: number, max: number, min: number = 0) => {
            let newValue = current + delta
            if (newValue > max) newValue = min
            if (newValue < min) newValue = max
            return newValue
        }

        // 时间调节器组件
        const TimeColumn = ({
            value: colValue,
            onChange: onColChange,
            max,
            min = 0,
            step = 1,
            label
        }: {
            value: number
            onChange: (v: number) => void
            max: number
            min?: number
            step?: number
            label: string
        }) => (
            <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-1">{label}</span>
                <button
                    type="button"
                    onClick={() => onColChange(adjustValue(colValue, step, max, min))}
                    className="p-1 hover:bg-muted transition-colors"
                    disabled={disabled}
                >
                    <ChevronUp className="h-4 w-4" />
                </button>
                <div className="w-10 h-10 flex items-center justify-center border-2 border-border bg-background font-mono text-lg">
                    {String(colValue).padStart(2, '0')}
                </div>
                <button
                    type="button"
                    onClick={() => onColChange(adjustValue(colValue, -step, max, min))}
                    className="p-1 hover:bg-muted transition-colors"
                    disabled={disabled}
                >
                    <ChevronDown className="h-4 w-4" />
                </button>
            </div>
        )

        // 显示值
        const displayValue = internalValue || ''

        return (
            <div ref={containerRef} className={cn("relative inline-block", className)}>
                {/* 输入框 */}
                <div
                    ref={ref}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center gap-2 h-10 px-3 border-2 border-border bg-background cursor-pointer transition-all",
                        "hover:border-primary",
                        isOpen && "border-primary shadow-retro",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={cn(
                        "font-mono",
                        !displayValue && "text-muted-foreground"
                    )}>
                        {displayValue || placeholder}
                    </span>
                </div>

                {/* 下拉面板 */}
                {isOpen && !disabled && (
                    <div className="absolute top-full left-0 mt-1 z-50 bg-background border-2 border-border shadow-retro p-4">
                        <div className="flex items-center gap-2">
                            {/* 小时 */}
                            <TimeColumn
                                value={hour}
                                onChange={(h) => updateTime(h, minute, second, period)}
                                max={use12Hours ? 12 : 23}
                                min={use12Hours ? 1 : 0}
                                step={hourStep}
                                label="时"
                            />

                            <span className="text-2xl font-bold mt-4">:</span>

                            {/* 分钟 */}
                            <TimeColumn
                                value={minute}
                                onChange={(m) => updateTime(hour, m, second, period)}
                                max={59}
                                step={minuteStep}
                                label="分"
                            />

                            {/* 秒 */}
                            {showSeconds && (
                                <>
                                    <span className="text-2xl font-bold mt-4">:</span>
                                    <TimeColumn
                                        value={second}
                                        onChange={(s) => updateTime(hour, minute, s, period)}
                                        max={59}
                                        step={secondStep}
                                        label="秒"
                                    />
                                </>
                            )}

                            {/* AM/PM */}
                            {use12Hours && (
                                <div className="flex flex-col items-center ml-2">
                                    <span className="text-xs text-muted-foreground mb-1">时段</span>
                                    <button
                                        type="button"
                                        onClick={() => updateTime(hour, minute, second, 'AM')}
                                        className={cn(
                                            "px-2 py-1 border-2 border-border transition-colors",
                                            period === 'AM' ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                                        )}
                                    >
                                        AM
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateTime(hour, minute, second, 'PM')}
                                        className={cn(
                                            "px-2 py-1 border-2 border-border border-t-0 transition-colors",
                                            period === 'PM' ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                                        )}
                                    >
                                        PM
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 快捷按钮 */}
                        <div className="flex gap-2 mt-3 pt-3 border-t-2 border-border">
                            <button
                                type="button"
                                onClick={() => {
                                    const now = new Date()
                                    updateTime(
                                        use12Hours ? (now.getHours() % 12 || 12) : now.getHours(),
                                        now.getMinutes(),
                                        now.getSeconds(),
                                        now.getHours() >= 12 ? 'PM' : 'AM'
                                    )
                                }}
                                className="flex-1 py-1 text-sm border-2 border-border hover:bg-muted transition-colors"
                            >
                                此刻
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 py-1 text-sm bg-primary text-primary-foreground border-2 border-border hover:opacity-90 transition-opacity"
                            >
                                确定
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
)
TimePicker.displayName = "TimePicker"

export { TimePicker }
