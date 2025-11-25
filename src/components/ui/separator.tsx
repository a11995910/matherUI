/**
 * Separator 分隔线组件
 * 用于在内容之间创建视觉分隔
 * 
 * @description 支持水平和垂直方向，可用于分隔内容块或菜单项
 * @example
 * // 水平分隔线
 * <Separator />
 * 
 * // 垂直分隔线
 * <Separator orientation="vertical" />
 */
import * as React from "react"
import { cn } from "../../lib/utils"

// Separator 组件属性类型
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 
     * 分隔线方向
     * - horizontal: 水平（默认）
     * - vertical: 垂直
     */
    orientation?: "horizontal" | "vertical"
    /** 是否为装饰性元素（影响无障碍属性） */
    decorative?: boolean
}

/**
 * Separator 分隔线组件
 * 
 * @param orientation - 方向：horizontal | vertical
 * @param decorative - 是否为装饰性元素
 * @param className - 自定义类名
 * @param props - 其他 div 属性
 * @returns 分隔线组件
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    (
        {
            className,
            orientation = "horizontal",
            decorative = true,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                role={decorative ? "none" : "separator"}
                aria-orientation={decorative ? undefined : orientation}
                className={cn(
                    "shrink-0 bg-border",
                    orientation === "horizontal" 
                        ? "h-[2px] w-full" 
                        : "h-full w-[2px]",
                    className
                )}
                {...props}
            />
        )
    }
)
Separator.displayName = "Separator"

export { Separator }
