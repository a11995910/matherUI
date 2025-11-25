/**
 * Drawer 组件文档
 */

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose
} from "../../../components/ui/drawer"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const drawerProps: PropItem[] = [
    { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "抽屉滑出方向" },
    { prop: "showClose", type: "boolean", default: "true", description: "是否显示关闭按钮" },
]

export function DrawerDoc() {
    return (
        <DocSection
            id="drawer"
            title="Drawer 抽屉"
            description="从屏幕边缘滑出的面板组件，支持从四个方向滑出，适合展示详情或表单。"
            props={drawerProps}
        >
            <DocExample
                title="基本用法"
                code={`import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'

<Drawer>
  <DrawerTrigger asChild>
    <Button>打开抽屉</Button>
  </DrawerTrigger>
  <DrawerContent side="right"> {/* side: top | right | bottom | left */}
    <DrawerHeader>
      <DrawerTitle>标题</DrawerTitle>
      <DrawerDescription>描述文字</DrawerDescription>
    </DrawerHeader>
    <div className="p-6">内容区域</div>
    <DrawerFooter>
      <Button>确认</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
            >
                <div className="flex gap-4">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button>打开右侧抽屉</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>编辑资料</DrawerTitle>
                                <DrawerDescription>在这里修改您的个人信息</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="drawer-name">姓名</Label>
                                    <Input id="drawer-name" placeholder="请输入姓名" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="drawer-email">邮箱</Label>
                                    <Input id="drawer-email" type="email" placeholder="请输入邮箱" />
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline">取消</Button>
                                </DrawerClose>
                                <Button>保存</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline">打开左侧抽屉</Button>
                        </DrawerTrigger>
                        <DrawerContent side="left">
                            <DrawerHeader>
                                <DrawerTitle>导航菜单</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-6">
                                <nav className="space-y-2">
                                    <a href="#" className="block p-2 hover:bg-muted">首页</a>
                                    <a href="#" className="block p-2 hover:bg-muted">产品</a>
                                    <a href="#" className="block p-2 hover:bg-muted">关于我们</a>
                                </nav>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </DocExample>
        </DocSection>
    )
}
