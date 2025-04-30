import { api } from '@/lib/axios'

interface CancelOrderProps {
  orderId: string
}
export async function cancelOrder({ orderId }: CancelOrderProps) {
  await api.patch(`/orders/${orderId}/cancel`)
  /* about patch:
  O método HTTP PATCH serve para aplicar modificações parciais a um recurso existente, em contraste com o método PUT, que substitui o recurso inteiro. Em vez de enviar a representação completa do recurso, o PATCH permite enviar apenas as alterações específicas que se deseja fazer.  */
}
