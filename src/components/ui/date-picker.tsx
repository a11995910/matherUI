/**
 * DatePicker 日期选择器组件
 * 用于选择日期
 */

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/** 格式化日期 */
const formatDate = (date: Date | null, format: string = "YYYY-MM-DD"): string => {
    if (!date) return ""
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return format.replace("YYYY", String(y)).replace("MM", m).replace("DD", d)
}

/** 获取某月天数 */
const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
}

/** 获取某月第一天是星期几 */
const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay()
}

/** 判断是否同一天 */
const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
    if (!d1 || !d2) return false
    return d1.getFullYear() === d2.getFullYear() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getDate() === d2.getDate()
}

/** DatePicker Props */
export interface DatePickerProps {
    /** 选中的日期 */
    value?: Date | null
    /** 日期变化回调 */
    onChange?: (date: Date | null) => void
    /** 占位文字 */
    placeholder?: string
    /** 日期格式 */
    format?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 最小日期 */
    minDate?: Date
    /** 最大日期 */
    maxDate?: Date
    /** 自定义类名 */
    className?: string
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]
const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

/**
 * DatePicker - 日期选择器
 */
export function DatePicker({
    value,
    onChange,
    placeholder = "选择日期",
    format = "YYYY-MM-DD",
    disabled = false,
    minDate,
    maxDate,
    className,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(value || new Date())

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    // 上一月
    const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
    // 下一月
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

    // 选择日期
    const selectDate = (day: number) => {
        const selected = new Date(year, month, day)
        onChange?.(selected)
        setOpen(false)
    }

    // 判断日期是否禁用
    const isDisabled = (day: number): boolean => {
        const date = new Date(year, month, day)
        if (minDate && date < minDate) return true
        if (maxDate && date > maxDate) return true
        return false
    }

    // 生成日历格子
    const renderDays = () => {
        const days: React.ReactNode[] = []
        const today = new Date()

        // 空白格子
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
        }

        // 日期格子
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day)
            const isSelected = isSameDay(date, value || null)
            const isToday = isSameDay(date, today)
            const dayDisabled = isDisabled(day)

            days.push(
                <button
                    key={day}
                    type="button"
                    disabled={dayDisabled}
                    onClick={() => selectDate(day)}
                    className={cn(
                        "w-8 h-8 text-sm font-medium transition-colors border-2",
                        isSelected 
                            ? "bg-primary text-primary-foreground border-primary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                            : "border-transparent hover:border-border hover:bg-muted",
                        isToday && !isSelected && "border-primary text-primary",
                        dayDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent hover:border-transparent"
                    )}
                >
                    {day}
                </button>
            )
        }

        return days
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? formatDate(value, format) : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
                {/* 头部导航 */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        type="button"
                        onClick={prevMonth}
                        className="p-1 hover:bg-muted border-2 border-transparent hover:border-border transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-bold">
                        {year}年 {MONTHS[month]}
                    </span>
                    <button
                        type="button"
                        onClick={nextMonth}
                        className="p-1 hover:bg-muted border-2 border-transparent hover:border-border transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* 星期标题 */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="w-8 h-8 flex items-center justify-center text-xs text-muted-foreground font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {/* 日期格子 */}
                <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                </div>

                {/* 今天按钮 */}
                <div className="mt-4 pt-4 border-t border-border">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                            const today = new Date()
                            setViewDate(today)
                            onChange?.(today)
                            setOpen(false)
                        }}
                    >
                        今天
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
