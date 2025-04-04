import { api } from '@/lib/axios'

interface SignInBody {
  email: string
} // seria possível também fazer validação com zod e inferir a tipagem do schema, porém isso já é feito
export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email })
  // o backend salva um cookie (httpOnly) de autenticação no navegador e redireciona o usuário para o dashboard
}
// a ideia principal da pasta api/ é que dentro dela eu tenha as requisições feitas a partir do front-end,
// tipadas (entrada e saída), isso permite saber o que será enviado e retornado
/* 
Algumas ferramentas fazer isso de forma automatizada, como: graphQL, mas faremos isso manualmente
*/

/* 
Explicação DIEGO rocketseat:
- Mutation é toda mutação, aleração, etc... (POST, DELETE, PUT)
- Mutation é diferente de query, que por sua vez representa listagem (GET)
- Mutation é uma "interface" que facilita a gestão da comunicação backend/frontend
*/
