/**
 * Timeline 组件文档
 */

import { Timeline } from "../../../components/ui/timeline"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const timelineProps: PropItem[] = [
    { prop: "items", type: "TimelineItem[]", default: "-", description: "时间线项" },
    { prop: "mode", type: "'left' | 'right' | 'alternate'", default: "'left'", description: "模式" },
    { prop: "reverse", type: "boolean", default: "false", description: "是否倒序" },
    { prop: "pending", type: "ReactNode", default: "-", description: "是否显示尾部（加载中状态）" },
]

const basicItems = [
    { title: '创建订单', time: '2024-01-01 09:00', status: 'success' as const },
    { title: '支付完成', time: '2024-01-01 09:05', status: 'success' as const },
    { title: '商家发货', time: '2024-01-02 14:00', status: 'success' as const },
    { title: '配送中', time: '2024-01-03 10:00', status: 'pending' as const },
]

export function TimelineDoc() {
    return (
        <DocSection
            id="timeline"
            title="Timeline 时间线"
            description="时间线组件，用于展示时间流信息，支持多种状态和布局模式。"
            props={timelineProps}
        >
            <DocExample
                title="基本用法"
                code={`<Timeline
  items={[
    { title: '创建订单', time: '2024-01-01', status: 'success' },
    { title: '支付完成', time: '2024-01-02', status: 'success' },
    { title: '配送中', time: '2024-01-03', status: 'pending' },
  ]}
/>`}
            >
                <Timeline items={basicItems} />
            </DocExample>

            <DocExample
                title="带描述"
                code={`<Timeline
  items={[
    { 
      title: '创建订单', 
      description: '订单号：2024010100001',
      time: '2024-01-01',
      status: 'success' 
    },
    ...
  ]}
/>`}
            >
                <Timeline 
                    items={[
                        { title: '创建订单', description: '订单号：2024010100001', time: '2024-01-01 09:00', status: 'success' },
                        { title: '支付完成', description: '使用微信支付 ¥199.00', time: '2024-01-01 09:05', status: 'success' },
                        { title: '商家发货', description: '顺丰快递 SF1234567890', time: '2024-01-02 14:00', status: 'success' },
                        { title: '配送中', description: '预计 1-2 天送达', time: '2024-01-03 10:00', status: 'pending' },
                    ]}
                />
            </DocExample>

            <DocExample
                title="交替模式"
                code={`<Timeline mode="alternate" items={[...]} />`}
            >
                <Timeline mode="alternate" items={basicItems} />
            </DocExample>

            <DocExample
                title="右侧模式"
                code={`<Timeline mode="right" items={[...]} />`}
            >
                <Timeline mode="right" items={basicItems} />
            </DocExample>
        </DocSection>
    )
}
