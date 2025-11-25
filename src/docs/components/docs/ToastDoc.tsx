/**
 * Toast 组件文档
 */

import { Button } from "../../../components/ui/button"
import { toast } from "../../../components/ui/toast"
import { DocSection, DocExample } from "../DocSection"

export function ToastDoc() {
    return (
        <DocSection
            id="toast"
            title="Toast 消息提醒"
            description="轻量级的消息提醒组件，用于显示操作反馈、通知等信息。基于 Sonner 封装。"
        >
            <DocExample
                title="基本用法"
                code={`import { Toaster, toast } from '@/components/ui/toast'

// 在应用根组件添加 Toaster
<Toaster />

// 调用 toast
toast("普通消息")
toast.success("成功消息")
toast.error("错误消息")
toast.info("提示消息")
toast.warning("警告消息")`}
            >
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => toast("这是一条普通消息")}>普通消息</Button>
                    <Button variant="secondary" onClick={() => toast.success("操作成功！")}>成功消息</Button>
                    <Button variant="destructive" onClick={() => toast.error("操作失败！")}>错误消息</Button>
                    <Button variant="outline" onClick={() => toast.info("这是一条提示信息")}>提示消息</Button>
                </div>
            </DocExample>

            <DocExample
                title="带描述的消息"
                code={`toast("文件已保存", {
  description: "您的更改已自动保存到云端"
})`}
            >
                <Button onClick={() => toast("文件已保存", { description: "您的更改已自动保存到云端" })}>
                    显示带描述的消息
                </Button>
            </DocExample>
        </DocSection>
    )
}
