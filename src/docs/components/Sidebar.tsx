/**
 * Sidebar 侧边导航组件
 * 根据配置自动生成文档导航，支持分类折叠
 */

import { H2 } from "../../components/ui/typography"
import { Collapsible } from "../../components/ui/collapsible"
import { navConfig } from "../config"
import { Badge } from "../../components/ui/badge"

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
 * 支持点击平滑滚动动画和分类折叠
 */
export function Sidebar() {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <div>
                    <H2 className="text-lg mb-3">组件导航</H2>

                    <div className="space-y-2">
                        {navConfig.map((category) => (
                            <Collapsible
                                key={category.name}
                                title={
                                    <span className="flex items-center gap-2">
                                        {category.name}
                                        {category.isNew && (
                                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                                NEW
                                            </Badge>
                                        )}
                                    </span>
                                }
                                defaultOpen={true}
                            >
                                <nav className="space-y-0.5 pl-2">
                                    {category.items.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            onClick={(e) => handleSmoothScroll(e, item.href)}
                                            className="block py-1.5 px-3 text-sm hover:bg-muted border-2 border-transparent hover:border-border transition-colors rounded"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            </Collapsible>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}
