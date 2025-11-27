/**
 * InputNumber 组件文档
 */

import { InputNumber } from "../../../components/ui/input-number"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const inputNumberProps: PropItem[] = [
    { prop: "value", type: "number", default: "-", description: "当前值" },
    { prop: "defaultValue", type: "number", default: "0", description: "默认值" },
    { prop: "min", type: "number", default: "-Infinity", description: "最小值" },
    { prop: "max", type: "number", default: "Infinity", description: "最大值" },
    { prop: "step", type: "number", default: "1", description: "步长" },
    { prop: "precision", type: "number", default: "-", description: "精度（小数位数）" },
    { prop: "size", type: "'sm' | 'default' | 'lg'", default: "'default'", description: "尺寸" },
    { prop: "controls", type: "boolean", default: "true", description: "是否显示增减按钮" },
    { prop: "controlsPosition", type: "'both' | 'right'", default: "'both'", description: "按钮位置" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { prop: "onChange", type: "(value: number | undefined) => void", default: "-", description: "值改变时的回调" },
]

export function InputNumberDoc() {
    return (
        <DocSection
            id="input-number"
            title="InputNumber 数字输入框"
            description="数字输入框组件，支持加减按钮、步长控制、精度设置和键盘操作。"
            props={inputNumberProps}
        >
            <DocExample
                title="基本用法"
                code={`<InputNumber min={0} max={100} defaultValue={10} />`}
            >
                <div className="flex flex-wrap gap-4 items-center">
                    <InputNumber min={0} max={100} defaultValue={10} />
                </div>
            </DocExample>

            <DocExample
                title="不同尺寸"
                code={`<InputNumber size="sm" defaultValue={5} />
<InputNumber size="default" defaultValue={10} />
<InputNumber size="lg" defaultValue={15} />`}
            >
                <div className="flex flex-wrap gap-4 items-center">
                    <InputNumber size="sm" defaultValue={5} />
                    <InputNumber size="default" defaultValue={10} />
                    <InputNumber size="lg" defaultValue={15} />
                </div>
            </DocExample>

            <DocExample
                title="步长和精度"
                code={`<InputNumber step={5} defaultValue={10} />
<InputNumber step={0.01} precision={2} defaultValue={1.5} />`}
            >
                <div className="flex flex-wrap gap-6 items-end">
                    <div>
                        <p className="text-sm mb-2">步长为 5</p>
                        <InputNumber step={5} defaultValue={10} />
                    </div>
                    <div>
                        <p className="text-sm mb-2">精度 2 位小数</p>
                        <InputNumber step={0.01} precision={2} defaultValue={1.5} />
                    </div>
                </div>
            </DocExample>

            <DocExample
                title="按钮位置"
                code={`<InputNumber controlsPosition="both" />
<InputNumber controlsPosition="right" />`}
            >
                <div className="flex flex-wrap gap-6 items-end">
                    <div>
                        <p className="text-sm mb-2">两侧按钮</p>
                        <InputNumber controlsPosition="both" defaultValue={10} />
                    </div>
                    <div>
                        <p className="text-sm mb-2">右侧堆叠按钮</p>
                        <InputNumber controlsPosition="right" defaultValue={10} />
                    </div>
                </div>
            </DocExample>
        </DocSection>
    )
}
