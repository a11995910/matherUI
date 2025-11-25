/**
 * DocSection 文档章节组件
 * 用于渲染单个组件的文档内容
 */

import type { ReactNode } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { CodeBlock } from "../../components/ui/code-block"
import { H3, P } from "../../components/ui/typography"
import { PropsTable } from "./PropsTable"
import type { PropItem } from "../types"

interface DocSectionProps {
    /** 组件ID（用于锚点） */
    id: string
    /** 组件标题（英文 + 中文） */
    title: string
    /** 组件描述 */
    description: string
    /** 子内容（示例区域） */
    children: ReactNode
    /** Props 数据（可选，如果提供则渲染 Props 表格） */
    props?: PropItem[]
}

/**
 * DocSection - 文档章节容器
 * 
 * @example
 * <DocSection
 *   id="button"
 *   title="Button 按钮"
 *   description="用于触发操作的按钮组件"
 *   props={buttonProps}
 * >
 *   <DocExample title="基本用法" code={code}>
 *     <Button>点击</Button>
 *   </DocExample>
 * </DocSection>
 */
export function DocSection({ id, title, description, children, props }: DocSectionProps) {
    return (
        <section id={id} className="mb-16 scroll-mt-24">
            <H3>{title}</H3>
            <P className="mb-6">{description}</P>

            <div className="space-y-8">
                {children}

                {props && props.length > 0 && (
                    <PropsTable data={props} />
                )}
            </div>
        </section>
    )
}

interface DocExampleProps {
    /** 示例标题 */
    title: string
    /** 代码片段 */
    code: string
    /** 演示内容 */
    children: ReactNode
}

/**
 * DocExample - 文档示例组件
 * 包含演示区域和代码块
 */
export function DocExample({ title, code, children }: DocExampleProps) {
    return (
        <div>
            <h4 className="font-bold mb-3">{title}</h4>
            <Card className="bg-card">
                <CardContent className="p-8">
                    {children}
                </CardContent>
            </Card>
            <CodeBlock title="代码">
                {code}
            </CodeBlock>
        </div>
    )
}
