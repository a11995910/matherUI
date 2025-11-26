/**
 * Tag 组件文档
 */

import { useState } from "react"
import { Tag } from "../../../components/ui/tag"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const tagProps: PropItem[] = [
    { prop: "variant", type: '"default" | "secondary" | "outline" | "success" | "warning" | "error" | "info"', default: '"default"', description: "标签颜色变体" },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "标签尺寸" },
    { prop: "closable", type: "boolean", default: "false", description: "是否可关闭" },
    { prop: "onClose", type: "(e) => void", default: "-", description: "关闭时的回调" },
    { prop: "icon", type: "ReactNode", default: "-", description: "前置图标" },
]

function TagDemo() {
    const [tags, setTags] = useState(["标签1", "标签2", "标签3"])
    const handleClose = (tag: string) => {
        setTags(tags.filter(t => t !== tag))
    }
    return (
        <div className="flex gap-2 flex-wrap">
            {tags.map(tag => (
                <Tag key={tag} closable onClose={() => handleClose(tag)}>
                    {tag}
                </Tag>
            ))}
        </div>
    )
}

export function TagDoc() {
    return (
        <DocSection
            id="tag"
            title="Tag 标签"
            description="用于标记和分类的小标签组件，支持多种颜色和可关闭功能。"
            props={tagProps}
        >
            <DocExample
                title="不同颜色"
                code={`import { Tag } from '@/components/ui/tag'

<Tag>默认</Tag>
<Tag variant="secondary">次要</Tag>
<Tag variant="success">成功</Tag>
<Tag variant="warning">警告</Tag>
<Tag variant="error">错误</Tag>
<Tag variant="info">信息</Tag>`}
            >
                <div className="flex gap-2 flex-wrap">
                    <Tag>默认</Tag>
                    <Tag variant="secondary">次要</Tag>
                    <Tag variant="outline">轮廓</Tag>
                    <Tag variant="success">成功</Tag>
                    <Tag variant="warning">警告</Tag>
                    <Tag variant="error">错误</Tag>
                    <Tag variant="info">信息</Tag>
                </div>
            </DocExample>

            <DocExample
                title="可关闭标签"
                code={`const [tags, setTags] = useState(["标签1", "标签2", "标签3"])

{tags.map(tag => (
  <Tag key={tag} closable onClose={() => handleClose(tag)}>
    {tag}
  </Tag>
))}`}
            >
                <TagDemo />
            </DocExample>
        </DocSection>
    )
}
