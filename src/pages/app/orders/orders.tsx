import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export const Orders = () => {
  /* Do to this:
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1') 
  OR: */
  const converteNumberPageOfEndUsersToPageIndex = z.coerce
    .number()
    .transform((numberPage) => numberPage - 1)
  // converteNumberPageOfEndUsersToPageIndex irá converter em número e subtrair um do parametro page da URL
  // see documentation coerce: https://zod.dev/?id=coercion-for-primitives

  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = converteNumberPageOfEndUsersToPageIndex.parse(
    searchParams.get('page') ?? '1',
  ) // in summary, to endUser will show page=1, however to use to do query will use pageIndex = 0

  const orderId = searchParams.get('orderId') ?? ''
  const customerName = searchParams.get('customerName') ?? ''
  const status = searchParams.get('status') ?? 'all'

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      if (pageIndex === 0) {
        prevState.delete('page')
      } else {
        prevState.set('page', (pageIndex + 1).toString())
      }

      return prevState
    })
  }
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        {/* O letter-spacing de titulos é um pouco grande, aqui diminuímos */}

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {/* thead */}
                <TableRow>
                  {/* tr */}
                  <TableHead className="w-[64px]"></TableHead>
                  {/* th */}
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
                {/* Diego: costumo medir o tamanho de cada coluna na tabela, pelas células do header. Como segue o exemplo acima.
              OU seja, mantenha o mesmo número de coluna tanto no header, quanto no corpo da tabela e estilize a largura das colunas do cabeçalho somente. Isso, pelo menos usando shadcnui */}
              </TableHeader>

              <TableBody>
                {result &&
                  result.orders.map((order, i) => {
                    return <OrderTableRow key={i} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              perPage={result.meta.perPage}
              totalCount={result.meta.totalCount}
              pageIndex={result.meta.pageIndex}
              handlePaginate={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
