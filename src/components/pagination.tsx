import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  handlePaginate: (pageIndex: number) => void
}
export const Pagination = ({
  pageIndex,
  totalCount,
  perPage,
  handlePaginate,
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(0)}
          >
            <ChevronsLeft className="h-8 w-8 p-0" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(pageIndex - 1)}
          >
            <ChevronLeft className="h-8 w-8 p-0" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(pageIndex + 1)}
          >
            <ChevronRight className="h-8 w-8 p-0" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant={'outline'}
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate(pages - 1)}
          >
            <ChevronsRight className="h-8 w-8 p-0" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
