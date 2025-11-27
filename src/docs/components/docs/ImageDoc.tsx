/**
 * Image 组件文档
 */

import { Image } from "../../../components/ui/image"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const imageProps: PropItem[] = [
    { prop: "src", type: "string", default: "-", description: "图片地址" },
    { prop: "alt", type: "string", default: "''", description: "替代文本" },
    { prop: "width", type: "number | string", default: "-", description: "宽度" },
    { prop: "height", type: "number | string", default: "-", description: "高度" },
    { prop: "preview", type: "boolean", default: "false", description: "是否支持预览" },
    { prop: "previewSrc", type: "string", default: "-", description: "预览图地址" },
    { prop: "fallback", type: "string", default: "-", description: "加载失败时的占位图" },
    { prop: "placeholder", type: "ReactNode", default: "-", description: "加载中占位符" },
    { prop: "fit", type: "'contain' | 'cover' | 'fill' | 'none' | 'scale-down'", default: "'cover'", description: "图片填充模式" },
]

export function ImageDoc() {
    return (
        <DocSection
            id="image"
            title="Image 图片"
            description="图片组件，支持预览、缩放、旋转、加载状态和错误处理。"
            props={imageProps}
        >
            <DocExample
                title="基本用法"
                code={`<Image 
  src="https://picsum.photos/200/200" 
  width={200} 
  height={200} 
/>`}
            >
                <Image 
                    src="https://picsum.photos/200/200" 
                    alt="示例图片"
                    width={200} 
                    height={200} 
                />
            </DocExample>

            <DocExample
                title="图片预览"
                code={`<Image 
  src="https://picsum.photos/200/200" 
  width={200} 
  height={200}
  preview 
/>`}
            >
                <div>
                    <p className="text-sm text-muted-foreground mb-2">点击图片可预览</p>
                    <Image 
                        src="https://picsum.photos/400/300" 
                        alt="可预览图片"
                        width={200} 
                        height={150}
                        preview
                    />
                </div>
            </DocExample>

            <DocExample
                title="不同填充模式"
                code={`<Image fit="contain" />
<Image fit="cover" />
<Image fit="fill" />`}
            >
                <div className="flex gap-4">
                    <div>
                        <p className="text-sm mb-2">contain</p>
                        <Image 
                            src="https://picsum.photos/300/200" 
                            width={150} 
                            height={150}
                            fit="contain"
                        />
                    </div>
                    <div>
                        <p className="text-sm mb-2">cover</p>
                        <Image 
                            src="https://picsum.photos/300/200" 
                            width={150} 
                            height={150}
                            fit="cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm mb-2">fill</p>
                        <Image 
                            src="https://picsum.photos/300/200" 
                            width={150} 
                            height={150}
                            fit="fill"
                        />
                    </div>
                </div>
            </DocExample>
        </DocSection>
    )
}
