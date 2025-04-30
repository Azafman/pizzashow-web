import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { OrdersResponse, OrderStatuses } from '@/api/get-orders'
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
interface updateOrderStatusOnCacheProps {
  orderId: string
  status: OrderStatuses
}

export const OrderTableRow = ({ order }: OrderProps) => {
  const [orderDetailOpened, setOrderDetailOpened] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache({
    orderId,
    status,
  }: updateOrderStatusOnCacheProps) {
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
            if (cacheOrder.orderId === orderId) {
              return { ...cacheOrder, status }
            }

            return cacheOrder
          }),
        })
      }
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'canceled' })
      },
    })
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'processing' })
      },
    })
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'delivering' })
      },
    })
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ orderId, status: 'delivered' })
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
        {order.status === 'pending' && (
          <Button
            variant={'secondary'}
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-2 w-3" />
            Aprovar
          </Button>
        )}
        {order.status === 'processing' && (
          <Button
            variant={'secondary'}
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-2 w-3" />
            Em entrega
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button
            variant={'secondary'}
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-2 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant={'ghost'}
          size={'xs'}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          } /* só será possível cancelar o pedido quando o status for Pedente e Em preparo */
        >
          <X className="mr-2 h-2 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
