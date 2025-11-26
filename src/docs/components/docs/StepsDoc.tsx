/**
 * Steps 组件文档
 */

import { useState } from "react"
import { Steps } from "../../../components/ui/steps"
import { Button } from "../../../components/ui/button"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const stepsProps: PropItem[] = [
    { prop: "items", type: "StepItem[]", default: "-", description: "步骤数据数组" },
    { prop: "current", type: "number", default: "0", description: "当前步骤（从0开始）" },
    { prop: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "步骤方向" },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "尺寸" },
    { prop: "clickable", type: "boolean", default: "false", description: "是否可点击切换" },
    { prop: "onChange", type: "(current: number) => void", default: "-", description: "步骤变化回调" },
]

const stepItems = [
    { title: "填写信息", description: "填写基本资料" },
    { title: "身份验证", description: "验证手机号码" },
    { title: "完成注册", description: "注册成功" },
]

function StepsDemo() {
    const [current, setCurrent] = useState(1)
    return (
        <div className="space-y-4">
            <Steps items={stepItems} current={current} />
            <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
                    上一步
                </Button>
                <Button size="sm" onClick={() => setCurrent(Math.min(2, current + 1))} disabled={current === 2}>
                    下一步
                </Button>
            </div>
        </div>
    )
}

export function StepsDoc() {
    return (
        <DocSection
            id="steps"
            title="Steps 步骤条"
            description="引导用户按流程完成任务的导航条，常用于注册、订单等分步操作。"
            props={stepsProps}
        >
            <DocExample
                title="基本用法"
                code={`import { Steps } from '@/components/ui/steps'

const [current, setCurrent] = useState(1)

<Steps
  current={current}
  items={[
    { title: "填写信息", description: "填写基本资料" },
    { title: "身份验证", description: "验证手机号码" },
    { title: "完成注册", description: "注册成功" },
  ]}
/>`}
            >
                <StepsDemo />
            </DocExample>

            <DocExample
                title="垂直方向"
                code={`<Steps direction="vertical" current={1} items={...} />`}
            >
                <Steps direction="vertical" current={1} items={stepItems} />
            </DocExample>
        </DocSection>
    )
}
