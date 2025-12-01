/**
 * Effects 特效组件文档
 */

import { Card, CardContent } from "../../../components/ui/card"
import { TiltCard } from "../../../components/ui/tilt-card"
import { Marquee } from "../../../components/ui/marquee"
import { GradientText, GradientBorder } from "../../../components/ui/gradient-text"
import { MorphText } from "../../../components/ui/morph-text"
import { useTypewriter } from "../../../hooks/useTypewriter"
import { useCountUp } from "../../../hooks/useCountUp"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"
import { Link } from "react-router-dom"
import { Sparkles } from "lucide-react"
import { Badge } from "../../../components/ui/badge"

const typewriterProps: PropItem[] = [
    { prop: "texts", type: "string[]", default: "-", description: "要循环显示的文本数组" },
    { prop: "typeSpeed", type: "number", default: "100", description: "打字速度（毫秒/字符）" },
    { prop: "deleteSpeed", type: "number", default: "50", description: "删除速度（毫秒/字符）" },
    { prop: "pauseTime", type: "number", default: "2000", description: "打完后暂停时间（毫秒）" },
]

const tiltCardProps: PropItem[] = [
    { prop: "maxTilt", type: "number", default: "10", description: "最大倾斜角度（度）" },
    { prop: "scale", type: "boolean", default: "true", description: "是否启用悬停缩放" },
    { prop: "scaleAmount", type: "number", default: "1.02", description: "缩放比例" },
    { prop: "perspective", type: "number", default: "1000", description: "透视距离（px）" },
    { prop: "transitionSpeed", type: "number", default: "0.15", description: "过渡动画时间（秒）" },
]

const countUpProps: PropItem[] = [
    { prop: "end", type: "number", default: "-", description: "目标数值" },
    { prop: "duration", type: "number", default: "2000", description: "动画持续时间（毫秒）" },
    { prop: "start", type: "number", default: "0", description: "起始数值" },
    { prop: "decimals", type: "number", default: "0", description: "小数位数" },
]

const marqueeProps: PropItem[] = [
    { prop: "direction", type: "'left' | 'right'", default: "'left'", description: "滚动方向" },
    { prop: "duration", type: "number", default: "20", description: "动画持续时间（秒）" },
    { prop: "pauseOnHover", type: "boolean", default: "true", description: "悬停时暂停" },
    { prop: "gap", type: "number", default: "16", description: "元素间距（px）" },
]

const gradientProps: PropItem[] = [
    { prop: "colors", type: "string[]", default: "['#66b3ff', ...]", description: "渐变颜色数组" },
    { prop: "duration", type: "number", default: "3", description: "动画周期（秒）" },
    { prop: "animate", type: "boolean", default: "true", description: "是否启用动画" },
]

const morphTextProps: PropItem[] = [
    { prop: "texts", type: "string[]", default: "-", description: "循环显示的文本数组" },
    { prop: "morphDuration", type: "number", default: "1000", description: "变形动画时间（毫秒）" },
    { prop: "displayDuration", type: "number", default: "2000", description: "文本停留时间（毫秒）" },
]

const demoTexts = ["打字机效果", "Typewriter", "MatherUI"]
const morphTexts = ["创新", "设计", "体验"]
const marqueeItems = ["React", "TypeScript", "Tailwind", "Vite"]

export function EffectsDoc() {
    const typewriterText = useTypewriter(demoTexts, 80, 40, 1500)
    const { count } = useCountUp(1234, 2000)

    return (
        <>
            <DocSection
                id="effects"
                title="Effects 特效组件"
                description="MatherUI 提供的交互特效组件，为应用增添生动的用户体验。"
                props={typewriterProps}
            >
                <div className="mb-8 p-4 bg-primary/5 border-2 border-primary/20 rounded">
                    <p className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        查看完整的特效演示和更多示例，请访问
                        <Link to="/effects" className="text-primary font-bold hover:underline">
                            特效展示页面
                        </Link>
                    </p>
                </div>

                <DocExample
                    title="打字机效果 useTypewriter"
                    code={`const texts = ["Hello", "你好", "Bonjour"]
const displayText = useTypewriter(texts, 100, 50, 2000)

return <h1>{displayText}<span className="animate-pulse">|</span></h1>`}
                >
                    <div className="text-2xl font-bold text-center py-8">
                        <span className="text-primary">
                            {typewriterText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>
                </DocExample>
            </DocSection>

            <DocSection
                id="tilt-card"
                title="TiltCard 倾斜卡片"
                description="鼠标悬停时跟随光标进行 3D 倾斜的卡片组件，使用 requestAnimationFrame 优化性能。"
                props={tiltCardProps}
            >
                <DocExample
                    title="3D 倾斜卡片"
                    code={`<TiltCard maxTilt={12}>
    <Card>
        <CardContent>卡片内容</CardContent>
    </Card>
</TiltCard>`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
                        <TiltCard maxTilt={12}>
                            <Card className="h-full">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl mb-2">🎨</div>
                                    <p className="font-bold">移动鼠标</p>
                                    <p className="text-sm text-muted-foreground">体验 3D 倾斜效果</p>
                                </CardContent>
                            </Card>
                        </TiltCard>
                        <TiltCard maxTilt={12}>
                            <Card className="h-full">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl mb-2">⚡</div>
                                    <p className="font-bold">高性能</p>
                                    <p className="text-sm text-muted-foreground">requestAnimationFrame 优化</p>
                                </CardContent>
                            </Card>
                        </TiltCard>
                    </div>
                </DocExample>
            </DocSection>

            <DocSection
                id="count-up"
                title="CountUp 数字递增"
                description="数字从起始值平滑递增到目标值，支持小数和自定义缓动。"
                props={countUpProps}
            >
                <DocExample
                    title="数字递增动画"
                    code={`const { count } = useCountUp(1234, 2000)
return <span>{count}</span>`}
                >
                    <div className="text-center py-8">
                        <span className="text-5xl font-bold font-serif text-primary">{count}</span>
                    </div>
                </DocExample>
            </DocSection>

            <DocSection
                id="marquee"
                title="Marquee 跑马灯"
                description="内容无限循环滚动，支持悬停暂停和方向控制。"
                props={marqueeProps}
            >
                <DocExample
                    title="无限滚动"
                    code={`<Marquee duration={15} pauseOnHover>
    <span>Item 1</span>
    <span>Item 2</span>
</Marquee>`}
                >
                    <Marquee duration={10} pauseOnHover className="py-4">
                        {marqueeItems.map((item, i) => (
                            <Badge key={i} variant="secondary" className="text-sm px-4 py-2">
                                {item}
                            </Badge>
                        ))}
                    </Marquee>
                </DocExample>
            </DocSection>

            <DocSection
                id="gradient"
                title="Gradient 渐变动画"
                description="流动的渐变色效果，可用于文字和边框。"
                props={gradientProps}
            >
                <DocExample
                    title="渐变文字和边框"
                    code={`<GradientText>渐变文字</GradientText>
<GradientBorder><div>内容</div></GradientBorder>`}
                >
                    <div className="text-center space-y-6 py-4">
                        <GradientText className="text-4xl">渐变流动文字</GradientText>
                        <div className="flex justify-center">
                            <GradientBorder borderWidth={2} borderRadius={4}>
                                <div className="px-6 py-3 font-bold">渐变边框</div>
                            </GradientBorder>
                        </div>
                    </div>
                </DocExample>
            </DocSection>

            <DocSection
                id="morph-text"
                title="MorphText 文字变形"
                description="文字通过模糊效果平滑变形为另一个词。"
                props={morphTextProps}
            >
                <DocExample
                    title="文字变形动画"
                    code={`<MorphText texts={['创新', '设计', '体验']} />`}
                >
                    <div className="text-center py-8">
                        <span className="text-4xl font-bold font-serif">
                            我们追求{' '}
                            <span className="text-primary">
                                <MorphText texts={morphTexts} morphDuration={800} displayDuration={1500} />
                            </span>
                        </span>
                    </div>
                </DocExample>
            </DocSection>
        </>
    )
}
