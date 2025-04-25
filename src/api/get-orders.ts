import { api } from '@/lib/axios'

interface OrdersResponse {
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
}

export const getOrders = async ({ pageIndex }: GetOrdersQuery) => {
  const response = await api.get<OrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })
  // essa tipagem foi obtida no backened, é importante tipar...
  // params resulta em em url, parecida como:http://localhost:3333/orders?pageIndex=0

  return response.data
}
