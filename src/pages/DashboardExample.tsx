import { Card, CardContent } from "../components/ui/card"
import { H2, H3, P } from "../components/ui/typography"
import { Container, Section } from "../components/ui/container"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { 
    BarChart, 
    LineChart, 
    AreaChart, 
    PieChart, 
    DonutChart, 
    MultiLineChart,
    StackedBarChart 
} from "../components/charts"
import { Navbar } from "../components/layout/navbar"
import { Footer } from "../components/layout/footer"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

// 月度销售数据
const salesData = [
    { name: '一月', value: 4000 },
    { name: '二月', value: 3000 },
    { name: '三月', value: 5000 },
    { name: '四月', value: 4500 },
    { name: '五月', value: 6000 },
    { name: '六月', value: 5500 },
]

// 流量趋势数据
const trafficData = [
    { name: '周一', value: 2400 },
    { name: '周二', value: 1398 },
    { name: '周三', value: 9800 },
    { name: '周四', value: 3908 },
    { name: '周五', value: 4800 },
    { name: '周六', value: 3800 },
    { name: '周日', value: 4300 },
]

// 渠道分布数据
const channelData = [
    { name: '直接访问', value: 335 },
    { name: '搜索引擎', value: 310 },
    { name: '社交媒体', value: 234 },
    { name: '邮件营销', value: 135 },
    { name: '联盟广告', value: 148 },
]

// 用户类型数据
const userTypeData = [
    { name: '新用户', value: 400 },
    { name: '活跃用户', value: 300 },
    { name: '沉默用户', value: 200 },
    { name: '流失用户', value: 100 },
]

// 多维度对比数据
const comparisonData = [
    { name: '一月', 本年: 4000, 去年: 2400 },
    { name: '二月', 本年: 3000, 去年: 1398 },
    { name: '三月', 本年: 5000, 去年: 3800 },
    { name: '四月', 本年: 4500, 去年: 3908 },
    { name: '五月', 本年: 6000, 去年: 4800 },
    { name: '六月', 本年: 5500, 去年: 3800 },
]

// 堆叠数据
const stackedData = [
    { name: '一月', 产品A: 4000, 产品B: 2400, 产品C: 1200 },
    { name: '二月', 产品A: 3000, 产品B: 1398, 产品C: 2210 },
    { name: '三月', 产品A: 2000, 产品B: 9800, 产品C: 2290 },
    { name: '四月', 产品A: 2780, 产品B: 3908, 产品C: 2000 },
    { name: '五月', 产品A: 1890, 产品B: 4800, 产品C: 2181 },
    { name: '六月', 产品A: 2390, 产品B: 3800, 产品C: 2500 },
]

export function DashboardExample() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <Section className="border-b-2 border-border">
                <Container>
                    <div className="mb-8">
                        <H2>Dashboard 示例</H2>
                        <P>展示如何使用 MatherUI 组件构建数据面板</P>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <Card className="bg-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <H3 className="text-lg">总收入</H3>
                                    <div className="h-12 w-12 bg-primary/10 border-2 border-border flex items-center justify-center">
                                        <DollarSign className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold font-serif mb-2">¥45,231</div>
                                <P className="mt-0 text-sm text-muted-foreground">
                                    <span className="text-green-600 font-bold">+20.1%</span> 较上月
                                </P>
                            </CardContent>
                        </Card>

                        <Card className="bg-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <H3 className="text-lg">活跃用户</H3>
                                    <div className="h-12 w-12 bg-secondary/10 border-2 border-border flex items-center justify-center">
                                        <Users className="h-6 w-6 text-secondary" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold font-serif mb-2">2,350</div>
                                <P className="mt-0 text-sm text-muted-foreground">
                                    <span className="text-green-600 font-bold">+15%</span> 较上月
                                </P>
                            </CardContent>
                        </Card>

                        <Card className="bg-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <H3 className="text-lg">销售额</H3>
                                    <div className="h-12 w-12 bg-primary/10 border-2 border-border flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold font-serif mb-2">12,234</div>
                                <P className="mt-0 text-sm text-muted-foreground">
                                    <span className="text-green-600 font-bold">+7%</span> 较上月
                                </P>
                            </CardContent>
                        </Card>

                        <Card className="bg-card">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <H3 className="text-lg">活跃度</H3>
                                    <div className="h-12 w-12 bg-secondary/10 border-2 border-border flex items-center justify-center">
                                        <Activity className="h-6 w-6 text-secondary" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold font-serif mb-2">573</div>
                                <P className="mt-0 text-sm text-muted-foreground">
                                    <span className="text-red-600 font-bold">-2%</span> 较上月
                                </P>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div>
                            <H3 className="mb-4">月度销售（柱状图）</H3>
                            <BarChart data={salesData} />
                        </div>
                        <div>
                            <H3 className="mb-4">周流量趋势（折线图）</H3>
                            <LineChart data={trafficData} />
                        </div>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div>
                            <H3 className="mb-4">访问来源（饼图）</H3>
                            <PieChart data={channelData} />
                        </div>
                        <div>
                            <H3 className="mb-4">用户构成（环形图）</H3>
                            <DonutChart data={userTypeData} centerText="1000" />
                        </div>
                    </div>

                    {/* Charts Row 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div>
                            <H3 className="mb-4">销售趋势（面积图）</H3>
                            <AreaChart data={salesData} color="#4ecdc4" />
                        </div>
                        <div>
                            <H3 className="mb-4">同比对比（多折线图）</H3>
                            <MultiLineChart 
                                data={comparisonData} 
                                lines={[
                                    { dataKey: '本年', color: '#66b3ff', name: '本年' },
                                    { dataKey: '去年', color: '#ff6b6b', name: '去年' }
                                ]}
                            />
                        </div>
                    </div>

                    {/* Charts Row 4 */}
                    <div className="mb-12">
                        <H3 className="mb-4">产品销售分布（堆叠柱状图）</H3>
                        <StackedBarChart 
                            data={stackedData}
                            bars={[
                                { dataKey: '产品A', color: '#66b3ff', name: '产品A' },
                                { dataKey: '产品B', color: '#ff6b6b', name: '产品B' },
                                { dataKey: '产品C', color: '#4ecdc4', name: '产品C' }
                            ]}
                        />
                    </div>

                    {/* Recent Transactions */}
                    <div>
                        <H3 className="mb-4">最近交易</H3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>订单号</TableHead>
                                    <TableHead>客户</TableHead>
                                    <TableHead>状态</TableHead>
                                    <TableHead className="text-right">金额</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">#3210</TableCell>
                                    <TableCell>张三</TableCell>
                                    <TableCell><Badge variant="default">已完成</Badge></TableCell>
                                    <TableCell className="text-right">¥250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3209</TableCell>
                                    <TableCell>李四</TableCell>
                                    <TableCell><Badge variant="secondary">处理中</Badge></TableCell>
                                    <TableCell className="text-right">¥150.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3208</TableCell>
                                    <TableCell>王五</TableCell>
                                    <TableCell><Badge variant="outline">待支付</Badge></TableCell>
                                    <TableCell className="text-right">¥350.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3207</TableCell>
                                    <TableCell>赵六</TableCell>
                                    <TableCell><Badge variant="default">已完成</Badge></TableCell>
                                    <TableCell className="text-right">¥450.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Container>
            </Section>

            <Footer />
        </div>
    )
}
