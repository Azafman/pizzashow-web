import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './router'

export const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop">
        <HelmetProvider>
          <Helmet titleTemplate="%s | pizza.shop" />

          <Toaster richColors closeButton />
          {/* colocar o Toaster na raiz da aplicação */}
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </>
  )
}
