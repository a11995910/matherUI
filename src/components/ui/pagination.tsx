/**
 * Pagination 分页组件
 * 用于数据列表的分页导航
 * 
 * @description 提供页码导航功能，支持首页、上一页、下一页、尾页等操作
 * @example
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 */
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

/**
 * Pagination 容器组件
 */
const Pagination = ({
    className,
    ...props
}: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)
Pagination.displayName = "Pagination"

/**
 * PaginationContent 内容容器
 */
const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

/**
 * PaginationItem 单个分页项
 */
const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

// 分页链接属性类型
type PaginationLinkProps = {
    /** 是否为当前活动页 */
    isActive?: boolean
    /** 是否禁用 */
    disabled?: boolean
} & React.ComponentProps<"a">

/**
 * PaginationLink 分页链接
 */
const PaginationLink = ({
    className,
    isActive,
    disabled,
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "default" : "outline",
                size: "icon",
            }),
            "h-10 w-10",
            disabled && "pointer-events-none opacity-50",
            className
        )}
        {...props}
    />
)
PaginationLink.displayName = "PaginationLink"

/**
 * PaginationPrevious 上一页按钮
 */
const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="上一页"
        className={cn("gap-1 pl-2.5 w-auto px-4", className)}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>上一页</span>
    </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

/**
 * PaginationNext 下一页按钮
 */
const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="下一页"
        className={cn("gap-1 pr-2.5 w-auto px-4", className)}
        {...props}
    >
        <span>下一页</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

/**
 * PaginationEllipsis 省略号
 */
const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn(
            "flex h-10 w-10 items-center justify-center",
            className
        )}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">更多页码</span>
    </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

// ============ 简化版分页组件 ============

interface SimplePaginationProps {
    /** 当前页码（从1开始） */
    currentPage: number
    /** 总页数 */
    totalPages: number
    /** 页码改变回调 */
    onPageChange: (page: number) => void
    /** 显示的页码数量 */
    siblingCount?: number
    /** 自定义类名 */
    className?: string
}

/**
 * SimplePagination 简化分页组件
 * 提供开箱即用的分页功能
 * 
 * @param currentPage - 当前页码
 * @param totalPages - 总页数
 * @param onPageChange - 页码改变回调
 * @param siblingCount - 当前页两侧显示的页码数量
 */
const SimplePagination: React.FC<SimplePaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    className,
}) => {
    // 生成页码数组
    const generatePages = () => {
        const pages: (number | "ellipsis")[] = []
        const leftSibling = Math.max(currentPage - siblingCount, 1)
        const rightSibling = Math.min(currentPage + siblingCount, totalPages)

        // 是否显示左侧省略号
        const showLeftEllipsis = leftSibling > 2
        // 是否显示右侧省略号
        const showRightEllipsis = rightSibling < totalPages - 1

        // 始终显示第一页
        pages.push(1)

        // 左侧省略号
        if (showLeftEllipsis) {
            pages.push("ellipsis")
        } else if (leftSibling > 1) {
            for (let i = 2; i < leftSibling; i++) {
                pages.push(i)
            }
        }

        // 中间页码
        for (let i = leftSibling; i <= rightSibling; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i)
            }
        }

        // 右侧省略号
        if (showRightEllipsis) {
            pages.push("ellipsis")
        } else if (rightSibling < totalPages) {
            for (let i = rightSibling + 1; i < totalPages; i++) {
                pages.push(i)
            }
        }

        // 始终显示最后一页（如果总页数大于1）
        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    const pages = generatePages()

    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        href="#"
                    />
                </PaginationItem>

                {pages.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(page)
                                }}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        href="#"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    SimplePagination,
}
