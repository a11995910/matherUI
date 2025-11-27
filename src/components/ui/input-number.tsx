import * as React from "react"
import { cn } from "../../lib/utils"
import { Minus, Plus } from "lucide-react"

/**
 * InputNumber 组件属性
 */
export interface InputNumberProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
    /** 当前值 */
    value?: number
    /** 默认值 */
    defaultValue?: number
    /** 最小值 */
    min?: number
    /** 最大值 */
    max?: number
    /** 步长 */
    step?: number
    /** 精度（小数位数） */
    precision?: number
    /** 值改变时的回调 */
    onChange?: (value: number | undefined) => void
    /** 是否禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: 'sm' | 'default' | 'lg'
    /** 是否显示增减按钮 */
    controls?: boolean
    /** 按钮位置 */
    controlsPosition?: 'both' | 'right'
}

/**
 * InputNumber - 数字输入框
 * 支持加减按钮、步长、精度控制
 * 
 * @example
 * ```tsx
 * <InputNumber min={0} max={100} step={1} defaultValue={10} />
 * <InputNumber precision={2} step={0.1} />
 * ```
 */
const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    ({
        className,
        value,
        defaultValue = 0,
        min = -Infinity,
        max = Infinity,
        step = 1,
        precision,
        onChange,
        disabled = false,
        size = 'default',
        controls = true,
        controlsPosition = 'both',
        ...props
    }, ref) => {
        // 内部状态管理
        const [internalValue, setInternalValue] = React.useState<number | undefined>(
            value !== undefined ? value : defaultValue
        )

        // 同步外部 value
        React.useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value)
            }
        }, [value])

        // 格式化数值（精度处理）
        const formatValue = (val: number): number => {
            if (precision !== undefined) {
                return Number(val.toFixed(precision))
            }
            return val
        }

        // 限制范围
        const clampValue = (val: number): number => {
            return Math.min(max, Math.max(min, val))
        }

        // 更新值
        const updateValue = (newValue: number | undefined) => {
            if (newValue === undefined) {
                setInternalValue(undefined)
                onChange?.(undefined)
                return
            }
            const clampedValue = clampValue(formatValue(newValue))
            setInternalValue(clampedValue)
            onChange?.(clampedValue)
        }

        // 增加
        const handleIncrease = () => {
            if (disabled) return
            const current = internalValue ?? 0
            updateValue(current + step)
        }

        // 减少
        const handleDecrease = () => {
            if (disabled) return
            const current = internalValue ?? 0
            updateValue(current - step)
        }

        // 输入处理
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value
            if (inputValue === '' || inputValue === '-') {
                setInternalValue(undefined)
                return
            }
            const numValue = parseFloat(inputValue)
            if (!isNaN(numValue)) {
                updateValue(numValue)
            }
        }

        // 失焦时格式化
        const handleBlur = () => {
            if (internalValue !== undefined) {
                updateValue(internalValue)
            }
        }

        // 键盘控制
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                handleIncrease()
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                handleDecrease()
            }
        }

        // 尺寸样式
        const sizeClasses = {
            sm: 'h-8 text-xs',
            default: 'h-10 text-sm',
            lg: 'h-12 text-base'
        }

        const buttonSizeClasses = {
            sm: 'w-7 h-8',
            default: 'w-9 h-10',
            lg: 'w-11 h-12'
        }

        // 按钮组件
        const ControlButton = ({ type }: { type: 'increase' | 'decrease' }) => {
            const isIncrease = type === 'increase'
            const isDisabled = disabled || (isIncrease ? (internalValue ?? 0) >= max : (internalValue ?? 0) <= min)

            return (
                <button
                    type="button"
                    onClick={isIncrease ? handleIncrease : handleDecrease}
                    disabled={isDisabled}
                    className={cn(
                        "flex items-center justify-center border-2 border-border bg-muted hover:bg-secondary transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted",
                        buttonSizeClasses[size],
                        controlsPosition === 'right' && "border-l-0"
                    )}
                    tabIndex={-1}
                >
                    {isIncrease ? (
                        <Plus className="h-4 w-4" />
                    ) : (
                        <Minus className="h-4 w-4" />
                    )}
                </button>
            )
        }

        // 显示值
        const displayValue = internalValue !== undefined
            ? (precision !== undefined ? internalValue.toFixed(precision) : String(internalValue))
            : ''

        return (
            <div className={cn("inline-flex", className)}>
                {/* 左侧减少按钮 */}
                {controls && controlsPosition === 'both' && (
                    <ControlButton type="decrease" />
                )}

                {/* 输入框 */}
                <input
                    ref={ref}
                    type="text"
                    inputMode="decimal"
                    value={displayValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className={cn(
                        "w-20 text-center border-2 border-border bg-background px-2 focus:outline-none focus:border-primary focus:shadow-retro transition-all",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        sizeClasses[size],
                        controls && controlsPosition === 'both' && "border-l-0 border-r-0",
                        controls && controlsPosition === 'right' && "border-r-0"
                    )}
                    {...props}
                />

                {/* 右侧按钮 */}
                {controls && controlsPosition === 'both' && (
                    <ControlButton type="increase" />
                )}

                {/* 右侧堆叠按钮 */}
                {controls && controlsPosition === 'right' && (
                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={handleIncrease}
                            disabled={disabled || (internalValue ?? 0) >= max}
                            className={cn(
                                "flex items-center justify-center border-2 border-border border-b bg-muted hover:bg-secondary transition-colors",
                                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted",
                                "w-7",
                                size === 'sm' ? 'h-4' : size === 'lg' ? 'h-6' : 'h-5'
                            )}
                            tabIndex={-1}
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                        <button
                            type="button"
                            onClick={handleDecrease}
                            disabled={disabled || (internalValue ?? 0) <= min}
                            className={cn(
                                "flex items-center justify-center border-2 border-border border-t-0 bg-muted hover:bg-secondary transition-colors",
                                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted",
                                "w-7",
                                size === 'sm' ? 'h-4' : size === 'lg' ? 'h-6' : 'h-5'
                            )}
                            tabIndex={-1}
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                    </div>
                )}
            </div>
        )
    }
)
InputNumber.displayName = "InputNumber"

export { InputNumber }
