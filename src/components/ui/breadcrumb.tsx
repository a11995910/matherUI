/**
 * Breadcrumb 面包屑导航组件
 * 用于展示当前页面在网站层级结构中的位置
 * 
 * @description 帮助用户了解当前位置并快速返回上级页面
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">首页</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>当前页</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */
import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"

/**
 * Breadcrumb 容器组件
 * 作为面包屑导航的根容器
 */
const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"nav"> & {
        /** 分隔符元素 */
        separator?: React.ReactNode
    }
>(({ ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" {...props} />
))
Breadcrumb.displayName = "Breadcrumb"

/**
 * BreadcrumbList 列表组件
 * 包含所有面包屑项目的有序列表
 */
const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
            className
        )}
        {...props}
    />
))
BreadcrumbList.displayName = "BreadcrumbList"

/**
 * BreadcrumbItem 项目组件
 * 单个面包屑项目的容器
 */
const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
    />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

/**
 * BreadcrumbLink 链接组件
 * 可点击的面包屑链接
 */
const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<"a"> & {
        /** 是否使用自定义组件渲染 */
        asChild?: boolean
    }
>(({ asChild, className, ...props }, ref) => {
    return (
        <a
            ref={ref}
            className={cn(
                "font-medium transition-colors hover:text-foreground",
                "border-b-2 border-transparent hover:border-primary",
                className
            )}
            {...props}
        />
    )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

/**
 * BreadcrumbPage 当前页组件
 * 表示当前所在页面（不可点击）
 */
const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-bold text-foreground", className)}
        {...props}
    />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

/**
 * BreadcrumbSeparator 分隔符组件
 * 用于分隔面包屑项目
 */
const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-4", className)}
        {...props}
    >
        {children ?? <ChevronRight />}
    </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

/**
 * BreadcrumbEllipsis 省略号组件
 * 当层级过多时用于折叠中间项目
 */
const BreadcrumbEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={cn(
            "flex h-9 w-9 items-center justify-center",
            "border-2 border-border bg-muted",
            "cursor-pointer hover:bg-accent",
            className
        )}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">更多</span>
    </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
}
