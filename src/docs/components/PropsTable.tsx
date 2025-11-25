/**
 * Props 表格组件
 * 用于展示组件的 API 文档
 */

import type { PropItem } from "../types"

interface PropsTableProps {
    /** 表格数据 */
    data: PropItem[]
    /** 表格标题 */
    title?: string
}

/**
 * PropsTable - API 文档表格
 * 
 * @param data - Props 数据数组
 * @param title - 可选的表格标题
 */
export function PropsTable({ data, title = "Props API" }: PropsTableProps) {
    return (
        <div>
            <h4 className="font-bold mb-3">{title}</h4>
            <div className="overflow-auto">
                <table className="w-full border-2 border-border">
                    <thead>
                        <tr className="border-b-2 border-border bg-muted">
                            <th className="p-3 text-left font-bold">Prop</th>
                            <th className="p-3 text-left font-bold">类型</th>
                            <th className="p-3 text-left font-bold">默认值</th>
                            <th className="p-3 text-left font-bold">描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className={i < data.length - 1 ? "border-b border-border" : ""}>
                                <td className="p-3 font-mono text-sm">{row.prop}</td>
                                <td className="p-3 font-mono text-sm">{row.type}</td>
                                <td className="p-3 font-mono text-sm">{row.default}</td>
                                <td className="p-3">{row.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
