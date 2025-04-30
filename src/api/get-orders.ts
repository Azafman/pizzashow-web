import { api } from '@/lib/axios'

export interface OrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}
interface GetOrdersQuery {
  pageIndex: number
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export const getOrders = async ({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) => {
  const response = await api.get<OrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })
  // essa tipagem foi obtida no backened, é importante tipar...
  // params resulta em em url, parecida como:http://localhost:3333/orders?pageIndex=0

  return response.data
}
