/**
 * Charts 图表组件文档
 */

import { 
    BarChart, 
    LineChart, 
    AreaChart, 
    PieChart, 
    DonutChart,
    MultiLineChart,
    StackedBarChart
} from "../../../components/charts"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const chartProps: PropItem[] = [
    { prop: "data", type: "ChartData[]", default: "-", description: "图表数据" },
    { prop: "dataKey", type: "string", default: "'value'", description: "数据字段名" },
    { prop: "xKey", type: "string", default: "'name'", description: "X轴字段名" },
    { prop: "height", type: "number", default: "300", description: "图表高度" },
]

// 示例数据
const sampleData = [
    { name: '一月', value: 4000 },
    { name: '二月', value: 3000 },
    { name: '三月', value: 5000 },
    { name: '四月', value: 4500 },
    { name: '五月', value: 6000 },
]

const pieData = [
    { name: '直接访问', value: 335 },
    { name: '搜索引擎', value: 310 },
    { name: '社交媒体', value: 234 },
    { name: '邮件营销', value: 121 },
]

const multiLineData = [
    { name: '一月', 本年: 4000, 去年: 2400 },
    { name: '二月', 本年: 3000, 去年: 1398 },
    { name: '三月', 本年: 5000, 去年: 3800 },
    { name: '四月', 本年: 4500, 去年: 3908 },
]

const stackedData = [
    { name: '一月', 产品A: 4000, 产品B: 2400, 产品C: 1200 },
    { name: '二月', 产品A: 3000, 产品B: 1398, 产品C: 2210 },
    { name: '三月', 产品A: 2000, 产品B: 3800, 产品C: 2290 },
]

export function ChartsDoc() {
    return (
        <DocSection
            id="charts"
            title="Charts 图表"
            description="基于 Recharts 封装的图表组件，支持柱状图、折线图、面积图、饼图、环形图等多种类型。"
            props={chartProps}
        >
            <DocExample
                title="柱状图 BarChart"
                code={`<BarChart data={data} />`}
            >
                <BarChart data={sampleData} height={250} />
            </DocExample>

            <DocExample
                title="折线图 LineChart"
                code={`<LineChart data={data} />`}
            >
                <LineChart data={sampleData} height={250} />
            </DocExample>

            <DocExample
                title="面积图 AreaChart"
                code={`<AreaChart data={data} color="#4ecdc4" />`}
            >
                <AreaChart data={sampleData} height={250} color="#4ecdc4" />
            </DocExample>

            <DocExample
                title="饼图 PieChart"
                code={`<PieChart data={pieData} />`}
            >
                <PieChart data={pieData} height={300} />
            </DocExample>

            <DocExample
                title="环形图 DonutChart"
                code={`<DonutChart data={pieData} centerText="总计" />`}
            >
                <DonutChart data={pieData} height={300} centerText="1000" />
            </DocExample>

            <DocExample
                title="多折线图 MultiLineChart"
                code={`<MultiLineChart 
  data={data} 
  lines={[
    { dataKey: '本年', color: '#66b3ff' },
    { dataKey: '去年', color: '#ff6b6b' }
  ]}
/>`}
            >
                <MultiLineChart 
                    data={multiLineData} 
                    height={250}
                    lines={[
                        { dataKey: '本年', color: '#66b3ff', name: '本年' },
                        { dataKey: '去年', color: '#ff6b6b', name: '去年' }
                    ]}
                />
            </DocExample>

            <DocExample
                title="堆叠柱状图 StackedBarChart"
                code={`<StackedBarChart 
  data={data}
  bars={[
    { dataKey: '产品A', color: '#66b3ff' },
    { dataKey: '产品B', color: '#ff6b6b' },
    { dataKey: '产品C', color: '#4ecdc4' }
  ]}
/>`}
            >
                <StackedBarChart 
                    data={stackedData}
                    height={250}
                    bars={[
                        { dataKey: '产品A', color: '#66b3ff', name: '产品A' },
                        { dataKey: '产品B', color: '#ff6b6b', name: '产品B' },
                        { dataKey: '产品C', color: '#4ecdc4', name: '产品C' }
                    ]}
                />
            </DocExample>
        </DocSection>
    )
}
