/**
 * Carousel 组件文档
 */

import { Carousel, CarouselItem } from "../../../components/ui/carousel"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const carouselProps: PropItem[] = [
    { prop: "autoplay", type: "boolean", default: "false", description: "是否自动播放" },
    { prop: "autoplayInterval", type: "number", default: "3000", description: "自动播放间隔（毫秒）" },
    { prop: "arrows", type: "boolean", default: "true", description: "是否显示箭头" },
    { prop: "dots", type: "boolean", default: "true", description: "是否显示指示器" },
    { prop: "dotsPosition", type: "'bottom' | 'top' | 'left' | 'right'", default: "'bottom'", description: "指示器位置" },
    { prop: "infinite", type: "boolean", default: "true", description: "是否无限循环" },
    { prop: "speed", type: "number", default: "300", description: "动画速度（毫秒）" },
    { prop: "initialIndex", type: "number", default: "0", description: "初始索引" },
    { prop: "height", type: "number | string", default: "300", description: "高度" },
    { prop: "onChange", type: "(index: number) => void", default: "-", description: "切换回调" },
]

export function CarouselDoc() {
    const colors = ['bg-primary', 'bg-secondary', 'bg-green-500', 'bg-purple-500']

    return (
        <DocSection
            id="carousel"
            title="Carousel 轮播图"
            description="轮播图/走马灯组件，支持自动播放、无限循环、触摸滑动等功能。"
            props={carouselProps}
        >
            <DocExample
                title="基本用法"
                code={`<Carousel>
  <CarouselItem>Slide 1</CarouselItem>
  <CarouselItem>Slide 2</CarouselItem>
  <CarouselItem>Slide 3</CarouselItem>
</Carousel>`}
            >
                <Carousel height={200}>
                    {colors.map((color, index) => (
                        <CarouselItem key={index}>
                            <div className={`${color} h-full flex items-center justify-center text-white text-2xl font-bold`}>
                                Slide {index + 1}
                            </div>
                        </CarouselItem>
                    ))}
                </Carousel>
            </DocExample>

            <DocExample
                title="自动播放"
                code={`<Carousel autoplay autoplayInterval={2000}>
  ...
</Carousel>`}
            >
                <Carousel height={200} autoplay autoplayInterval={2000}>
                    {colors.map((color, index) => (
                        <CarouselItem key={index}>
                            <div className={`${color} h-full flex items-center justify-center text-white text-2xl font-bold`}>
                                Slide {index + 1}
                            </div>
                        </CarouselItem>
                    ))}
                </Carousel>
            </DocExample>

            <DocExample
                title="隐藏箭头"
                code={`<Carousel arrows={false}>
  ...
</Carousel>`}
            >
                <Carousel height={200} arrows={false}>
                    {colors.map((color, index) => (
                        <CarouselItem key={index}>
                            <div className={`${color} h-full flex items-center justify-center text-white text-2xl font-bold`}>
                                Slide {index + 1}
                            </div>
                        </CarouselItem>
                    ))}
                </Carousel>
            </DocExample>
        </DocSection>
    )
}
