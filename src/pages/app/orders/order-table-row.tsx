import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import { OrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export const OrderTableRow = ({ order }: OrderProps) => {
  const [orderDetailOpened, setOrderDetailOpened] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId: payloadOrderId }) {
      // variable no onSucess são os parametros passados em cancelOrderFn

      const ordersListCache = queryClient.getQueriesData<OrdersResponse>({
        queryKey: ['orders'],
      }) // todas as queries feitas com queryKey: 'orders' -> desde queryKey: ['orders'] até ['orders', 1,2,4] por exemplo
      // se o método utilizado fosse getQueryData somente a queryKey ['orders'] seria retornada

      // atualizo o http state de todas as queryKeys que contém ['orders']
      // isso tem grande impacto porque na hora de aplicar filtros e listagens, independente dos parametros, o http state terá todos os dados atualizados
      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (cacheData) {
          queryClient.setQueryData<OrdersResponse>(cacheKey, {
            ...cacheData, // destructing em cache.meta e cache.orders
            orders: cacheData.orders.map((cacheOrder) => {
              // sobrescreve destructing em cache.orders
              if (cacheOrder.orderId === payloadOrderId) {
                return { ...cacheOrder, status: 'canceled' }
              }

              return cacheOrder
            }),
          })
        }
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setOrderDetailOpened(true)}
            >
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
              {/* não aparece em tela */}
            </Button>
          </DialogTrigger>

          <OrderDetails
            orderId={order.orderId}
            orderDetailOpened={orderDetailOpened}
          />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {order.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
        {/* transform number in format money PTBR R$ 0,00 */}
      </TableCell>
      <TableCell>
        <Button variant={'secondary'} size="xs">
          <ArrowRight className="mr-2 h-2 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant={'ghost'}
          size={'xs'}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['peding', 'processing'].includes(order.status)
          } /* só será possível cancelar o pedido quando o status for Pedente e Em preparo */
        >
          <X className="mr-2 h-2 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
