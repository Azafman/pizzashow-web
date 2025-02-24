import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      {/* A cor foreground no shadcnUi é a cor padrão, que por padrão possui um bom contraste com a cor de fundo padrão */}
      {/* O bg-muted é uma variável que representa uma cor definida no shadcui, veja tailwind.config.js */}
      {/* A ideia do shadcn não é usar nome de cores como zinc ou white, mas sim nome de variáveis, pois
      ao alterar o tema, automaticamente, a cor será alterada. Veja a div a baixo, como exemlo: 
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground"></div> */}
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium">
          <Pizza className="h-5 w-5" />
          <span className="text-foreground">pizza.shop</span>
        </div>

        <footer className="text-sm">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
