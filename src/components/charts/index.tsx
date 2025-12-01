import { 
    BarChart as RechartsBarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    ResponsiveContainer, 
    LineChart as RechartsLineChart, 
    Line,
    AreaChart as RechartsAreaChart,
    Area,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts'

/**
 * 图表数据类型
 */
interface ChartData {
    name: string
    value?: number
    [key: string]: string | number | undefined
}

/**
 * 饼图/环形图数据类型
 */
interface PieChartData {
    name: string
    value: number
    color?: string
    [key: string]: string | number | undefined
}

// 默认颜色方案
const COLORS = ['#66b3ff', '#ff6b6b', '#4ecdc4', '#ffd93d', '#95e1d3', '#f38181']

interface BarChartProps {
    data: ChartData[]
    dataKey?: string
    xKey?: string
    height?: number
}

export function BarChart({ data, dataKey = 'value', xKey = 'name', height = 300 }: BarChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeWidth={2} stroke="#000" />
                    <XAxis
                        dataKey={xKey}
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <YAxis
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <Bar dataKey={dataKey} fill="#66b3ff" stroke="#000" strokeWidth={2} />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}

interface LineChartProps {
    data: ChartData[]
    dataKey?: string
    xKey?: string
    height?: number
}

export function LineChart({ data, dataKey = 'value', xKey = 'name', height = 300 }: LineChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsLineChart data={data}>
                    <CartesianGrid strokeWidth={2} stroke="#000" />
                    <XAxis
                        dataKey={xKey}
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <YAxis
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            border: '2px solid #000', 
                            boxShadow: '4px 4px 0 #000',
                            fontFamily: 'Inter'
                        }} 
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke="#66b3ff"
                        strokeWidth={3}
                        dot={{ fill: '#66b3ff', stroke: '#000', strokeWidth: 2, r: 5 }}
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    )
}

/**
 * AreaChart - 面积图
 */
interface AreaChartProps {
    data: ChartData[]
    dataKey?: string
    xKey?: string
    height?: number
    color?: string
    gradient?: boolean
}

export function AreaChart({ 
    data, 
    dataKey = 'value', 
    xKey = 'name', 
    height = 300,
    color = '#66b3ff',
    gradient = true
}: AreaChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsAreaChart data={data}>
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeWidth={2} stroke="#000" />
                    <XAxis
                        dataKey={xKey}
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <YAxis
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            border: '2px solid #000', 
                            boxShadow: '4px 4px 0 #000',
                            fontFamily: 'Inter'
                        }} 
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={3}
                        fill={gradient ? "url(#colorGradient)" : color}
                        fillOpacity={gradient ? 1 : 0.3}
                    />
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    )
}

/**
 * PieChart - 饼图
 */
interface PieChartProps {
    data: PieChartData[]
    height?: number
    showLabel?: boolean
    showLegend?: boolean
}

export function PieChart({ 
    data, 
    height = 300,
    showLabel = true,
    showLegend = true
}: PieChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsPieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={showLabel ? ({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%` : undefined}
                        labelLine={showLabel}
                        stroke="#000"
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color || COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            border: '2px solid #000', 
                            boxShadow: '4px 4px 0 #000',
                            fontFamily: 'Inter'
                        }} 
                    />
                    {showLegend && <Legend />}
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    )
}

/**
 * DonutChart - 环形图
 */
interface DonutChartProps {
    data: PieChartData[]
    height?: number
    innerRadius?: number
    outerRadius?: number
    showLabel?: boolean
    showLegend?: boolean
    centerText?: string
}

export function DonutChart({ 
    data, 
    height = 300,
    innerRadius = 50,
    outerRadius = 80,
    showLabel = false,
    showLegend = true,
    centerText
}: DonutChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro relative">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsPieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        dataKey="value"
                        label={showLabel ? ({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%` : undefined}
                        labelLine={showLabel}
                        stroke="#000"
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color || COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            border: '2px solid #000', 
                            boxShadow: '4px 4px 0 #000',
                            fontFamily: 'Inter'
                        }} 
                    />
                    {showLegend && <Legend />}
                </RechartsPieChart>
            </ResponsiveContainer>
            {centerText && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold font-serif">{centerText}</span>
                </div>
            )}
        </div>
    )
}

/**
 * MultiLineChart - 多折线图
 */
interface MultiLineChartProps {
    data: ChartData[]
    lines: { dataKey: string; color: string; name?: string }[]
    xKey?: string
    height?: number
}

export function MultiLineChart({ 
    data, 
    lines,
    xKey = 'name', 
    height = 300 
}: MultiLineChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsLineChart data={data}>
                    <CartesianGrid strokeWidth={2} stroke="#000" />
                    <XAxis
                        dataKey={xKey}
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <YAxis
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            border: '2px solid #000', 
                            boxShadow: '4px 4px 0 #000',
                            fontFamily: 'Inter'
                        }} 
                    />
                    <Legend />
                    {lines.map((line, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey={line.dataKey}
                            stroke={line.color}
                            strokeWidth={3}
                            name={line.name || line.dataKey}
                            dot={{ fill: line.color, stroke: '#000', strokeWidth: 2, r: 4 }}
                        />
                    ))}
                </RechartsLineChart>
            </ResponsiveContainer>
        </div>
    )
}

/**
 * StackedBarChart - 堆叠柱状图
 */
interface StackedBarChartProps {
    data: ChartData[]
    bars: { dataKey: string; color: string; name?: string }[]
    xKey?: string
    height?: number
}

export function StackedBarChart({ 
    data, 
    bars,
    xKey = 'name', 
    height = 300 
}: StackedBarChartProps) {
    return (
        <div className="w-full border-2 border-border bg-card p-4 shadow-retro">
            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeWidth={2} stroke="#000" />
                    <XAxis
                        dataKey={xKey}
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <YAxis
                        stroke="#000"
                        strokeWidth={2}
                        style={{ fontWeight: 'bold', fontFamily: 'Inter' }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            border: '2px solid #000', 
                            boxShadow: '4px 4px 0 #000',
                            fontFamily: 'Inter'
                        }} 
                    />
                    <Legend />
                    {bars.map((bar, index) => (
                        <Bar
                            key={index}
                            dataKey={bar.dataKey}
                            stackId="stack"
                            fill={bar.color}
                            stroke="#000"
                            strokeWidth={2}
                            name={bar.name || bar.dataKey}
                        />
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}
