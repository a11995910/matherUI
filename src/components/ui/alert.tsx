import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "../../lib/utils"

const alertVariants = cva(
    "relative w-full border-2 border-border p-4 [&>svg~*]:pl-8 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                info: "bg-blue-50 text-blue-900 border-blue-900",
                success: "bg-green-50 text-green-900 border-green-900",
                warning: "bg-yellow-50 text-yellow-900 border-yellow-900",
                error: "bg-red-50 text-red-900 border-red-900",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { onClose?: () => void }
>(({ className, variant, onClose, children, ...props }, ref) => {
    const Icon = {
        default: Info,
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
        error: XCircle,
    }[variant || 'default']

    return (
        <div
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            <Icon className="h-5 w-5" />
            <div className="w-full">{children}</div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h5
            ref={ref}
            className={cn("mb-1 font-bold font-serif leading-none tracking-tight", className)}
            {...props}
        />
    )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("text-sm [&_p]:leading-relaxed", className)}
            {...props}
        />
    )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
