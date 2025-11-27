/**
 * Menu 组件文档
 */

import { Menu } from "../../../components/ui/menu"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"
import { Home, Settings, Users, FileText, Bell } from "lucide-react"

const menuProps: PropItem[] = [
    { prop: "items", type: "MenuItem[]", default: "-", description: "菜单项" },
    { prop: "mode", type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'", description: "菜单模式" },
    { prop: "selectedKey", type: "string", default: "-", description: "当前选中的菜单项 key" },
    { prop: "defaultSelectedKey", type: "string", default: "-", description: "默认选中的菜单项 key" },
    { prop: "openKeys", type: "string[]", default: "-", description: "当前展开的子菜单 key 数组" },
    { prop: "defaultOpenKeys", type: "string[]", default: "[]", description: "默认展开的子菜单 key 数组" },
    { prop: "onSelect", type: "(key: string) => void", default: "-", description: "选中菜单项时的回调" },
    { prop: "onOpenChange", type: "(openKeys: string[]) => void", default: "-", description: "子菜单展开/收起的回调" },
    { prop: "collapsed", type: "boolean", default: "false", description: "是否折叠（仅 inline 模式）" },
]

const menuItems = [
    { key: 'home', label: '首页', icon: <Home className="h-4 w-4" /> },
    { key: 'users', label: '用户管理', icon: <Users className="h-4 w-4" /> },
    { 
        key: 'settings', 
        label: '系统设置', 
        icon: <Settings className="h-4 w-4" />,
        children: [
            { key: 'profile', label: '个人设置' },
            { key: 'security', label: '安全设置' },
        ]
    },
    { key: 'divider', label: '', divider: true },
    { key: 'docs', label: '文档', icon: <FileText className="h-4 w-4" /> },
    { key: 'notifications', label: '通知', icon: <Bell className="h-4 w-4" /> },
]

export function MenuDoc() {
    return (
        <DocSection
            id="menu"
            title="Menu 导航菜单"
            description="导航菜单组件，支持垂直、水平、内嵌三种模式，以及多级子菜单。"
            props={menuProps}
        >
            <DocExample
                title="垂直菜单"
                code={`<Menu
  items={[
    { key: 'home', label: '首页', icon: <Home /> },
    { key: 'users', label: '用户管理' },
    { key: 'settings', label: '设置', children: [...] },
  ]}
  onSelect={(key) => console.log(key)}
/>`}
            >
                <Menu 
                    items={menuItems}
                    defaultSelectedKey="home"
                    defaultOpenKeys={['settings']}
                />
            </DocExample>

            <DocExample
                title="水平菜单"
                code={`<Menu mode="horizontal" items={[...]} />`}
            >
                <Menu 
                    mode="horizontal"
                    items={[
                        { key: 'home', label: '首页' },
                        { key: 'products', label: '产品' },
                        { key: 'about', label: '关于我们' },
                        { key: 'contact', label: '联系我们' },
                    ]}
                    defaultSelectedKey="home"
                />
            </DocExample>

            <DocExample
                title="内嵌模式（带折叠）"
                code={`<Menu mode="inline" items={[...]} />`}
            >
                <div className="flex gap-4">
                    <Menu 
                        mode="inline"
                        items={menuItems}
                        defaultSelectedKey="home"
                        defaultOpenKeys={['settings']}
                    />
                </div>
            </DocExample>
        </DocSection>
    )
}
