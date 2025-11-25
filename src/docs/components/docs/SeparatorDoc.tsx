/**
 * Separator 组件文档
 */

import { Separator } from "../../../components/ui/separator"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const separatorProps: PropItem[] = [
    { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "分隔线方向" },
    { prop: "decorative", type: "boolean", default: "true", description: "是否为装饰性元素" },
]

export function SeparatorDoc() {
    return (
        <DocSection
            id="separator"
            title="Separator 分隔线"
            description="用于在内容之间创建视觉分隔，支持水平和垂直方向。"
            props={separatorProps}
        >
            <DocExample
                title="水平分隔线"
                code={`import { Separator } from '@/components/ui/separator'

<div className="space-y-4">
  <p>第一段内容</p>
  <Separator />
  <p>第二段内容</p>
</div>`}
            >
                <div className="space-y-4">
                    <p>第一段内容</p>
                    <Separator />
                    <p>第二段内容</p>
                    <Separator />
                    <p>第三段内容</p>
                </div>
            </DocExample>

            <DocExample
                title="垂直分隔线"
                code={`<div className="flex items-center gap-4 h-8">
  <span>首页</span>
  <Separator orientation="vertical" />
  <span>产品</span>
</div>`}
            >
                <div className="flex items-center gap-4 h-8">
                    <span>首页</span>
                    <Separator orientation="vertical" />
                    <span>产品</span>
                    <Separator orientation="vertical" />
                    <span>关于</span>
                </div>
            </DocExample>
        </DocSection>
    )
}
