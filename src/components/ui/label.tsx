/**
 * Label 表单标签组件
 * 用于为表单控件提供标签说明
 * 
 * @description 语义化的表单标签，支持与表单控件关联
 * @example
 * <Label htmlFor="email">邮箱地址</Label>
 * <Input id="email" type="email" />
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Label 样式变体配置
const labelVariants = cva(
    "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            /**
             * 标签尺寸
             * - sm: 小尺寸
             * - default: 默认尺寸
             * - lg: 大尺寸
             */
            size: {
                sm: "text-xs",
                default: "text-sm",
                lg: "text-base",
            },
            /**
             * 是否必填标记
             */
            required: {
                true: "after:content-['*'] after:ml-0.5 after:text-red-500",
                false: "",
            },
        },
        defaultVariants: {
            size: "default",
            required: false,
        },
    }
)

// Label 组件属性类型
export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
    /** 是否显示必填标记 */
    required?: boolean
}

/**
 * Label 组件
 * 
 * @param className - 自定义类名
 * @param size - 标签尺寸：sm | default | lg
 * @param required - 是否显示必填标记
 * @param props - 其他 label 标签属性
 * @returns 表单标签组件
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, size, required, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn(labelVariants({ size, required: required ? true : false, className }))}
                {...props}
            />
        )
    }
)
Label.displayName = "Label"

export { Label, labelVariants }
