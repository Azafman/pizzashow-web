import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.baseURL,
  withCredentials: true, // por padrão o frontend, não envia os cookies no navegador para o backend, isso impede a autenticação (backend rejeitará, pois necessita do cookie de autenticação que ele mesmo salvou no navegador)
  // ao setar como true, o frontend passa a enviar os cookies nas requisições feitas (nesse caso ao backend)
})
// env.baseURL, só será acessada em caso de a validação em env.ts aprovada
