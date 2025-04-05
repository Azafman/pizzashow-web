import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)
// envSchema ->schema de validação qualquer
// .parse() -> efetua a validação das variáveis (estão no formato requerido)
// import.meta.env -> acessa as variáveis (setadas em .env.local)
// caso as variáveis não atendam .parse(validação) a apliacção não irá rodar (erro)
