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
export { Label } from './components/ui/label'
export type { LabelProps } from './components/ui/label'

// ============ 树状选择器 ============
export { TreeSelect } from './components/ui/tree-select'
export type { TreeSelectProps, TreeNode } from './components/ui/tree-select'

// ============ 布局组件 ============
export { Card, CardContent } from './components/ui/card'
export { Container, Section } from './components/ui/container'
export { Separator } from './components/ui/separator'
export type { SeparatorProps } from './components/ui/separator'

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
export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
} from './components/ui/breadcrumb'
export {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    SimplePagination
} from './components/ui/pagination'

// ============ 反馈组件 ============
export { Alert } from './components/ui/alert'
export { Toaster, toast } from './components/ui/toast'

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
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription
} from './components/ui/drawer'

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

// ============ 新增组件 ============
export { Empty, type EmptyProps } from './components/ui/empty'
export { Tag, tagVariants, type TagProps } from './components/ui/tag'
export { Steps, type StepsProps, type StepItem } from './components/ui/steps'
export { Rate, type RateProps } from './components/ui/rate'
export { DatePicker, type DatePickerProps } from './components/ui/date-picker'

// ============ 高级组件 ============
export { InputNumber, type InputNumberProps } from './components/ui/input-number'
export { TimePicker, type TimePickerProps } from './components/ui/time-picker'
export { Upload, type UploadProps, type UploadFile } from './components/ui/upload'
export { Image, type ImageProps } from './components/ui/image'
export { Carousel, CarouselItem, type CarouselProps, type CarouselItemProps } from './components/ui/carousel'
export { Menu, type MenuProps, type MenuItem } from './components/ui/menu'
export { Timeline, type TimelineProps, type TimelineItem } from './components/ui/timeline'
export { Calendar, type CalendarProps } from './components/ui/calendar'

// ============ 工具函数 ============
export { cn } from './lib/utils'

// ============ 主题 ============
export { ThemeProvider, useTheme } from './contexts/ThemeContext'
