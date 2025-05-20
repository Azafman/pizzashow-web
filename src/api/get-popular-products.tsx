import { api } from '@/lib/axios'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[] // array of this object, which is why the type was used and not the interface
export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
