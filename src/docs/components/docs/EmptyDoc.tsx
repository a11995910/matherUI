/**
 * Empty 组件文档
 */

import { Empty } from "../../../components/ui/empty"
import { Button } from "../../../components/ui/button"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const emptyProps: PropItem[] = [
    { prop: "title", type: "string", default: "-", description: "标题文字" },
    { prop: "description", type: "string", default: '"暂无数据"', description: "描述文字" },
    { prop: "icon", type: "ReactNode", default: "-", description: "自定义图标" },
    { prop: "action", type: "ReactNode", default: "-", description: "底部操作区域" },
    { prop: "image", type: "string", default: "-", description: "自定义图片地址" },
]

export function EmptyDoc() {
    return (
        <DocSection
            id="empty"
            title="Empty 空状态"
            description="空状态时的占位提示，用于展示空数据时的友好提示。"
            props={emptyProps}
        >
            <DocExample
                title="基本用法"
                code={`import { Empty } from '@/components/ui/empty'

<Empty />
<Empty description="暂无搜索结果" />`}
            >
                <div className="flex gap-8">
                    <Empty />
                    <Empty description="暂无搜索结果" />
                </div>
            </DocExample>

            <DocExample
                title="带标题和操作"
                code={`<Empty
  title="没有找到数据"
  description="请尝试其他搜索条件"
  action={<Button>重新搜索</Button>}
/>`}
            >
                <Empty
                    title="没有找到数据"
                    description="请尝试其他搜索条件"
                    action={<Button size="sm">重新搜索</Button>}
                />
            </DocExample>
        </DocSection>
    )
}
