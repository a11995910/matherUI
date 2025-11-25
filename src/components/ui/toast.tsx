/**
 * Toast 消息提醒组件
 * 基于 sonner 封装，提供简洁的 API 用于显示通知消息
 * 
 * @description 用于显示轻量级的反馈通知，支持多种类型：成功、错误、警告、信息等
 * @example
 * // 基本用法
 * toast("消息内容")
 * toast.success("操作成功")
 * toast.error("操作失败")
 */
import { Toaster as Sonner, toast } from "sonner"
import { cn } from "../../lib/utils"

// Toast 容器组件的属性类型
type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Toaster 组件 - Toast 消息的容器
 * 需要在应用根组件中添加此组件才能显示 toast 消息
 * 
 * @param props - Sonner 组件的所有属性
 * @returns Toast 容器组件
 */
function Toaster({ className, ...props }: ToasterProps) {
    return (
        <Sonner
            className={cn("toaster group", className)}
            toastOptions={{
                classNames: {
                    toast: cn(
                        "group toast",
                        "border-2 border-border bg-background text-foreground",
                        "shadow-retro",
                        "font-medium"
                    ),
                    title: "font-bold",
                    description: "text-muted-foreground text-sm",
                    actionButton: cn(
                        "bg-primary text-primary-foreground",
                        "border-2 border-border",
                        "shadow-retro hover:shadow-retro-hover",
                        "hover:translate-x-[2px] hover:translate-y-[2px]",
                        "font-bold"
                    ),
                    cancelButton: cn(
                        "bg-muted text-muted-foreground",
                        "border-2 border-border",
                        "font-bold"
                    ),
                    success: "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300",
                    error: "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300",
                    warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
                    info: "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
                },
            }}
            {...props}
        />
    )
}

export { Toaster, toast }
