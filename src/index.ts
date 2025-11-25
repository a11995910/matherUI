// MatherUI - 统一导出入口
// 此文件用于 npm 包发布，导出所有可用组件

// ============ 基础组件 ============
export { Button } from './components/ui/button'
export type { ButtonProps } from './components/ui/button'

export { Badge } from './components/ui/badge'

// ============ 表单组件 ============
export { Input } from './components/ui/input'
export { Textarea } from './components/ui/textarea'
export { Checkbox } from './components/ui/checkbox'
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
export { Switch } from './components/ui/switch'
export { Slider } from './components/ui/slider'

// ============ 布局组件 ============
export { Card, CardContent } from './components/ui/card'
export { Container, Section } from './components/ui/container'

// ============ 数据展示 ============
export {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
    TableCaption
} from './components/ui/table'

export { Avatar } from './components/ui/avatar'
export { Skeleton } from './components/ui/skeleton'
export { Spinner } from './components/ui/spinner'
export { Progress } from './components/ui/progress'

// ============ 导航组件 ============
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from './components/ui/accordion'

// ============ 反馈组件 ============
export { Alert } from './components/ui/alert'

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from './components/ui/dialog'

export {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent
} from './components/ui/tooltip'

export {
    Popover,
    PopoverTrigger,
    PopoverContent
} from './components/ui/popover'

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup
} from './components/ui/dropdown-menu'

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton
} from './components/ui/select'

// ============ 排版组件 ============
export { H1, H2, H3, P } from './components/ui/typography'
export { CodeBlock } from './components/ui/code-block'

// ============ 工具函数 ============
export { cn } from './lib/utils'

// ============ 主题 ============
export { ThemeProvider, useTheme } from './contexts/ThemeContext'
