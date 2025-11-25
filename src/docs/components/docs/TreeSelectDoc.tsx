/**
 * TreeSelect 组件文档
 */

import { useState } from "react"
import { TreeSelect, type TreeNode } from "../../../components/ui/tree-select"
import { DocSection, DocExample } from "../DocSection"
import { PropsTable } from "../PropsTable"
import type { PropItem } from "../../types"

// 组织架构演示数据
const orgData: TreeNode[] = [
    {
        id: '1',
        label: '总公司',
        icon: 'department',
        children: [
            {
                id: '1-1',
                label: '技术部',
                icon: 'department',
                children: [
                    { id: '1-1-1', label: '前端组', icon: 'folder' },
                    { id: '1-1-2', label: '后端组', icon: 'folder' },
                    { id: '1-1-3', label: '测试组', icon: 'folder' },
                ]
            },
            {
                id: '1-2',
                label: '产品部',
                icon: 'department',
                children: [
                    { id: '1-2-1', label: '产品设计', icon: 'folder' },
                    { id: '1-2-2', label: '用户研究', icon: 'folder' },
                ]
            },
            {
                id: '1-3',
                label: '市场部',
                icon: 'department',
            }
        ]
    }
]

// 角色权限演示数据
const roleData: TreeNode[] = [
    {
        id: 'admin',
        label: '管理员权限',
        icon: 'folder',
        children: [
            { id: 'admin-user', label: '用户管理', icon: 'user' },
            { id: 'admin-role', label: '角色管理', icon: 'user' },
            { id: 'admin-system', label: '系统设置', icon: 'user' },
        ]
    },
    {
        id: 'content',
        label: '内容权限',
        icon: 'folder',
        children: [
            { id: 'content-create', label: '创建内容', icon: 'user' },
            { id: 'content-edit', label: '编辑内容', icon: 'user' },
            { id: 'content-delete', label: '删除内容', icon: 'user' },
        ]
    }
]

const treeSelectProps: PropItem[] = [
    { prop: "data", type: "TreeNode[]", default: "-", description: "树形数据" },
    { prop: "value", type: "string | string[]", default: "-", description: "选中的值" },
    { prop: "onChange", type: "(value, nodes) => void", default: "-", description: "值改变回调" },
    { prop: "multiple", type: "boolean", default: "false", description: "是否多选" },
    { prop: "searchable", type: "boolean", default: "true", description: "是否可搜索" },
    { prop: "defaultExpandAll", type: "boolean", default: "false", description: "是否默认展开所有节点" },
    { prop: "clearable", type: "boolean", default: "true", description: "是否显示清除按钮" },
    { prop: "placeholder", type: "string", default: '"请选择"', description: "占位文本" },
]

const treeNodeProps: PropItem[] = [
    { prop: "id", type: "string", default: "-", description: "唯一标识" },
    { prop: "label", type: "string", default: "-", description: "显示标签" },
    { prop: "children", type: "TreeNode[]", default: "-", description: "子节点" },
    { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { prop: "icon", type: '"folder" | "user" | "department" | ReactNode', default: "-", description: "节点图标" },
]

// 单选演示组件
function TreeSelectSingleDemo() {
    const [selected, setSelected] = useState<string>('')
    return (
        <div className="w-full max-w-sm">
            <TreeSelect
                data={orgData}
                value={selected}
                onChange={(value) => setSelected(value as string)}
                placeholder="选择部门"
                defaultExpandAll
            />
            {selected && <p className="mt-2 text-sm text-muted-foreground">已选择: {selected}</p>}
        </div>
    )
}

// 多选演示组件
function TreeSelectMultiDemo() {
    const [selected, setSelected] = useState<string[]>([])
    return (
        <div className="w-full max-w-sm">
            <TreeSelect
                data={roleData}
                value={selected}
                onChange={(value) => setSelected(value as string[])}
                placeholder="选择角色权限"
                multiple
                defaultExpandAll
            />
            {selected.length > 0 && <p className="mt-2 text-sm text-muted-foreground">已选择 {selected.length} 项</p>}
        </div>
    )
}

export function TreeSelectDoc() {
    return (
        <DocSection
            id="tree-select"
            title="TreeSelect 树状选择器"
            description="用于选择树形结构数据的组件，适合组织架构、角色权限、分类目录等场景。支持单选/多选、搜索过滤、展开/折叠等功能。"
        >
            <DocExample
                title="组织架构选择"
                code={`import { TreeSelect, type TreeNode } from '@/components/ui/tree-select'

const orgData: TreeNode[] = [
  {
    id: '1',
    label: '总公司',
    icon: 'department',
    children: [
      {
        id: '1-1',
        label: '技术部',
        icon: 'department',
        children: [
          { id: '1-1-1', label: '前端组', icon: 'folder' },
          { id: '1-1-2', label: '后端组', icon: 'folder' },
        ]
      },
    ]
  }
]

const [selected, setSelected] = useState<string>('')

<TreeSelect
  data={orgData}
  value={selected}
  onChange={(value) => setSelected(value as string)}
  placeholder="选择部门"
  defaultExpandAll
/>`}
            >
                <TreeSelectSingleDemo />
            </DocExample>

            <DocExample
                title="多选模式"
                code={`<TreeSelect
  data={roleData}
  value={selectedRoles}
  onChange={(value) => setSelectedRoles(value as string[])}
  placeholder="选择角色权限"
  multiple
  defaultExpandAll
/>`}
            >
                <TreeSelectMultiDemo />
            </DocExample>

            <div>
                <h4 className="font-bold mb-3">Props API</h4>
                <PropsTable data={treeSelectProps} title="TreeSelect Props" />
            </div>

            <div>
                <h4 className="font-bold mb-3">TreeNode 数据结构</h4>
                <PropsTable data={treeNodeProps} title="TreeNode" />
            </div>
        </DocSection>
    )
}
