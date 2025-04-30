import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface OrderDetailsProps {
  orderId: string
  orderDetailOpened: boolean
}
export const OrderDetails = ({
  orderId,
  orderDetailOpened,
}: OrderDetailsProps) => {
  const { data: orderDetails } = useQuery({
    queryFn: () => getOrderDetails({ orderId }),
    queryKey: ['order', orderId],
    enabled: orderDetailOpened,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      {orderDetails ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                {/* text-foreground -> cor padrão de todo texto no tema atual, que por sua vez contrasta com a cor principal do tema */}
                {/* text-muted-foreground -> cor de texto do tema atual, que possui contraste leve com a cor principal do tema */}
                <TableCell className="flex justify-end">
                  <OrderStatus status={orderDetails.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.customer.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetails.customer.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(orderDetails.createdAt, {
                    locale: ptBR, // por default vem em inglês
                    addSuffix: true, // adiciona mensagem de texto ex: 'Há 3 dias'
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableHeader>

            <TableBody>
              {orderDetails.orderItems.map((orderItem, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>Pizza moda casa</TableCell>
                    <TableCell className="text-right">
                      {orderItem.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(orderItem.priceInCents / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (orderItem.priceInCents / 100) *
                        orderItem.quantity
                      ).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                {/* Como tenho duas colunas somente, se o atributo colSpan não for informado, as colunas preencherão somente metada do espaço disponível. Porém ao setar 3 no atributo em vigência, a célula em questão, ocupará 3 colunas. */}
                <TableCell className="text-right">
                  {orderDetails.orderItems
                    .reduce((sumTot, orderItem) => {
                      sumTot +=
                        (orderItem.priceInCents / 100) * orderItem.quantity

                      return sumTot
                    }, 0)
                    .toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <Skeleton className="h-[460px] w-[440px]" />
      )}
    </DialogContent>
  )
}
