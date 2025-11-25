import * as React from "react"
import { cn } from "../../lib/utils"

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)}
            {...props}
        />
    )
)
Container.displayName = "Container"

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <section
            ref={ref}
            className={cn("py-12 md:py-24 lg:py-32", className)}
            {...props}
        />
    )
)
Section.displayName = "Section"

export { Container, Section }
