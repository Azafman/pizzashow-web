import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

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
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })
  console.log(result)
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
          <Pagination perPage={10} totalCount={100} pageIndex={0} />
        </div>
      </div>
    </>
  )
}
