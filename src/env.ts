import { z } from 'zod'

const envSchema = z.object({
  baseURL: z.string().url(),
})

export const env = envSchema.parse({
  baseURL: import.meta.env.VITE_API_URL,
})
// envSchema ->schema de validação qualquer
// .parse() -> efetua a validação das variáveis (estão no formato requerido)
// import.meta.env -> acessa as variáveis (setadas em .env.local)
// caso as variáveis não atendam .parse(validação) a apliacção não irá rodar (erro)
