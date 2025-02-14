import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './router'

export const App = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />

        <Toaster richColors closeButton />
        {/* colocar o Toaster na raiz da aplicação */}
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  )
}
