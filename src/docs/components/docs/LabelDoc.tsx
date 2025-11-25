/**
 * Label 组件文档
 */

import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const labelProps: PropItem[] = [
    { prop: "htmlFor", type: "string", default: "-", description: "关联的表单控件 ID" },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "标签尺寸" },
    { prop: "required", type: "boolean", default: "false", description: "是否显示必填标记 *" },
]

export function LabelDoc() {
    return (
        <DocSection
            id="label"
            title="Label 表单标签"
            description="语义化的表单标签组件，用于为表单控件提供标签说明。"
            props={labelProps}
        >
            <DocExample
                title="基本用法"
                code={`import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="username">用户名</Label>
  <Input id="username" placeholder="请输入用户名" />
</div>

<div className="space-y-2">
  <Label htmlFor="password" required>密码</Label>
  <Input id="password" type="password" />
</div>`}
            >
                <div className="space-y-4 max-w-sm">
                    <div className="space-y-2">
                        <Label htmlFor="label-username">用户名</Label>
                        <Input id="label-username" placeholder="请输入用户名" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="label-password" required>密码</Label>
                        <Input id="label-password" type="password" placeholder="请输入密码" />
                    </div>
                </div>
            </DocExample>
        </DocSection>
    )
}
