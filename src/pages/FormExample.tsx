import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { Slider } from "../components/ui/slider"
import { H2, H3, P } from "../components/ui/typography"
import { Container, Section } from "../components/ui/container"
import { Navbar } from "../components/layout/navbar"
import { Footer } from "../components/layout/footer"

export function FormExample() {
    const [notifications, setNotifications] = useState(true)
    const [volume, setVolume] = useState([50])

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <Section className="border-b-2 border-border">
                <Container>
                    <div className="mb-8">
                        <H2>表单示例</H2>
                        <P>展示所有表单组件的使用方式</P>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <Card className="bg-card">
                            <CardContent className="p-8">
                                <H3 className="mb-6">联系表单</H3>
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">姓名</label>
                                        <Input placeholder="请输入您的姓名" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">邮箱</label>
                                        <Input type="email" placeholder="your@email.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">主题</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="选择主题" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">一般咨询</SelectItem>
                                                <SelectItem value="support">技术支持</SelectItem>
                                                <SelectItem value="sales">销售咨询</SelectItem>
                                                <SelectItem value="other">其他</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">消息</label>
                                        <Textarea placeholder="请输入您的消息..." rows={4} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            我同意服务条款和隐私政策
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        提交
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Settings Form */}
                        <Card className="bg-card">
                            <CardContent className="p-8">
                                <H3 className="mb-6">设置</H3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">用户名</label>
                                        <Input defaultValue="张三" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">语言偏好</label>
                                        <RadioGroup defaultValue="zh">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="zh" id="zh" />
                                                <label htmlFor="zh" className="text-sm">中文</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="en" id="en" />
                                                <label htmlFor="en" className="text-sm">English</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="ja" id="ja" />
                                                <label htmlFor="ja" className="text-sm">日本語</label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-sm font-bold">接收通知</label>
                                            <P className="mt-0 text-sm text-muted-foreground">
                                                接收有关您账户的电子邮件通知
                                            </P>
                                        </div>
                                        <Switch
                                            checked={notifications}
                                            onCheckedChange={setNotifications}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold">音量: {volume[0]}%</label>
                                        <Slider
                                            value={volume}
                                            onValueChange={setVolume}
                                            max={100}
                                            step={1}
                                        />
                                    </div>

                                    <div className="pt-4 space-y-3">
                                        <Button className="w-full">保存更改</Button>
                                        <Button variant="outline" className="w-full">
                                            取消
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </Section>

            <Footer />
        </div>
    )
}
