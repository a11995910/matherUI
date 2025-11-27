/**
 * Upload 组件文档
 */

import { Upload } from "../../../components/ui/upload"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const uploadProps: PropItem[] = [
    { prop: "fileList", type: "UploadFile[]", default: "-", description: "文件列表" },
    { prop: "onChange", type: "(fileList: UploadFile[]) => void", default: "-", description: "文件列表改变时的回调" },
    { prop: "beforeUpload", type: "(file: File) => boolean | Promise<boolean>", default: "-", description: "上传前的钩子" },
    { prop: "accept", type: "string", default: "-", description: "接受的文件类型" },
    { prop: "multiple", type: "boolean", default: "false", description: "是否支持多选" },
    { prop: "maxCount", type: "number", default: "-", description: "最大文件数量" },
    { prop: "maxSize", type: "number", default: "-", description: "最大文件大小（字节）" },
    { prop: "listType", type: "'text' | 'picture' | 'picture-card'", default: "'text'", description: "展示类型" },
    { prop: "drag", type: "boolean", default: "false", description: "是否支持拖拽上传" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
]

export function UploadDoc() {
    return (
        <DocSection
            id="upload"
            title="Upload 文件上传"
            description="文件上传组件，支持拖拽上传、多文件、图片预览等功能。"
            props={uploadProps}
        >
            <DocExample
                title="基本用法"
                code={`<Upload>
  <p>点击上传文件</p>
</Upload>`}
            >
                <Upload />
            </DocExample>

            <DocExample
                title="拖拽上传"
                code={`<Upload drag multiple>
  <p>点击或拖拽文件到此处上传</p>
</Upload>`}
            >
                <Upload drag multiple tip="支持多文件上传" />
            </DocExample>

            <DocExample
                title="图片卡片模式"
                code={`<Upload
  listType="picture-card"
  accept="image/*"
  maxCount={3}
/>`}
            >
                <Upload 
                    listType="picture-card" 
                    accept="image/*" 
                    maxCount={3}
                />
            </DocExample>

            <DocExample
                title="图片列表模式"
                code={`<Upload listType="picture" accept="image/*" />`}
            >
                <Upload listType="picture" accept="image/*" />
            </DocExample>
        </DocSection>
    )
}
