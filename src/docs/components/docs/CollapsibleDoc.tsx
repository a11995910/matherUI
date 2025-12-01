/**
 * Collapsible 折叠组件文档
 */

import { useState } from "react"
import { Collapsible } from "../../../components/ui/collapsible"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"
import { Badge } from "../../../components/ui/badge"

const collapsibleProps: PropItem[] = [
    { prop: "title", type: "ReactNode", default: "-", description: "标题内容" },
    { prop: "defaultOpen", type: "boolean", default: "true", description: "默认是否展开" },
    { prop: "open", type: "boolean", default: "-", description: "受控模式：是否展开" },
    { prop: "onOpenChange", type: "(open: boolean) => void", default: "-", description: "展开状态变化回调" },
    { prop: "iconPosition", type: "'left' | 'right'", default: "'left'", description: "箭头图标位置" },
    { prop: "titleClassName", type: "string", default: "-", description: "标题额外样式" },
    { prop: "contentClassName", type: "string", default: "-", description: "内容区域额外样式" },
]

export function CollapsibleDoc() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <DocSection
            id="collapsible"
            title="Collapsible 折叠面板"
            description="可折叠的内容面板，支持受控和非受控模式，带平滑展开/收起动画。"
            props={collapsibleProps}
        >
            <DocExample
                title="基础用法"
                code={`<Collapsible title="点击展开/收起" defaultOpen>
    <div>折叠的内容...</div>
</Collapsible>`}
            >
                <div className="space-y-4">
                    <Collapsible title="基础组件" defaultOpen>
                        <div className="space-y-1 text-sm">
                            <div className="py-1 px-2 hover:bg-muted rounded">Button 按钮</div>
                            <div className="py-1 px-2 hover:bg-muted rounded">Badge 徽章</div>
                            <div className="py-1 px-2 hover:bg-muted rounded">Input 输入框</div>
                        </div>
                    </Collapsible>

                    <Collapsible title="高级组件" defaultOpen={false}>
                        <div className="space-y-1 text-sm">
                            <div className="py-1 px-2 hover:bg-muted rounded">DatePicker 日期选择</div>
                            <div className="py-1 px-2 hover:bg-muted rounded">Upload 上传</div>
                            <div className="py-1 px-2 hover:bg-muted rounded">Calendar 日历</div>
                        </div>
                    </Collapsible>
                </div>
            </DocExample>

            <DocExample
                title="自定义标题"
                code={`<Collapsible 
    title={<span>标题 <Badge>NEW</Badge></span>}
>
    ...
</Collapsible>`}
            >
                <Collapsible 
                    title={
                        <span className="flex items-center gap-2">
                            特效组件
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">NEW</Badge>
                        </span>
                    }
                    defaultOpen
                >
                    <div className="space-y-1 text-sm">
                        <div className="py-1 px-2 hover:bg-muted rounded">Typewriter 打字机</div>
                        <div className="py-1 px-2 hover:bg-muted rounded">TiltCard 倾斜卡片</div>
                        <div className="py-1 px-2 hover:bg-muted rounded">Marquee 跑马灯</div>
                    </div>
                </Collapsible>
            </DocExample>

            <DocExample
                title="受控模式"
                code={`const [isOpen, setIsOpen] = useState(true)

<Collapsible 
    title="受控折叠"
    open={isOpen}
    onOpenChange={setIsOpen}
>
    ...
</Collapsible>`}
            >
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-3 py-1 text-sm border-2 border-border hover:bg-muted"
                        >
                            {isOpen ? '收起' : '展开'}
                        </button>
                        <span className="text-sm text-muted-foreground py-1">
                            当前状态: {isOpen ? '展开' : '收起'}
                        </span>
                    </div>
                    <Collapsible 
                        title="受控折叠面板"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <div className="p-4 bg-muted/50 rounded text-sm">
                            这是一个受控的折叠面板，可以通过外部按钮控制展开/收起状态。
                        </div>
                    </Collapsible>
                </div>
            </DocExample>

            <DocExample
                title="图标位置"
                code={`<Collapsible title="图标在右边" iconPosition="right">
    ...
</Collapsible>`}
            >
                <div className="space-y-4">
                    <Collapsible title="图标在左边（默认）" iconPosition="left" defaultOpen>
                        <div className="p-2 text-sm text-muted-foreground">
                            箭头图标显示在标题左侧
                        </div>
                    </Collapsible>
                    <Collapsible title="图标在右边" iconPosition="right" defaultOpen>
                        <div className="p-2 text-sm text-muted-foreground">
                            箭头图标显示在标题右侧
                        </div>
                    </Collapsible>
                </div>
            </DocExample>
        </DocSection>
    )
}
