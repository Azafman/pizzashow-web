import { api } from '@/lib/axios'

export async function signOut() {
  api.post('/sign-out') // o back-end apaga o cookie de autenticação no navagador
}
