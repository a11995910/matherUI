/**
 * Rate 组件文档
 */

import { useState } from "react"
import { Rate } from "../../../components/ui/rate"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const rateProps: PropItem[] = [
    { prop: "value", type: "number", default: "-", description: "当前评分值" },
    { prop: "defaultValue", type: "number", default: "0", description: "默认值（非受控）" },
    { prop: "count", type: "number", default: "5", description: "总星数" },
    { prop: "onChange", type: "(value: number) => void", default: "-", description: "值变化回调" },
    { prop: "allowHalf", type: "boolean", default: "false", description: "是否允许半选" },
    { prop: "allowClear", type: "boolean", default: "true", description: "是否允许清除" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { prop: "readonly", type: "boolean", default: "false", description: "是否只读" },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "尺寸" },
]

function RateDemo() {
    const [value, setValue] = useState(3)
    return (
        <div className="space-y-2">
            <Rate value={value} onChange={setValue} />
            <p className="text-sm text-muted-foreground">当前评分: {value}</p>
        </div>
    )
}

export function RateDoc() {
    return (
        <DocSection
            id="rate"
            title="Rate 评分"
            description="用于对事物进行评级或展示评价星级。"
            props={rateProps}
        >
            <DocExample
                title="基本用法"
                code={`import { Rate } from '@/components/ui/rate'

const [value, setValue] = useState(3)
<Rate value={value} onChange={setValue} />`}
            >
                <RateDemo />
            </DocExample>

            <DocExample
                title="半选与尺寸"
                code={`<Rate allowHalf defaultValue={2.5} />
<Rate size="lg" defaultValue={4} />`}
            >
                <div className="space-y-4">
                    <div>
                        <span className="text-sm mr-2">半选:</span>
                        <Rate allowHalf defaultValue={2.5} />
                    </div>
                    <div>
                        <span className="text-sm mr-2">大尺寸:</span>
                        <Rate size="lg" defaultValue={4} />
                    </div>
                    <div>
                        <span className="text-sm mr-2">只读:</span>
                        <Rate value={4} readonly />
                    </div>
                </div>
            </DocExample>
        </DocSection>
    )
}
