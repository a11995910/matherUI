/**
 * Drawer 抽屉组件
 * 从屏幕边缘滑出的面板，用于展示详情或表单
 * 
 * @description 支持从四个方向滑出，适合移动端和桌面端使用
 * @example
 * <Drawer>
 *   <DrawerTrigger>打开抽屉</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>标题</DrawerTitle>
 *       <DrawerDescription>描述文字</DrawerDescription>
 *     </DrawerHeader>
 *     <div>内容区域</div>
 *     <DrawerFooter>
 *       <Button>确认</Button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 */
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

// Drawer 根组件
const Drawer = DialogPrimitive.Root

// Drawer 触发器
const DrawerTrigger = DialogPrimitive.Trigger

// Drawer Portal
const DrawerPortal = DialogPrimitive.Portal

// Drawer 关闭按钮
const DrawerClose = DialogPrimitive.Close

/**
 * DrawerOverlay 遮罩层组件
 */
const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

// 抽屉内容样式变体
const drawerVariants = cva(
    cn(
        "fixed z-50 bg-background border-2 border-border shadow-retro",
        "flex flex-col",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "duration-300"
    ),
    {
        variants: {
            /**
             * 抽屉滑出方向
             * - top: 从顶部滑出
             * - right: 从右侧滑出（默认）
             * - bottom: 从底部滑出
             * - left: 从左侧滑出
             */
            side: {
                top: cn(
                    "inset-x-0 top-0 border-t-0",
                    "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top"
                ),
                right: cn(
                    "inset-y-0 right-0 h-full w-3/4 max-w-sm border-r-0",
                    "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
                ),
                bottom: cn(
                    "inset-x-0 bottom-0 border-b-0",
                    "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
                ),
                left: cn(
                    "inset-y-0 left-0 h-full w-3/4 max-w-sm border-l-0",
                    "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
                ),
            },
        },
        defaultVariants: {
            side: "right",
        },
    }
)

// DrawerContent 属性类型
interface DrawerContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
    /** 是否显示关闭按钮 */
    showClose?: boolean
}

/**
 * DrawerContent 内容组件
 */
const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DrawerContentProps
>(({ side = "right", className, children, showClose = true, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(drawerVariants({ side }), className)}
            {...props}
        >
            {children}
            {showClose && (
                <DrawerClose className={cn(
                    "absolute right-4 top-4",
                    "h-8 w-8 flex items-center justify-center",
                    "border-2 border-border bg-background",
                    "hover:bg-muted transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                )}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">关闭</span>
                </DrawerClose>
            )}
        </DialogPrimitive.Content>
    </DrawerPortal>
))
DrawerContent.displayName = DialogPrimitive.Content.displayName

/**
 * DrawerHeader 头部组件
 */
const DrawerHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 p-6 border-b-2 border-border",
            className
        )}
        {...props}
    />
)
DrawerHeader.displayName = "DrawerHeader"

/**
 * DrawerFooter 底部组件
 */
const DrawerFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 border-t-2 border-border mt-auto",
            className
        )}
        {...props}
    />
)
DrawerFooter.displayName = "DrawerFooter"

/**
 * DrawerTitle 标题组件
 */
const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-bold", className)}
        {...props}
    />
))
DrawerTitle.displayName = DialogPrimitive.Title.displayName

/**
 * DrawerDescription 描述组件
 */
const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
