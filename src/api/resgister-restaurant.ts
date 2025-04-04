import { api } from '@/lib/axios'

export interface RestaurantBody {
  restaurantName: string
  email: string
  phone: string
  managerName: string
}
export async function registerRestaurant(dataRestaurant: RestaurantBody) {
  await api.post('/restaurants', dataRestaurant)
}
