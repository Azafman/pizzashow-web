import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // umas das FORMAS de evitar usuários não atenticados de navegarem no sistema, é redirecioná-lo para fora
    // quando capturar determinado erro que especifique que ele não está autenticado (definido no backend)
    // PARA ISSO VAMOS UTILIZAR O APPLAYOUT QUE É O COMPONENTE PAI MAIS ALTO DOS DEMAIS COMPONENTES NO SISTEMA (QUE DEMANDAM USUÁRIO AUTENTICADO)

    const interceptorId = api.interceptors.response.use(
      (response) => response, // não faz nada, o fluxo da aplicação continua
      (error) => {
        // this callback is invoked when the axios catch erro
        // In the backend, we configure the response when the user isn't authenticated and
        // In the front-end idenify this and redirect automatically redirect him

        if (isAxiosError(error)) {
          // if (true) -> faz com que seja acessível a tipagem do erro, fica mais fácil (TS)
          const status = error.response?.status // setting in backend
          const code = error.response?.data.code // setting in backend

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', {
              replace: true, // remove a opção de voltar para o dashboard com a seta do navegador
            }) // same function used in account-menu.tsx to do logout
          }
        }
      },
    ) // pela experiência que tive também com o RMA, acredito que assim monitoramos toda e qualquer requisição feita detro da aplicação por meio de api

    return () => {
      // Lembra do cleanup que é executado quando o componente em questão é desmontado? Eis aqui
      // return callback of useEffect
      api.interceptors.response.eject(interceptorId) // remove o interceptor adicionado mais acima
    }
  }, [navigate])
  /* Sobre navigate ser usado como dependência do use Effect:
  Mesmo sendo estável (navigate), boas práticas (e o eslint-plugin-react-hooks) recomendam que todas as dependências usadas dentro do useEffect estejam listadas explicitamente, para evitar bugs quando uma dependência realmente instável for usada.

  Lembre-se: a callback do useEffect neste caso é executada somente quando o componente é montado devido à lista de dependência.
 */

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
