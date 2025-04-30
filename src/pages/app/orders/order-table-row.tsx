import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

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
        <Button variant={'ghost'} size={'xs'}>
          <X className="mr-2 h-2 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
