import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.baseURL,
})
// env.baseURL, só será acessada em caso de a validação em env.ts aprovada
