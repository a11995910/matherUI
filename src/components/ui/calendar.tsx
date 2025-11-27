import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Calendar 组件属性
 */
export interface CalendarProps {
    /** 当前选中日期 */
    value?: Date
    /** 默认选中日期 */
    defaultValue?: Date
    /** 日期改变回调 */
    onChange?: (date: Date) => void
    /** 最小可选日期 */
    minDate?: Date
    /** 最大可选日期 */
    maxDate?: Date
    /** 禁用特定日期 */
    disabledDate?: (date: Date) => boolean
    /** 是否显示今天按钮 */
    showToday?: boolean
    /** 自定义日期单元格渲染 */
    dateRender?: (date: Date) => React.ReactNode
    /** 月份改变回调 */
    onMonthChange?: (date: Date) => void
    /** 是否显示周数 */
    showWeekNumber?: boolean
    /** 周起始日（0=周日，1=周一） */
    weekStartsOn?: 0 | 1
    /** 自定义类名 */
    className?: string
}

/**
 * 获取月份天数
 */
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * 获取月份第一天是星期几
 */
const getFirstDayOfMonth = (year: number, month: number, weekStartsOn: 0 | 1 = 0) => {
    const day = new Date(year, month, 1).getDay()
    return weekStartsOn === 1 ? (day === 0 ? 6 : day - 1) : day
}

/**
 * 获取周数
 */
const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

/**
 * 判断两个日期是否同一天
 */
const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

/**
 * 判断日期是否在范围内
 */
const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date) => {
    if (minDate && date < minDate) return false
    if (maxDate && date > maxDate) return false
    return true
}

/**
 * 星期标题
 */
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

/**
 * Calendar - 日历组件
 * 支持日期选择、禁用日期、自定义渲染
 * 
 * @example
 * ```tsx
 * <Calendar
 *   defaultValue={new Date()}
 *   onChange={(date) => console.log(date)}
 * />
 * ```
 */
const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
    ({
        value,
        defaultValue,
        onChange,
        minDate,
        maxDate,
        disabledDate,
        showToday = true,
        dateRender,
        onMonthChange,
        showWeekNumber = false,
        weekStartsOn = 0,
        className,
    }, ref) => {
        const today = new Date()
        const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
            value || defaultValue
        )
        const [viewDate, setViewDate] = React.useState(
            value || defaultValue || today
        )

        // 同步外部 value
        React.useEffect(() => {
            if (value) {
                setSelectedDate(value)
                setViewDate(value)
            }
        }, [value])

        const year = viewDate.getFullYear()
        const month = viewDate.getMonth()

        // 月份导航
        const prevMonth = () => {
            const newDate = new Date(year, month - 1, 1)
            setViewDate(newDate)
            onMonthChange?.(newDate)
        }

        const nextMonth = () => {
            const newDate = new Date(year, month + 1, 1)
            setViewDate(newDate)
            onMonthChange?.(newDate)
        }

        const prevYear = () => {
            const newDate = new Date(year - 1, month, 1)
            setViewDate(newDate)
            onMonthChange?.(newDate)
        }

        const nextYear = () => {
            const newDate = new Date(year + 1, month, 1)
            setViewDate(newDate)
            onMonthChange?.(newDate)
        }

        // 选择日期
        const handleSelectDate = (date: Date) => {
            if (disabledDate?.(date)) return
            if (!isDateInRange(date, minDate, maxDate)) return
            setSelectedDate(date)
            onChange?.(date)
        }

        // 今天
        const handleToday = () => {
            setViewDate(today)
            handleSelectDate(today)
        }

        // 生成日历网格
        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOffset = getFirstDayOfMonth(year, month, weekStartsOn)
        const daysInPrevMonth = getDaysInMonth(year, month - 1)

        // 生成日期数组
        const days: Array<{ date: Date; isCurrentMonth: boolean }> = []

        // 上月末尾日期
        for (let i = firstDayOffset - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, daysInPrevMonth - i),
                isCurrentMonth: false
            })
        }

        // 当月日期
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            })
        }

        // 下月开头日期（补齐6行）
        const remainingDays = 42 - days.length
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false
            })
        }

        // 按周分组
        const weeks: Array<Array<{ date: Date; isCurrentMonth: boolean }>> = []
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7))
        }

        // 调整周起始日
        const displayWeekDays = weekStartsOn === 1
            ? [...weekDays.slice(1), weekDays[0]]
            : weekDays

        return (
            <div
                ref={ref}
                className={cn(
                    "w-[320px] border-2 border-border bg-background p-4",
                    className
                )}
            >
                {/* 头部导航 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={prevYear}
                            className="p-1 hover:bg-muted transition-colors"
                            title="上一年"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <ChevronLeft className="h-4 w-4 -ml-2" />
                        </button>
                        <button
                            onClick={prevMonth}
                            className="p-1 hover:bg-muted transition-colors"
                            title="上一月"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                    </div>

                    <span className="font-medium">
                        {year}年 {month + 1}月
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={nextMonth}
                            className="p-1 hover:bg-muted transition-colors"
                            title="下一月"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                        <button
                            onClick={nextYear}
                            className="p-1 hover:bg-muted transition-colors"
                            title="下一年"
                        >
                            <ChevronRight className="h-4 w-4" />
                            <ChevronRight className="h-4 w-4 -ml-2" />
                        </button>
                    </div>
                </div>

                {/* 星期标题 */}
                <div className={cn(
                    "grid gap-1 mb-2",
                    showWeekNumber ? "grid-cols-8" : "grid-cols-7"
                )}>
                    {showWeekNumber && (
                        <div className="h-8 flex items-center justify-center text-xs text-muted-foreground">
                            周
                        </div>
                    )}
                    {displayWeekDays.map((day, index) => (
                        <div
                            key={index}
                            className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* 日期网格 */}
                <div className="space-y-1">
                    {weeks.map((week, weekIndex) => (
                        <div
                            key={weekIndex}
                            className={cn(
                                "grid gap-1",
                                showWeekNumber ? "grid-cols-8" : "grid-cols-7"
                            )}
                        >
                            {/* 周数 */}
                            {showWeekNumber && (
                                <div className="h-8 flex items-center justify-center text-xs text-muted-foreground">
                                    {getWeekNumber(week[0].date)}
                                </div>
                            )}

                            {/* 日期 */}
                            {week.map(({ date, isCurrentMonth }, dayIndex) => {
                                const isToday = isSameDay(date, today)
                                const isSelected = selectedDate && isSameDay(date, selectedDate)
                                const isDisabled = disabledDate?.(date) || !isDateInRange(date, minDate, maxDate)

                                return (
                                    <button
                                        key={dayIndex}
                                        onClick={() => handleSelectDate(date)}
                                        disabled={isDisabled}
                                        className={cn(
                                            "h-8 flex items-center justify-center text-sm transition-colors",
                                            "hover:bg-muted",
                                            !isCurrentMonth && "text-muted-foreground",
                                            isToday && "border-2 border-primary",
                                            isSelected && "bg-primary text-primary-foreground hover:bg-primary",
                                            isDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent"
                                        )}
                                    >
                                        {dateRender ? dateRender(date) : date.getDate()}
                                    </button>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* 今天按钮 */}
                {showToday && (
                    <div className="mt-4 pt-4 border-t-2 border-border">
                        <button
                            onClick={handleToday}
                            className="w-full py-2 text-sm border-2 border-border hover:bg-muted transition-colors"
                        >
                            今天
                        </button>
                    </div>
                )}
            </div>
        )
    }
)
Calendar.displayName = "Calendar"

export { Calendar }
