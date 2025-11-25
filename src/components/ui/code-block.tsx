import * as React from "react"
import { cn } from "../../lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    language?: string
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
    ({ className, title = "Terminal", language = "bash", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-none border-2 border-border bg-[#1e1e1e] text-white shadow-retro overflow-hidden",
                    className
                )}
                {...props}
            >
                <div className="flex items-center justify-between border-b-2 border-border bg-muted px-4 py-2 text-foreground">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full border-2 border-border bg-red-500" />
                        <div className="h-3 w-3 rounded-full border-2 border-border bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full border-2 border-border bg-green-500" />
                    </div>
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">{title}</span>
                    <div className="w-12" /> {/* Spacer for centering */}
                </div>
                <div className="p-4 font-mono text-sm overflow-x-auto">
                    <pre>
                        <code>{children}</code>
                    </pre>
                </div>
            </div>
        )
    }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
