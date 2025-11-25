import { Card, CardContent } from "../components/ui/card"
import { H2, H3, P } from "../components/ui/typography"
import { Container, Section } from "../components/ui/container"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { BarChart, LineChart } from "../components/charts"
import { Navbar } from "../components/layout/navbar"
import { Footer } from "../components/layout/footer"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

const salesData = [
    { name: '一月', value: 4000 },
    { name: '二月', value: 3000 },
    { name: '三月', value: 5000 },
    { name: '四月', value: 4500 },
    { name: '五月', value: 6000 },
    { name: '六月', value: 5500 },
]

const trafficData = [
    { name: '周一', value: 2400 },
    { name: '周二', value: 1398 },
    { name: '周三', value: 9800 },
    { name: '周四', value: 3908 },
    { name: '周五', value: 4800 },
    { name: '周六', value: 3800 },
    { name: '周日', value: 4300 },
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

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div>
                            <H3 className="mb-4">月度销售</H3>
                            <BarChart data={salesData} />
                        </div>
                        <div>
                            <H3 className="mb-4">周流量趋势</H3>
                            <LineChart data={trafficData} />
                        </div>
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
