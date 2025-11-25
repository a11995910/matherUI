/**
 * Pagination 组件文档
 */

import { SimplePagination } from "../../../components/ui/pagination"
import { DocSection, DocExample } from "../DocSection"
import type { PropItem } from "../../types"

const paginationProps: PropItem[] = [
    { prop: "currentPage", type: "number", default: "-", description: "当前页码（从1开始）" },
    { prop: "totalPages", type: "number", default: "-", description: "总页数" },
    { prop: "onPageChange", type: "(page: number) => void", default: "-", description: "页码改变回调" },
    { prop: "siblingCount", type: "number", default: "1", description: "当前页两侧显示的页码数量" },
]

export function PaginationDoc() {
    return (
        <DocSection
            id="pagination"
            title="Pagination 分页"
            description="分页组件，用于数据列表的分页导航，提供简化版和完整版两种使用方式。"
            props={paginationProps}
        >
            <DocExample
                title="简化版用法"
                code={`import { SimplePagination } from '@/components/ui/pagination'

const [currentPage, setCurrentPage] = useState(1)

<SimplePagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>`}
            >
                <SimplePagination
                    currentPage={3}
                    totalPages={10}
                    onPageChange={(page) => console.log('Page:', page)}
                />
            </DocExample>
        </DocSection>
    )
}
