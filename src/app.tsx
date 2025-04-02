import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './router'

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop">
        <HelmetProvider>
          <Helmet titleTemplate="%s | pizza.shop" />

          <Toaster richColors closeButton />
          {/* colocar o Toaster na raiz da aplicação */}
          <QueryClientProvider client={queryClient}>
            {/* Agora todas as funcionalidades disponíveis do reactQuery estão disponíveis pela aplicação */}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </ThemeProvider>
    </>
  )
}
