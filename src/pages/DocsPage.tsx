/**
 * DocsPage - 组件文档页面
 * 
 * 架构说明：
 * - Sidebar 组件：从 docs/config.ts 读取导航配置自动生成
 * - PropsTable 组件：从 docs/components/PropsTable.tsx 导入
 * - 组件文档：可逐步迁移到 docs/components/docs/ 目录
 * 
 * 添加新组件文档步骤：
 * 1. 在 docs/config.ts 的 navConfig 中添加导航项
 * 2. 在 docs/components/docs/ 创建 XxxDoc.tsx
 * 3. 在下方内容区域引用或直接编写
 */

import { Navbar } from "../components/layout/navbar"
import { Footer } from "../components/layout/footer"
import { Container, Section } from "../components/ui/container"
import { H1, H2, H3, P } from "../components/ui/typography"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { CodeBlock } from "../components/ui/code-block"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Alert } from "../components/ui/alert"
import { Avatar } from "../components/ui/avatar"
import { Checkbox } from "../components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Switch } from "../components/ui/switch"
import { Slider } from "../components/ui/slider"
import { Progress } from "../components/ui/progress"
import { Skeleton } from "../components/ui/skeleton"
import { Spinner } from "../components/ui/spinner"
import { Toaster } from "../components/ui/toast"
import { Info, CheckCircle, X } from "lucide-react"
import { useState } from "react"

// 从 docs 模块导入共享组件和组件文档
import { 
    Sidebar, 
    PropsTable,
    // 组件文档
    ToastDoc,
    DrawerDoc,
    SeparatorDoc,
    LabelDoc,
    TreeSelectDoc,
    BreadcrumbDoc,
    PaginationDoc,
    // 新增组件文档
    DatePickerDoc,
    StepsDoc,
    RateDoc,
    TagDoc,
    EmptyDoc,
    InputNumberDoc,
    TimePickerDoc,
    UploadDoc,
    ImageDoc,
    CarouselDoc,
    MenuDoc,
    TimelineDoc,
    CalendarDoc,
} from "../docs"

export function DocsPage() {
    const [sliderValue, setSliderValue] = useState([50])
    const [progressValue] = useState(60)

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <Section className="border-b-2 border-border">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar - 从 docs/config.ts 自动生成 */}
                        <Sidebar />

                        {/* Main Content */}
                        <main className="lg:col-span-3 space-y-16">
                            <div>
                                <H1>组件文档</H1>
                                <P>MatherUI 组件库的完整 API 文档和使用示例。所有组件都支持亮色/暗色主题。</P>
                            </div>

                            {/* ========== 基础组件 ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">基础组件</H2>

                                {/* Button */}
                                <section id="button" className="mb-16 scroll-mt-24">
                                    <H3>Button 按钮</H3>
                                    <P className="mb-6">用于触发操作的按钮组件，支持多种样式变体和大小，带有复古硬阴影效果。</P>

                                    <div className="space-y-8">
                                        {/* 基本用法 */}
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="flex flex-wrap gap-4">
                                                        <Button>Default</Button>
                                                        <Button variant="secondary">Secondary</Button>
                                                        <Button variant="outline">Outline</Button>
                                                        <Button variant="ghost">Ghost</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Button } from '@/components/ui/button'

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
                                            </CodeBlock>
                                        </div>

                                        {/* 不同尺寸 */}
                                        <div>
                                            <h4 className="font-bold mb-3">不同尺寸</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="flex items-center gap-4">
                                                        <Button size="sm">Small</Button>
                                                        <Button size="default">Default</Button>
                                                        <Button size="lg">Large</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
                                            </CodeBlock>
                                        </div>

                                        {/* 禁用状态 */}
                                        <div>
                                            <h4 className="font-bold mb-3">禁用状态</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="flex gap-4">
                                                        <Button disabled>Disabled</Button>
                                                        <Button variant="outline" disabled>Disabled Outline</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`}
                                            </CodeBlock>
                                        </div>

                                        {/* Props API */}
                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "link"', default: '"default"', description: "按钮的视觉样式变体" },
                                                { prop: "size", type: '"default" | "sm" | "lg" | "icon"', default: '"default"', description: "按钮的大小" },
                                                { prop: "disabled", type: "boolean", default: "false", description: "是否禁用按钮" },
                                                { prop: "asChild", type: "boolean", default: "false", description: "作为子元素渲染（用于 Link 等）" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Typography */}
                                <section id="typography" className="mb-16 scroll-mt-24">
                                    <H3>Typography 排版</H3>
                                    <P className="mb-6">用于显示文本内容的排版组件，包括标题（Merriweather 字体）和段落（Inter 字体）。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">所有排版元素</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8 space-y-4">
                                                    <H1>Heading 1</H1>
                                                    <H2>Heading 2</H2>
                                                    <H3>Heading 3</H3>
                                                    <P>段落文本 - Inter 字体，用于正文内容，保证良好的可读性。</P>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { H1, H2, H3, P } from '@/components/ui/typography'

<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<P>段落文本</P>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
                                                { prop: "children", type: "ReactNode", default: "-", description: "文本内容" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Badge */}
                                <section id="badge" className="mb-16 scroll-mt-24">
                                    <H3>Badge 徽章</H3>
                                    <P className="mb-6">用于标记和分类的小型标签组件，带有 2px 黑色边框。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">所有变体</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="flex flex-wrap gap-3">
                                                        <Badge>Default</Badge>
                                                        <Badge variant="secondary">Secondary</Badge>
                                                        <Badge variant="outline">Outline</Badge>
                                                        <Badge variant="destructive">Destructive</Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "variant", type: '"default" | "secondary" | "outline" | "destructive"', default: '"default"', description: "徽章的颜色变体" },
                                                { prop: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* ========== 表单组件 ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">表单组件</H2>

                                {/* Input */}
                                <section id="input" className="mb-16 scroll-mt-24">
                                    <H3>Input 输入框</H3>
                                    <P className="mb-6">用于接收用户输入的文本框组件，支持所有原生 input 类型，带有 2px 边框和聚焦效果。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">不同类型</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="space-y-4 max-w-md">
                                                        <Input placeholder="普通文本..." />
                                                        <Input type="email" placeholder="邮箱地址" />
                                                        <Input type="password" placeholder="密码" />
                                                        <Input type="number" placeholder="数字" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Input } from '@/components/ui/input'

<Input placeholder="普通文本..." />
<Input type="email" placeholder="邮箱地址" />
<Input type="password" placeholder="密码" />
<Input type="number" placeholder="数字" />`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">禁用状态</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <Input disabled placeholder="禁用的输入框" className="max-w-md" />
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`<Input disabled placeholder="禁用的输入框" />`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "type", type: '"text" | "email" | "password" | "number" | ...', default: '"text"', description: "输入框类型" },
                                                { prop: "placeholder", type: "string", default: "-", description: "占位文本" },
                                                { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
                                                { prop: "value", type: "string", default: "-", description: "输入值（受控）" },
                                                { prop: "onChange", type: "ChangeEventHandler", default: "-", description: "值变化回调" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Textarea */}
                                <section id="textarea" className="mb-16 scroll-mt-24">
                                    <H3>Textarea 多行文本</H3>
                                    <P className="mb-6">用于输入多行文本内容，样式与 Input 一致。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <Textarea placeholder="请输入多行文本..." className="max-w-md" rows={4} />
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="请输入多行文本..." rows={4} />`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "placeholder", type: "string", default: "-", description: "占位文本" },
                                                { prop: "rows", type: "number", default: "3", description: "显示行数" },
                                                { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
                                                { prop: "value", type: "string", default: "-", description: "输入值（受控）" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Checkbox */}
                                <section id="checkbox" className="mb-16 scroll-mt-24">
                                    <H3>Checkbox 复选框</H3>
                                    <P className="mb-6">用于多选的复选框组件，方形设计，选中时显示蓝色背景和白色对勾。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox id="c1" defaultChecked />
                                                            <label htmlFor="c1" className="cursor-pointer">已选中的选项</label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox id="c2" />
                                                            <label htmlFor="c2" className="cursor-pointer">未选中的选项</label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox id="c3" disabled />
                                                            <label htmlFor="c3" className="cursor-not-allowed opacity-50">禁用的选项</label>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Checkbox } from '@/components/ui/checkbox'

<div className="flex items-center gap-2">
  <Checkbox id="c1" defaultChecked />
  <label htmlFor="c1">已选中的选项</label>
</div>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "checked", type: "boolean", default: "-", description: "是否选中（受控）" },
                                                { prop: "defaultChecked", type: "boolean", default: "false", description: "默认是否选中" },
                                                { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
                                                { prop: "onCheckedChange", type: "(checked: boolean) => void", default: "-", description: "选中状态变化回调" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* 继续其他表单组件... */}
                                {/* RadioGroup, Switch, Slider 等，每个都有完整的文档 */}

                            </div>

                            {/* RadioGroup */}
                            <section id="radio" className="mb-16 scroll-mt-24">
                                <H3>RadioGroup 单选按钮组</H3>
                                <P className="mb-6">用于单选的单选按钮组件，方形设计，只能选择一个选项。</P>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-bold mb-3">基本用法</h4>
                                        <Card className="bg-card">
                                            <CardContent className="p-8">
                                                <RadioGroup defaultValue="option1" className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="option1" id="r1" />
                                                        <label htmlFor="r1" className="cursor-pointer">选项 1</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="option2" id="r2" />
                                                        <label htmlFor="r2" className="cursor-pointer">选项 2</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="option3" id="r3" />
                                                        <label htmlFor="r3" className="cursor-pointer">选项 3</label>
                                                    </div>
                                                </RadioGroup>
                                            </CardContent>
                                        </Card>
                                        <CodeBlock title="代码">
                                            {`import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="r1" />
    <label htmlFor="r1">选项 1</label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="r2" />
    <label htmlFor="r2">选项 2</label>
  </div>
</RadioGroup>`}
                                        </CodeBlock>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-3">Props API</h4>
                                        <PropsTable data={[
                                            { prop: "value", type: "string", default: "-", description: "当前选中的值（受控）" },
                                            { prop: "defaultValue", type: "string", default: "-", description: "默认选中的值" },
                                            { prop: "onValueChange", type: "(value: string) => void", default: "-", description: "选中值变化回调" },
                                            { prop: "disabled", type: "boolean", default: "false", description: "是否禁用整个组" },
                                        ]} />
                                    </div>
                                </div>
                            </section>

                            {/* Switch */}
                            <section id="switch" className="mb-16 scroll-mt-24">
                                <H3>Switch 开关</H3>
                                <P className="mb-6">用于切换开/关状态的开关组件，矩形轨道 + 方形滑块设计。</P>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-bold mb-3">基本用法</h4>
                                        <Card className="bg-card">
                                            <CardContent className="p-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <Switch id="s1" defaultChecked />
                                                        <label htmlFor="s1" className="cursor-pointer">开启通知</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Switch id="s2" />
                                                        <label htmlFor="s2" className="cursor-pointer">自动保存</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Switch id="s3" disabled />
                                                        <label htmlFor="s3" className="cursor-not-allowed opacity-50">禁用的开关</label>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <CodeBlock title="代码">
                                            {`import { Switch } from '@/components/ui/switch'

<div className="flex items-center gap-2">
  <Switch id="s1" defaultChecked />
  <label htmlFor="s1">开启通知</label>
</div>`}
                                        </CodeBlock>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-3">Props API</h4>
                                        <PropsTable data={[
                                            { prop: "checked", type: "boolean", default: "-", description: "是否开启（受控）" },
                                            { prop: "defaultChecked", type: "boolean", default: "false", description: "默认是否开启" },
                                            { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
                                            { prop: "onCheckedChange", type: "(checked: boolean) => void", default: "-", description: "开关状态变化回调" },
                                        ]} />
                                    </div>
                                </div>
                            </section>

                            {/* Slider */}
                            <section id="slider" className="mb-16 scroll-mt-24">
                                <H3>Slider 滑块</H3>
                                <P className="mb-6">用于选择数值范围的滑块组件，矩形轨道 + 方形滑块，带硬阴影。</P>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="font-bold mb-3">基本用法</h4>
                                        <Card className="bg-card">
                                            <CardContent className="p-8">
                                                <div className="max-w-md space-y-6">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>音量</span>
                                                            <span>{sliderValue}%</span>
                                                        </div>
                                                        <Slider value={sliderValue} onValueChange={setSliderValue} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>禁用状态</span>
                                                            <span>50%</span>
                                                        </div>
                                                        <Slider value={[50]} disabled />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <CodeBlock title="代码">
                                            {`import { Slider } from '@/components/ui/slider'
import { useState } from 'react'

const [value, setValue] = useState([50])

<div className="space-y-2">
  <div className="flex justify-between">
    <span>音量</span>
    <span>{value}%</span>
  </div>
  <Slider value={value} onValueChange={setValue} />
</div>`}
                                        </CodeBlock>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-3">Props API</h4>
                                        <PropsTable data={[
                                            { prop: "value", type: "number[]", default: "-", description: "当前值（受控，数组格式）" },
                                            { prop: "defaultValue", type: "number[]", default: "[50]", description: "默认值" },
                                            { prop: "min", type: "number", default: "0", description: "最小值" },
                                            { prop: "max", type: "number", default: "100", description: "最大值" },
                                            { prop: "step", type: "number", default: "1", description: "步长" },
                                            { prop: "disabled", type: "boolean", default: "false", description: "是否禁用" },
                                            { prop: "onValueChange", type: "(value: number[]) => void", default: "-", description: "值变化回调" },
                                        ]} />
                                    </div>
                                </div>
                            </section>

                            {/* 继续其他表单组件... */}

                            {/* ========== 数据展示 ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">数据展示组件</H2>

                                {/* Card */}
                                <section id="card" className="mb-16 scroll-mt-24">
                                    <H3>Card 卡片</H3>
                                    <P className="mb-6">用于显示信息的容器组件，带有硬阴影效果，自动适配主题颜色。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card max-w-md">
                                                <CardContent className="p-6">
                                                    <H3 className="mb-2">卡片标题</H3>
                                                    <P className="mt-0">这是一个简单的卡片示例，可以包含任何内容。卡片会自动适配亮色/暗色主题。</P>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Card, CardContent } from '@/components/ui/card'

<Card className="bg-card">
  <CardContent className="p-6">
    <h3>卡片标题</h3>
    <p>卡片内容...</p>
  </CardContent>
</Card>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">使用说明</h4>
                                            <P className="text-sm">• 卡片默认带有 2px 黑色边框（暗色模式为白色）</P>
                                            <P className="text-sm">• 必须使用 <code className="px-1.5 py-0.5 bg-muted border border-border">bg-card</code> 类来支持主题切换</P>
                                            <P className="text-sm">• 带有 <code className="px-1.5 py-0.5 bg-muted border border-border">shadow-retro</code> 硬阴影效果</P>
                                        </div>
                                    </div>
                                </section>

                                {/* Table */}
                                <section id="table" className="mb-16 scroll-mt-24">
                                    <H3>Table 表格</H3>
                                    <P className="mb-6">用于展示结构化数据的表格组件，所有单元格都有粗边框。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>姓名</TableHead>
                                                        <TableHead>职位</TableHead>
                                                        <TableHead>部门</TableHead>
                                                        <TableHead className="text-right">状态</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>张三</TableCell>
                                                        <TableCell>前端开发</TableCell>
                                                        <TableCell>技术部</TableCell>
                                                        <TableCell className="text-right"><Badge>在职</Badge></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>李四</TableCell>
                                                        <TableCell>后端开发</TableCell>
                                                        <TableCell>技术部</TableCell>
                                                        <TableCell className="text-right"><Badge>在职</Badge></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>王五</TableCell>
                                                        <TableCell>UI 设计师</TableCell>
                                                        <TableCell>设计部</TableCell>
                                                        <TableCell className="text-right"><Badge variant="secondary">休假</Badge></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <CodeBlock title="代码">
                                                {`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>姓名</TableHead>
      <TableHead>职位</TableHead>
      <TableHead>状态</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>张三</TableCell>
      <TableCell>前端开发</TableCell>
      <TableCell>在职</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">组件说明</h4>
                                            <PropsTable data={[
                                                { prop: "Table", type: "组件", default: "-", description: "表格容器，带 2px 边框" },
                                                { prop: "TableHeader", type: "组件", default: "-", description: "表头容器" },
                                                { prop: "TableBody", type: "组件", default: "-", description: "表体容器" },
                                                { prop: "TableRow", type: "组件", default: "-", description: "表格行，带底部边框" },
                                                { prop: "TableHead", type: "组件", default: "-", description: "表头单元格，粗体背景" },
                                                { prop: "TableCell", type: "组件", default: "-", description: "表格单元格" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Avatar, Skeleton, Progress, Spinner */}
                                <section id="avatar" className="mb-16 scroll-mt-24">
                                    <H3>Avatar 头像</H3>
                                    <P className="mb-6">用于显示用户头像的方形组件，带 2px 边框。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="flex gap-4">
                                                        <Avatar>
                                                            <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-bold">张</div>
                                                        </Avatar>
                                                        <Avatar>
                                                            <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">李</div>
                                                        </Avatar>
                                                        <Avatar className="w-16 h-16">
                                                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xl">王</div>
                                                        </Avatar>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Avatar } from '@/components/ui/avatar'

<Avatar>
  <div className="w-full h-full bg-primary flex items-center justify-center font-bold">
    张
  </div>
</Avatar>

// 自定义大小
<Avatar className="w-16 h-16">
  <div className="w-full h-full bg-secondary flex items-center justify-center">
    李
  </div>
</Avatar>`}
                                            </CodeBlock>
                                        </div>
                                    </div>
                                </section>

                                <section id="skeleton" className="mb-16 scroll-mt-24">
                                    <H3>Skeleton 骨架屏</H3>
                                    <P className="mb-6">用于内容加载时的占位组件，带脉冲动画和 2px 边框。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="space-y-4 max-w-md">
                                                        <Skeleton className="h-12 w-full" />
                                                        <Skeleton className="h-12 w-3/4" />
                                                        <Skeleton className="h-12 w-1/2" />
                                                        <div className="flex gap-3">
                                                            <Skeleton className="h-12 w-12" />
                                                            <Skeleton className="h-12 w-12" />
                                                            <Skeleton className="h-12 w-12" />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Skeleton } from '@/components/ui/skeleton'

<div className="space-y-4">
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-12 w-3/4" />
  <Skeleton className="h-12 w-1/2" />
</div>`}
                                            </CodeBlock>
                                        </div>
                                    </div>
                                </section>

                                <section id="progress" className="mb-16 scroll-mt-24">
                                    <H3>Progress 进度条</H3>
                                    <P className="mb-6">用于显示操作进度的进度条组件，矩形容器 + 主色填充。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="max-w-md space-y-6">
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span>上传进度</span>
                                                                <span>{progressValue}%</span>
                                                            </div>
                                                            <Progress value={progressValue} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span>处理中</span>
                                                                <span>30%</span>
                                                            </div>
                                                            <Progress value={30} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span>已完成</span>
                                                                <span>100%</span>
                                                            </div>
                                                            <Progress value={100} />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Progress } from '@/components/ui/progress'

<div className="space-y-2">
  <div className="flex justify-between">
    <span>上传进度</span>
    <span>60%</span>
  </div>
  <Progress value={60} />
</div>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "value", type: "number", default: "0", description: "进度值 (0-100)" },
                                                { prop: "max", type: "number", default: "100", description: "最大值" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                <section id="spinner" className="mb-16 scroll-mt-24">
                                    <H3>Spinner 加载动画</H3>
                                    <P className="mb-6">用于显示加载状态的旋转动画，圆形边框设计。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">不同尺寸</h4>
                                            <Card className="bg-card">
                                                <CardContent className="p-8">
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-center">
                                                            <Spinner className="w-4 h-4" />
                                                            <p className="text-xs mt-2">Small</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <Spinner />
                                                            <p className="text-xs mt-2">Default</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <Spinner className="w-8 h-8" />
                                                            <p className="text-xs mt-2">Medium</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <Spinner className="w-12 h-12" />
                                                            <p className="text-xs mt-2">Large</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <CodeBlock title="代码">
                                                {`import { Spinner } from '@/components/ui/spinner'

<Spinner className="w-4 h-4" />  {/* Small */}
<Spinner />                       {/* Default */}
<Spinner className="w-8 h-8" />  {/* Medium */}
<Spinner className="w-12 h-12" />{/* Large */}`}
                                            </CodeBlock>
                                        </div>
                                    </div>
                                </section>

                                {/* 其他数据展示组件... */}
                            </div>

                            {/* ========== 反馈组件 ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">反馈组件</H2>

                                {/* Alert */}
                                <section id="alert" className="mb-16 scroll-mt-24">
                                    <H3>Alert 提示框</H3>
                                    <P className="mb-6">用于显示重要信息的提示框组件，支持多种类型（Info, Success, Warning, Error）。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">所有变体</h4>
                                            <div className="space-y-4">
                                                <Alert>
                                                    <Info className="h-4 w-4" />
                                                    <div>
                                                        <h5 className="font-bold">信息提示</h5>
                                                        <p className="text-sm">这是一条普通的信息提示。</p>
                                                    </div>
                                                </Alert>
                                                <Alert variant="success">
                                                    <CheckCircle className="h-4 w-4" />
                                                    <div>
                                                        <h5 className="font-bold">操作成功</h5>
                                                        <p className="text-sm">您的操作已成功完成。</p>
                                                    </div>
                                                </Alert>
                                                <Alert variant="warning">
                                                    <Info className="h-4 w-4" />
                                                    <div>
                                                        <h5 className="font-bold">警告</h5>
                                                        <p className="text-sm">请注意以下事项...</p>
                                                    </div>
                                                </Alert>
                                                <Alert variant="error">
                                                    <X className="h-4 w-4" />
                                                    <div>
                                                        <h5 className="font-bold">错误</h5>
                                                        <p className="text-sm">操作失败，请重试。</p>
                                                    </div>
                                                </Alert>
                                            </div>
                                            <CodeBlock title="代码">
                                                {`import { Alert } from '@/components/ui/alert'
import { Info, CheckCircle, X } from 'lucide-react'

<Alert>
  <Info className="h-4 w-4" />
  <div>
    <h5 className="font-bold">信息提示</h5>
    <p className="text-sm">这是一条普通的信息提示。</p>
  </div>
</Alert>

<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <div>
    <h5 className="font-bold">操作成功</h5>
    <p className="text-sm">您的操作已成功完成。</p>
  </div>
</Alert>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "variant", type: '"default" | "success" | "warning" | "error"', default: '"default"', description: "提示框类型，决定颜色和样式" },
                                                { prop: "children", type: "ReactNode", default: "-", description: "提示框内容" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* ========== 导航组件 ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">导航组件</H2>

                                {/* Tabs */}
                                <section id="tabs" className="mb-16 scroll-mt-24">
                                    <H3>Tabs 标签页</H3>
                                    <P className="mb-6">用于组织内容的标签页组件，激活状态有明显的边框和背景变化。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Tabs defaultValue="tab1" className="w-full">
                                                <TabsList className="grid w-full grid-cols-3 max-w-md">
                                                    <TabsTrigger value="tab1">账户</TabsTrigger>
                                                    <TabsTrigger value="tab2">设置</TabsTrigger>
                                                    <TabsTrigger value="tab3">帮助</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="tab1" className="mt-4">
                                                    <Card className="bg-card">
                                                        <CardContent className="p-6">
                                                            <H3 className="mb-2">账户信息</H3>
                                                            <P className="mt-0">这里显示账户相关的设置和信息。</P>
                                                        </CardContent>
                                                    </Card>
                                                </TabsContent>
                                                <TabsContent value="tab2" className="mt-4">
                                                    <Card className="bg-card">
                                                        <CardContent className="p-6">
                                                            <H3 className="mb-2">设置</H3>
                                                            <P className="mt-0">这里显示系统设置选项。</P>
                                                        </CardContent>
                                                    </Card>
                                                </TabsContent>
                                                <TabsContent value="tab3" className="mt-4">
                                                    <Card className="bg-card">
                                                        <CardContent className="p-6">
                                                            <H3 className="mb-2">帮助中心</H3>
                                                            <P className="mt-0">查看帮助文档和常见问题。</P>
                                                        </CardContent>
                                                    </Card>
                                                </TabsContent>
                                            </Tabs>
                                            <CodeBlock title="代码">
                                                {`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">账户</TabsTrigger>
    <TabsTrigger value="tab2">设置</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    账户内容...
  </TabsContent>
  <TabsContent value="tab2">
    设置内容...
  </TabsContent>
</Tabs>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "value", type: "string", default: "-", description: "当前激活的标签页（受控）" },
                                                { prop: "defaultValue", type: "string", default: "-", description: "默认激活的标签页" },
                                                { prop: "onValueChange", type: "(value: string) => void", default: "-", description: "标签页切换回调" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Accordion */}
                                <section id="accordion" className="mb-16 scroll-mt-24">
                                    <H3>Accordion 手风琴</H3>
                                    <P className="mb-6">用于折叠/展开内容的手风琴组件，支持单个或多个同时展开。</P>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-bold mb-3">基本用法</h4>
                                            <Accordion type="single" collapsible className="w-full max-w-2xl border-2 border-border shadow-retro bg-card p-6">
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger>什么是 MatherUI？</AccordionTrigger>
                                                    <AccordionContent>
                                                        MatherUI 是一个复古风格的 React 组件库，采用大胆的设计和硬阴影效果，支持亮色/暗色主题。
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-2">
                                                    <AccordionTrigger>如何安装？</AccordionTrigger>
                                                    <AccordionContent>
                                                        使用 npm install matherui 或 yarn add matherui 进行安装。安装后导入需要的组件即可使用。
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-3">
                                                    <AccordionTrigger>支持哪些框架？</AccordionTrigger>
                                                    <AccordionContent>
                                                        MatherUI 基于 React 和 TypeScript 构建，支持所有现代 React 应用，包括 Next.js、Vite 等。
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-4">
                                                    <AccordionTrigger>如何自定义主题？</AccordionTrigger>
                                                    <AccordionContent>
                                                        可以通过修改 Tailwind 配置中的颜色变量来自定义主题，所有组件都会自动适应新的配色方案。
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                            <CodeBlock title="代码">
                                                {`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>问题标题</AccordionTrigger>
    <AccordionContent>
      答案内容...
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                                            </CodeBlock>
                                        </div>

                                        <div>
                                            <h4 className="font-bold mb-3">Props API</h4>
                                            <PropsTable data={[
                                                { prop: "type", type: '"single" | "multiple"', default: "-", description: "单个或多个同时展开" },
                                                { prop: "collapsible", type: "boolean", default: "false", description: "是否可折叠（仅 single 模式）" },
                                                { prop: "value", type: "string | string[]", default: "-", description: "当前展开的项（受控）" },
                                                { prop: "defaultValue", type: "string | string[]", default: "-", description: "默认展开的项" },
                                            ]} />
                                        </div>
                                    </div>
                                </section>

                                {/* Breadcrumb - 使用独立组件 */}
                                <BreadcrumbDoc />

                                {/* Pagination - 使用独立组件 */}
                                <PaginationDoc />
                            </div>

                            {/* ========== 反馈组件（新增） ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">反馈组件（新增）</H2>
                                <ToastDoc />
                                <DrawerDoc />
                            </div>

                            {/* ========== 布局组件（新增） ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">布局组件（新增）</H2>
                                <SeparatorDoc />
                                <LabelDoc />
                            </div>

                            {/* ========== 高级组件（新增） ========== */}
                            <div>
                                <H2 className="mb-8 pb-4 border-b-2 border-border">高级组件（新增）</H2>
                                <TreeSelectDoc />
                                <DatePickerDoc />
                                <StepsDoc />
                                <RateDoc />
                                <TagDoc />
                                <EmptyDoc />
                                <InputNumberDoc />
                                <TimePickerDoc />
                                <UploadDoc />
                                <ImageDoc />
                                <CarouselDoc />
                                <MenuDoc />
                                <TimelineDoc />
                                <CalendarDoc />
                            </div>

                            {/* 结尾说明 */}
                            <div className="pt-8 border-t-2 border-border">
                                <Card className="bg-card">
                                    <CardContent className="p-6">
                                        <H3 className="mb-2">📚 完整文档已上线！</H3>
                                        <P className="mt-0 mb-4">MatherUI 现已包含 35+ 个组件的完整文档，每个组件都有：</P>
                                        <div className="space-y-1 text-sm ml-4">
                                            <p>✅ 详细的功能描述</p>
                                            <p>✅ 多个可视化示例</p>
                                            <p>✅ 完整的代码片段</p>
                                            <p>✅ Props API 文档表格</p>
                                        </div>
                                        <P className="mt-4 text-sm text-muted-foreground">更多高级组件文档（Dialog, Popover, Select, Tooltip 等）即将推出...</P>
                                    </CardContent>
                                </Card>
                            </div>
                        </main>
                    </div>
                </Container>
            </Section>

            <Footer />
            <Toaster />
        </div>
    )
}

export default DocsPage

