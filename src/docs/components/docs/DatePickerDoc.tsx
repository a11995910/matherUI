/**
 * DatePicker 组件文档
 */

import { useState } from "react"
import { DatePicker } from "../../../components/ui/date-picker"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const datePickerProps: PropItem[] = [
    { prop: "value", type: "Date | null", default: "-", description: "选中的日期" },
    { prop: "onChange", type: "(date: Date | null) => void", default: "-", description: "日期变化回调" },
    { prop: "placeholder", type: "string", default: '"选择日期"', description: "占位文字" },
    { prop: "format", type: "string", default: '"YYYY-MM-DD"', description: "日期格式" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { prop: "minDate", type: "Date", default: "-", description: "最小可选日期" },
    { prop: "maxDate", type: "Date", default: "-", description: "最大可选日期" },
]

function DatePickerDemo() {
    const [date, setDate] = useState<Date | null>(null)
    return (
        <div className="space-y-2">
            <DatePicker value={date} onChange={setDate} />
            {date && <p className="text-sm text-muted-foreground">已选择: {date.toLocaleDateString()}</p>}
        </div>
    )
}

export function DatePickerDoc() {
    return (
        <DocSection
            id="date-picker"
            title="DatePicker 日期选择"
            description="用于选择日期的输入组件，点击弹出日历面板进行选择。"
            props={datePickerProps}
        >
            <DocExample
                title="基本用法"
                code={`import { DatePicker } from '@/components/ui/date-picker'

const [date, setDate] = useState<Date | null>(null)
<DatePicker value={date} onChange={setDate} />`}
            >
                <DatePickerDemo />
            </DocExample>

            <DocExample
                title="限制日期范围"
                code={`<DatePicker
  placeholder="选择未来日期"
  minDate={new Date()}
/>`}
            >
                <DatePicker
                    placeholder="选择未来日期"
                    minDate={new Date()}
                />
            </DocExample>
        </DocSection>
    )
}
