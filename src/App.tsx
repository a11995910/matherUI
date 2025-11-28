import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { H1, H2, H3, P } from "./components/ui/typography"
import { Badge } from "./components/ui/badge"
import { Container, Section } from "./components/ui/container"
import { Package, Palette, Zap, Code2, Copy, Check } from "lucide-react"
import { Navbar } from "./components/layout/navbar"
import { Footer } from "./components/layout/footer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { CodeBlock } from "./components/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import { useState } from "react"

function App() {
  const [copiedButton, setCopiedButton] = useState(false)
  const [copiedInput, setCopiedInput] = useState(false)

  const copyToClipboard = (text: string, type: 'button' | 'input') => {
    navigator.clipboard.writeText(text)
    if (type === 'button') {
      setCopiedButton(true)
      setTimeout(() => setCopiedButton(false), 2000)
    } else {
      setCopiedInput(true)
      setTimeout(() => setCopiedInput(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* Hero Section */}
      <Section className="relative border-b-2 border-border bg-[#f0eee9]">
        <Container className="py-24 text-center">
          <Badge variant="outline" className="mb-6 bg-white border-primary/50 text-primary px-4 py-1">
            v1.1.0 已发布
          </Badge>
          <H1 className="text-5xl lg:text-7xl mb-6">
            复古风格的 <br />
            <span className="text-primary">React 组件库</span>
          </H1>
          <P className="text-xl max-w-2xl mx-auto mb-8 text-foreground">
            MatherUI 是一个受 MotherDuck 启发的 React 组件库，采用大胆的复古/野兽派设计风格。
            使用 React、Tailwind CSS 和 TypeScript 构建。
          </P>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#components">
              <Button size="lg" className="gap-2">
                <Package className="h-5 w-5" />
                浏览组件
              </Button>
            </a>
            <Link to="/docs">
              <Button size="lg" variant="outline">
                <Code2 className="h-5 w-5 mr-2" />
                查看文档
              </Button>
            </Link>
          </div>

          {/* Quick Install */}
          <div className="mt-16 max-w-2xl mx-auto">
            <CodeBlock title="快速安装">
              {`npm install matherui
# 或使用 yarn
yarn add matherui`}
            </CodeBlock>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section className="bg-background border-b-2 border-border">
        <Container>
          <div className="text-center mb-16">
            <H2>为什么选择 MatherUI？</H2>
            <P className="text-lg">复古美学与现代技术的完美结合</P>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 border-2 border-border flex items-center justify-center">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <H3 className="mb-3">独特设计</H3>
                <P className="mt-0 text-sm">
                  大胆的黑色边框、硬阴影和高对比度，打造独一无二的视觉体验。
                </P>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-secondary/10 border-2 border-border flex items-center justify-center">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <H3 className="mb-3">开发体验</H3>
                <P className="mt-0 text-sm">
                  完整的 TypeScript 支持，基于 Tailwind CSS，易于定制和扩展。
                </P>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 border-2 border-border flex items-center justify-center">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <H3 className="mb-3">丰富组件</H3>
                <P className="mt-0 text-sm">
                  10+ 个精心设计的组件，满足大部分 UI 需求。
                </P>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Component Gallery */}
      <Section id="components" className="bg-background border-b-2 border-border">
        <Container>
          <div className="text-center mb-16">
            <H2>组件展示</H2>
            <P>探索 MatherUI 的所有组件</P>
          </div>

          <div className="space-y-16">
            {/* Buttons */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <H3>按钮 (Button)</H3>
                <Badge>必备</Badge>
              </div>
              <P className="mt-0">支持多种样式变体的按钮组件，带有复古硬阴影效果。</P>

              <Card className="bg-card">
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => copyToClipboard('<Button>Click me</Button>', 'button')}
                  className="text-sm font-mono flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {copiedButton ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedButton ? '已复制!' : '复制代码'}
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-6">
              <H3>输入框 (Input)</H3>
              <P className="mt-0">带有聚焦状态的输入框组件。</P>

              <Card className="bg-card">
                <CardContent className="p-8">
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-bold mb-2">邮箱</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">密码</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => copyToClipboard('<Input placeholder="Enter text" />', 'input')}
                  className="text-sm font-mono flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {copiedInput ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedInput ? '已复制!' : '复制代码'}
                </button>
              </div>
            </div>

            {/* Card */}
            <div className="space-y-6">
              <H3>卡片 (Card)</H3>
              <P className="mt-0">带有硬阴影的卡片容器。</P>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <H3 className="text-xl mb-2">卡片标题</H3>
                    <P className="mt-0 text-sm">这是一个简单的卡片组件示例，可以容纳任何内容。</P>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <H3 className="text-xl mb-2">另一个卡片</H3>
                    <P className="mt-0 text-sm">卡片之间有明显的边界和阴影效果。</P>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Table */}
            <div className="space-y-6">
              <H3>表格 (Table)</H3>
              <P className="mt-0">带有粗边框的数据表格组件。</P>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>组件</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">版本</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Button</TableCell>
                    <TableCell>稳定</TableCell>
                    <TableCell className="text-right">v1.0.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Input</TableCell>
                    <TableCell>稳定</TableCell>
                    <TableCell className="text-right">v1.0.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Card</TableCell>
                    <TableCell>稳定</TableCell>
                    <TableCell className="text-right">v1.0.0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Tabs */}
            <div className="space-y-6">
              <H3>标签页 (Tabs)</H3>
              <P className="mt-0">用于组织内容的标签页组件。</P>

              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="preview">预览</TabsTrigger>
                  <TabsTrigger value="code">代码</TabsTrigger>
                </TabsList>
                <TabsContent value="preview">
                  <div className="p-6">
                    <P className="mt-0">这是预览标签页的内容。在这里可以展示组件的实时效果。</P>
                  </div>
                </TabsContent>
                <TabsContent value="code">
                  <CodeBlock title="示例代码">
                    {`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">内容1</TabsContent>
  <TabsContent value="tab2">内容2</TabsContent>
</Tabs>`}
                  </CodeBlock>
                </TabsContent>
              </Tabs>
            </div>

            {/* Accordion */}
            <div className="space-y-6">
              <H3>手风琴 (Accordion)</H3>
              <P className="mt-0">可折叠的内容面板。</P>

              <Accordion type="single" collapsible className="w-full border-2 border-border shadow-retro bg-card p-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger>MatherUI 是什么？</AccordionTrigger>
                  <AccordionContent>
                    MatherUI 是一个采用复古/野兽派设计风格的 React 组件库，专注于大胆的视觉效果和现代开发体验。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>如何安装？</AccordionTrigger>
                  <AccordionContent>
                    使用 npm install matherui 或 yarn add matherui 即可安装。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>支持 TypeScript 吗？</AccordionTrigger>
                  <AccordionContent>
                    是的，MatherUI 完全使用 TypeScript 编写，提供完整的类型定义。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Badge */}
            <div className="space-y-6">
              <H3>徽章 (Badge)</H3>
              <P className="mt-0">用于标记和分类的小型标签组件。</P>

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
            </div>
          </div>
        </Container>
      </Section>

      {/* Get Started */}
      <Section className="bg-[#f0eee9]">
        <Container className="text-center py-24">
          <H2 className="mb-6">开始使用 MatherUI</H2>
          <P className="text-xl max-w-2xl mx-auto mb-8">
            立即开始构建具有独特视觉风格的应用程序
          </P>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs">
              <Button size="lg">查看文档</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">浏览示例</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}

export default App
