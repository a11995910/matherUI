/**
 * Button 组件文档
 */

import { Button } from "../../../components/ui/button"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

// Button Props 定义
const buttonProps: PropItem[] = [
    { prop: "variant", type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', default: '"default"', description: "按钮样式变体" },
    { prop: "size", type: '"default" | "sm" | "lg" | "icon"', default: '"default"', description: "按钮尺寸" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
]

/**
 * Button 组件文档
 */
export function ButtonDoc() {
    return (
        <DocSection
            id="button"
            title="Button 按钮"
            description="用于触发操作的按钮组件，支持多种样式变体和大小，带有复古硬阴影效果。"
            props={buttonProps}
        >
            {/* 基本用法 */}
            <DocExample
                title="基本用法"
                code={`import { Button } from '@/components/ui/button'

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
            >
                <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                </div>
            </DocExample>

            {/* 不同尺寸 */}
            <DocExample
                title="不同尺寸"
                code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
            >
                <div className="flex items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
            </DocExample>

            {/* 禁用状态 */}
            <DocExample
                title="禁用状态"
                code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
            >
                <div className="flex gap-4">
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
            </DocExample>
        </DocSection>
    )
}
