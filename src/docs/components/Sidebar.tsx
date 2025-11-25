/**
 * Sidebar 侧边导航组件
 * 根据配置自动生成文档导航
 */

import { H2 } from "../../components/ui/typography"
import { navConfig } from "../config"

/**
 * Sidebar - 文档侧边导航
 * 自动从 navConfig 读取配置生成导航
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
