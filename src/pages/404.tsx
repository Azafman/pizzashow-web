import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <p>
        Voltar para o{' '}
        <Link
          to={'/'}
          className="font-bold text-emerald-700 dark:text-emerald-400"
        >
          dashboard
        </Link>
      </p>
    </div>
  )
}
