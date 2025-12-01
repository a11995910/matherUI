/**
 * EffectsPage - 特效展示页面
 * 展示 MatherUI 提供的交互特效组件
 */

import { Navbar } from "../components/layout/navbar"
import { Footer } from "../components/layout/footer"
import { Container, Section } from "../components/ui/container"
import { H1, H2, H3, P } from "../components/ui/typography"
import { Card, CardContent } from "../components/ui/card"
import { TiltCard } from "../components/ui/tilt-card"
import { Marquee } from "../components/ui/marquee"
import { GradientText, GradientBorder } from "../components/ui/gradient-text"
import { MorphText } from "../components/ui/morph-text"
import { useTypewriter } from "../hooks/useTypewriter"
import { useCountUp } from "../hooks/useCountUp"
import { CodeBlock } from "../components/ui/code-block"
import { Badge } from "../components/ui/badge"
import { Sparkles, Type, Box, RotateCw, Palette, Hash, Infinity } from "lucide-react"

// 打字机演示文本
const typewriterDemoTexts = [
    "Hello, World!",
    "你好，世界！",
    "MatherUI 特效",
    "打字机效果",
    "React + TypeScript",
]

// Morph 演示文本
const morphTexts = ["创新", "设计", "体验", "未来"]

// Marquee 演示 Logo
const marqueeLogos = ["React", "TypeScript", "Tailwind", "Vite", "MatherUI", "Recharts"]

export function EffectsPage() {
    const typewriterText = useTypewriter(typewriterDemoTexts, 100, 50, 2000)
    const { count: count1 } = useCountUp(1234, 2000)
    const { count: count2 } = useCountUp(99.9, 2000, 0, 1)
    const { count: count3 } = useCountUp(50000, 2500)

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <Section className="border-b-2 border-border bg-[#f0eee9]">
                <Container className="py-16 text-center">
                    <Badge variant="outline" className="mb-4 bg-white border-primary/50 text-primary px-4 py-1">
                        <Sparkles className="h-4 w-4 mr-2 inline" />
                        交互特效
                    </Badge>
                    <H1 className="text-4xl lg:text-6xl mb-4">特效组件</H1>
                    <P className="text-xl max-w-2xl mx-auto">
                        为你的应用增添生动的交互体验，让界面更具吸引力
                    </P>
                </Container>
            </Section>

            {/* 打字机效果 */}
            <Section className="border-b-2 border-border">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-primary/10 border-2 border-border flex items-center justify-center">
                            <Type className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <H2 className="mb-0">打字机效果</H2>
                            <P className="mt-1 text-sm text-muted-foreground">Typewriter Effect</P>
                        </div>
                    </div>

                    <P className="mb-8">
                        模拟真实的打字和删除过程，支持多文本循环、可调节速度，适用于 Hero 区域标题、加载提示等场景。
                    </P>

                    {/* 演示区域 */}
                    <Card className="mb-8">
                        <CardContent className="p-12 text-center">
                            <div className="text-4xl lg:text-5xl font-bold font-serif">
                                <span className="text-primary">
                                    {typewriterText}
                                    <span className="animate-pulse">|</span>
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 代码示例 */}
                    <H3 className="mb-4">使用方法</H3>
                    <CodeBlock title="useTypewriter Hook">
{`import { useTypewriter } from 'matherui'

const texts = ["Hello", "你好", "Bonjour"]
const displayText = useTypewriter(texts, 100, 50, 2000)
// 参数: 文本数组, 打字速度, 删除速度, 暂停时间

return (
    <h1>
        {displayText}
        <span className="animate-pulse">|</span>
    </h1>
)`}
                    </CodeBlock>

                    {/* 参数说明 */}
                    <H3 className="mt-8 mb-4">参数</H3>
                    <div className="border-2 border-border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">参数</th>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">类型</th>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">默认值</th>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">texts</td>
                                    <td className="p-3 border-b border-border">string[]</td>
                                    <td className="p-3 border-b border-border">-</td>
                                    <td className="p-3 border-b border-border">要循环显示的文本数组</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">typeSpeed</td>
                                    <td className="p-3 border-b border-border">number</td>
                                    <td className="p-3 border-b border-border">100</td>
                                    <td className="p-3 border-b border-border">打字速度（毫秒/字符）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">deleteSpeed</td>
                                    <td className="p-3 border-b border-border">number</td>
                                    <td className="p-3 border-b border-border">50</td>
                                    <td className="p-3 border-b border-border">删除速度（毫秒/字符）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">pauseTime</td>
                                    <td className="p-3">number</td>
                                    <td className="p-3">2000</td>
                                    <td className="p-3">打完后暂停时间（毫秒）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Container>
            </Section>

            {/* 3D 倾斜卡片 */}
            <Section className="border-b-2 border-border">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-secondary/10 border-2 border-border flex items-center justify-center">
                            <Box className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <H2 className="mb-0">3D 倾斜卡片</H2>
                            <P className="mt-1 text-sm text-muted-foreground">Tilt Card Effect</P>
                        </div>
                    </div>

                    <P className="mb-8">
                        鼠标悬停时卡片跟随光标进行 3D 倾斜，创造全息交互感。使用 requestAnimationFrame 优化，性能流畅。
                    </P>

                    {/* 演示区域 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" style={{ perspective: '1000px' }}>
                        <TiltCard maxTilt={15}>
                            <Card className="h-full">
                                <CardContent className="p-8 text-center">
                                    <div className="h-16 w-16 mx-auto mb-4 bg-primary/20 border-2 border-border flex items-center justify-center text-2xl">
                                        🎨
                                    </div>
                                    <H3>设计</H3>
                                    <P className="mt-2 text-sm">移动鼠标体验 3D 倾斜效果</P>
                                </CardContent>
                            </Card>
                        </TiltCard>

                        <TiltCard maxTilt={15}>
                            <Card className="h-full">
                                <CardContent className="p-8 text-center">
                                    <div className="h-16 w-16 mx-auto mb-4 bg-secondary/20 border-2 border-border flex items-center justify-center text-2xl">
                                        ⚡
                                    </div>
                                    <H3>性能</H3>
                                    <P className="mt-2 text-sm">requestAnimationFrame 优化</P>
                                </CardContent>
                            </Card>
                        </TiltCard>

                        <TiltCard maxTilt={15}>
                            <Card className="h-full">
                                <CardContent className="p-8 text-center">
                                    <div className="h-16 w-16 mx-auto mb-4 bg-primary/20 border-2 border-border flex items-center justify-center text-2xl">
                                        🎯
                                    </div>
                                    <H3>交互</H3>
                                    <P className="mt-2 text-sm">流畅的鼠标跟随效果</P>
                                </CardContent>
                            </Card>
                        </TiltCard>
                    </div>

                    {/* 代码示例 */}
                    <H3 className="mb-4">使用方法</H3>
                    <CodeBlock title="TiltCard 组件">
{`import { TiltCard } from 'matherui'

<div style={{ perspective: '1000px' }}>
    <TiltCard maxTilt={12} scale={true}>
        <Card>
            <h3>卡片标题</h3>
            <p>卡片内容</p>
        </Card>
    </TiltCard>
</div>`}
                    </CodeBlock>

                    {/* 参数说明 */}
                    <H3 className="mt-8 mb-4">参数</H3>
                    <div className="border-2 border-border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">参数</th>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">类型</th>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">默认值</th>
                                    <th className="p-3 text-left font-bold border-b-2 border-border">说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">maxTilt</td>
                                    <td className="p-3 border-b border-border">number</td>
                                    <td className="p-3 border-b border-border">10</td>
                                    <td className="p-3 border-b border-border">最大倾斜角度（度）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">scale</td>
                                    <td className="p-3 border-b border-border">boolean</td>
                                    <td className="p-3 border-b border-border">true</td>
                                    <td className="p-3 border-b border-border">是否启用悬停缩放</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">scaleAmount</td>
                                    <td className="p-3 border-b border-border">number</td>
                                    <td className="p-3 border-b border-border">1.02</td>
                                    <td className="p-3 border-b border-border">缩放比例</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border-b border-border font-mono">perspective</td>
                                    <td className="p-3 border-b border-border">number</td>
                                    <td className="p-3 border-b border-border">1000</td>
                                    <td className="p-3 border-b border-border">透视距离（px）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono">transitionSpeed</td>
                                    <td className="p-3">number</td>
                                    <td className="p-3">0.15</td>
                                    <td className="p-3">过渡动画时间（秒）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Container>
            </Section>

            {/* Count Up 数字递增 */}
            <Section className="border-b-2 border-border">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-primary/10 border-2 border-border flex items-center justify-center">
                            <Hash className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <H2 className="mb-0">数字递增动画</H2>
                            <P className="mt-1 text-sm text-muted-foreground">Count Up Effect</P>
                        </div>
                    </div>

                    <P className="mb-8">
                        数字从 0 平滑递增到目标值，支持小数、自定义持续时间，适用于统计数据展示。
                    </P>

                    {/* 演示区域 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-8 text-center">
                                <div className="text-5xl font-bold font-serif text-primary mb-2">
                                    {count1}
                                </div>
                                <P className="mt-0 text-sm text-muted-foreground">用户数量</P>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-8 text-center">
                                <div className="text-5xl font-bold font-serif text-secondary mb-2">
                                    {count2}%
                                </div>
                                <P className="mt-0 text-sm text-muted-foreground">满意度</P>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-8 text-center">
                                <div className="text-5xl font-bold font-serif text-primary mb-2">
                                    ¥{count3.toLocaleString()}
                                </div>
                                <P className="mt-0 text-sm text-muted-foreground">总销售额</P>
                            </CardContent>
                        </Card>
                    </div>

                    <CodeBlock title="useCountUp Hook">
{`import { useCountUp } from 'matherui'

const { count, startAnimation, reset } = useCountUp(
    1000,   // 目标值
    2000,   // 持续时间（毫秒）
    0,      // 起始值
    0       // 小数位数
)

return <span>{count}</span>`}
                    </CodeBlock>
                </Container>
            </Section>

            {/* Marquee 跑马灯 */}
            <Section className="border-b-2 border-border">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-secondary/10 border-2 border-border flex items-center justify-center">
                            <Infinity className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <H2 className="mb-0">无限滚动</H2>
                            <P className="mt-1 text-sm text-muted-foreground">Marquee Effect</P>
                        </div>
                    </div>

                    <P className="mb-8">
                        内容无限循环滚动，支持悬停暂停、方向控制，适用于品牌展示、公告等场景。
                    </P>

                    {/* 演示区域 */}
                    <Card className="mb-4 overflow-hidden">
                        <CardContent className="p-0">
                            <Marquee duration={15} pauseOnHover className="py-6">
                                {marqueeLogos.map((logo, i) => (
                                    <div
                                        key={i}
                                        className="px-8 py-4 border-2 border-border bg-card font-bold text-lg"
                                    >
                                        {logo}
                                    </div>
                                ))}
                            </Marquee>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 overflow-hidden">
                        <CardContent className="p-0">
                            <Marquee duration={20} direction="right" pauseOnHover className="py-6">
                                {marqueeLogos.map((logo, i) => (
                                    <Badge key={i} variant="secondary" className="text-base px-4 py-2">
                                        {logo}
                                    </Badge>
                                ))}
                            </Marquee>
                        </CardContent>
                    </Card>

                    <CodeBlock title="Marquee 组件">
{`import { Marquee } from 'matherui'

<Marquee duration={20} pauseOnHover direction="left">
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
</Marquee>`}
                    </CodeBlock>
                </Container>
            </Section>

            {/* Gradient Animation 渐变动画 */}
            <Section className="border-b-2 border-border">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-primary/10 border-2 border-border flex items-center justify-center">
                            <Palette className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <H2 className="mb-0">渐变动画</H2>
                            <P className="mt-1 text-sm text-muted-foreground">Gradient Animation</P>
                        </div>
                    </div>

                    <P className="mb-8">
                        流动的渐变色效果，可用于文字和边框，吸引用户注意力。
                    </P>

                    {/* 演示区域 */}
                    <Card className="mb-8">
                        <CardContent className="p-12 text-center space-y-8">
                            <div>
                                <GradientText className="text-5xl lg:text-6xl">
                                    渐变流动文字
                                </GradientText>
                            </div>
                            <div>
                                <GradientText 
                                    colors={['#ff6b6b', '#ffd93d', '#ff6b6b']} 
                                    className="text-4xl"
                                    duration={2}
                                >
                                    自定义颜色
                                </GradientText>
                            </div>
                            <div className="flex justify-center">
                                <GradientBorder borderWidth={3} borderRadius={8}>
                                    <div className="px-8 py-4 font-bold">
                                        渐变边框效果
                                    </div>
                                </GradientBorder>
                            </div>
                        </CardContent>
                    </Card>

                    <CodeBlock title="GradientText & GradientBorder">
{`import { GradientText, GradientBorder } from 'matherui'

<GradientText colors={['#66b3ff', '#ff6b6b', '#4ecdc4']}>
    渐变文字
</GradientText>

<GradientBorder borderWidth={2} borderRadius={8}>
    <div>渐变边框内容</div>
</GradientBorder>`}
                    </CodeBlock>
                </Container>
            </Section>

            {/* Morph Text 文字变形 */}
            <Section className="border-b-2 border-border">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-12 w-12 bg-secondary/10 border-2 border-border flex items-center justify-center">
                            <RotateCw className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <H2 className="mb-0">文字变形</H2>
                            <P className="mt-1 text-sm text-muted-foreground">Morph Text Effect</P>
                        </div>
                    </div>

                    <P className="mb-8">
                        文字通过模糊效果平滑变形为另一个词，适用于 Slogan、关键词展示。
                    </P>

                    {/* 演示区域 */}
                    <Card className="mb-8">
                        <CardContent className="p-12 text-center">
                            <div className="text-5xl lg:text-6xl font-bold font-serif">
                                我们追求{' '}
                                <span className="text-primary">
                                    <MorphText texts={morphTexts} morphDuration={800} displayDuration={2000} />
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <CodeBlock title="MorphText 组件">
{`import { MorphText } from 'matherui'

<MorphText 
    texts={['创新', '设计', '体验', '未来']}
    morphDuration={800}
    displayDuration={2000}
/>`}
                    </CodeBlock>
                </Container>
            </Section>

            <Footer />
        </div>
    )
}
