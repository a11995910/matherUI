/**
 * TimePicker 组件文档
 */

import { TimePicker } from "../../../components/ui/time-picker"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const timePickerProps: PropItem[] = [
    { prop: "value", type: "string", default: "-", description: "当前值 (HH:mm 格式)" },
    { prop: "defaultValue", type: "string", default: "''", description: "默认值" },
    { prop: "onChange", type: "(value: string) => void", default: "-", description: "值改变时的回调" },
    { prop: "showSeconds", type: "boolean", default: "false", description: "是否显示秒" },
    { prop: "use12Hours", type: "boolean", default: "false", description: "12小时制" },
    { prop: "hourStep", type: "number", default: "1", description: "小时步长" },
    { prop: "minuteStep", type: "number", default: "1", description: "分钟步长" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { prop: "placeholder", type: "string", default: "'选择时间'", description: "占位符" },
]

export function TimePickerDoc() {
    return (
        <DocSection
            id="time-picker"
            title="TimePicker 时间选择器"
            description="时间选择器组件，支持小时、分钟、秒的选择，以及12/24小时制切换。"
            props={timePickerProps}
        >
            <DocExample
                title="基本用法"
                code={`<TimePicker defaultValue="09:30" />`}
            >
                <TimePicker defaultValue="09:30" />
            </DocExample>

            <DocExample
                title="显示秒"
                code={`<TimePicker showSeconds defaultValue="09:30:00" />`}
            >
                <TimePicker showSeconds defaultValue="09:30:00" />
            </DocExample>

            <DocExample
                title="12小时制"
                code={`<TimePicker use12Hours defaultValue="14:30" />`}
            >
                <TimePicker use12Hours defaultValue="14:30" />
            </DocExample>

            <DocExample
                title="步长设置"
                code={`<TimePicker minuteStep={15} defaultValue="09:00" />`}
            >
                <div>
                    <p className="text-sm mb-2">分钟步长为 15</p>
                    <TimePicker minuteStep={15} defaultValue="09:00" />
                </div>
            </DocExample>
        </DocSection>
    )
}
