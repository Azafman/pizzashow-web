import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // por padrão o frontend, não envia os cookies no navegador para o backend, isso impede a autenticação (backend rejeitará, pois necessita do cookie de autenticação que ele mesmo salvou no navegador)
  // ao setar como true, o frontend passa a enviar os cookies nas requisições feitas (nesse caso ao backend)
})
// env.baseURL, só será acessada em caso de a validação em env.ts aprovada

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    // intercepta cada requisição e faça contéudo dentro da callback
    // adiciona delay de 2 segundos em todas as requisições gerenciadas pelo axios (api)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}
