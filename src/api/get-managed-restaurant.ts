import { api } from '@/lib/axios'

export interface ManagedRestaurant {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}
export async function getManagedRestaurant(): Promise<ManagedRestaurant> {
  const response = await api.get<ManagedRestaurant>('/managed-restaurant')

  return response.data
}
