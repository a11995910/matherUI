/**
 * Calendar 组件文档
 */

import { useState } from "react"
import { Calendar } from "../../../components/ui/calendar"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const calendarProps: PropItem[] = [
    { prop: "value", type: "Date", default: "-", description: "当前选中日期" },
    { prop: "defaultValue", type: "Date", default: "-", description: "默认选中日期" },
    { prop: "onChange", type: "(date: Date) => void", default: "-", description: "日期改变回调" },
    { prop: "minDate", type: "Date", default: "-", description: "最小可选日期" },
    { prop: "maxDate", type: "Date", default: "-", description: "最大可选日期" },
    { prop: "disabledDate", type: "(date: Date) => boolean", default: "-", description: "禁用特定日期" },
    { prop: "showToday", type: "boolean", default: "true", description: "是否显示今天按钮" },
    { prop: "showWeekNumber", type: "boolean", default: "false", description: "是否显示周数" },
    { prop: "weekStartsOn", type: "0 | 1", default: "0", description: "周起始日（0=周日，1=周一）" },
]

export function CalendarDoc() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    return (
        <DocSection
            id="calendar"
            title="Calendar 日历"
            description="日历组件，支持日期选择、禁用日期、自定义渲染等功能。"
            props={calendarProps}
        >
            <DocExample
                title="基本用法"
                code={`<Calendar defaultValue={new Date()} onChange={(date) => console.log(date)} />`}
            >
                <Calendar 
                    value={selectedDate} 
                    onChange={setSelectedDate}
                />
            </DocExample>

            <DocExample
                title="显示周数"
                code={`<Calendar showWeekNumber />`}
            >
                <Calendar showWeekNumber />
            </DocExample>

            <DocExample
                title="周一为起始日"
                code={`<Calendar weekStartsOn={1} />`}
            >
                <Calendar weekStartsOn={1} />
            </DocExample>

            <DocExample
                title="禁用周末"
                code={`<Calendar disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6} />`}
            >
                <Calendar 
                    disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}
                />
            </DocExample>
        </DocSection>
    )
}
