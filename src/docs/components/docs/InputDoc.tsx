/**
 * Input 组件文档
 */

import { Input } from "../../../components/ui/input"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const inputProps: PropItem[] = [
    { prop: "type", type: "string", default: '"text"', description: "输入框类型（text, email, password 等）" },
    { prop: "placeholder", type: "string", default: "-", description: "占位文本" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { prop: "className", type: "string", default: "-", description: "自定义类名" },
]

export function InputDoc() {
    return (
        <DocSection
            id="input"
            title="Input 输入框"
            description="用于接收用户输入的文本框组件，支持所有原生 input 类型，带有 2px 边框和聚焦效果。"
            props={inputProps}
        >
            <DocExample
                title="基本用法"
                code={`import { Input } from '@/components/ui/input'

<Input placeholder="请输入内容..." />
<Input type="email" placeholder="输入邮箱" />
<Input type="password" placeholder="输入密码" />`}
            >
                <div className="space-y-4 max-w-sm">
                    <Input placeholder="请输入内容..." />
                    <Input type="email" placeholder="输入邮箱" />
                    <Input type="password" placeholder="输入密码" />
                </div>
            </DocExample>

            <DocExample
                title="禁用状态"
                code={`<Input disabled placeholder="禁用的输入框" />`}
            >
                <div className="max-w-sm">
                    <Input disabled placeholder="禁用的输入框" />
                </div>
            </DocExample>
        </DocSection>
    )
}
