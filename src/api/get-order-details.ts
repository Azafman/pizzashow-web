import { api } from '@/lib/axios'

interface GetOrderDetailsQuery {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[] // similar à: string[]
}
interface GetOrderDetailsProps {
  orderId: string
}
export async function getOrderDetails({ orderId }: GetOrderDetailsProps) {
  const response = await api.get<GetOrderDetailsQuery>(`/orders/${orderId}`)

  return response.data
}
