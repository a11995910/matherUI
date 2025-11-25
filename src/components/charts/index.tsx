import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts'

interface ChartData {
    name: string
    value: number
    [key: string]: string | number
}

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
