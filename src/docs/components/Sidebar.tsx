/**
 * Sidebar 侧边导航组件
 * 根据配置自动生成文档导航
 */

import { H2 } from "../../components/ui/typography"
import { navConfig } from "../config"

/**
 * 平滑滚动到目标元素
 * @param e - 点击事件
 * @param href - 目标锚点
 */
function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
        // 使用平滑滚动动画
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        // 更新 URL hash（不触发跳转）
        window.history.pushState(null, '', href)
    }
}

/**
 * Sidebar - 文档侧边导航
 * 自动从 navConfig 读取配置生成导航
 * 支持点击平滑滚动动画
 */
export function Sidebar() {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <div>
                    <H2 className="text-lg mb-3">组件导航</H2>

                    <div className="space-y-4">
                        {navConfig.map((category) => (
                            <div key={category.name}>
                                <h4 className="font-bold text-sm mb-2 text-muted-foreground">
                                    {category.name}
                                </h4>
                                <nav className="space-y-1">
                                    {category.items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            onClick={(e) => handleSmoothScroll(e, item.href)}
                                            className="block py-1.5 px-3 text-sm hover:bg-muted border-2 border-transparent hover:border-border transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}
