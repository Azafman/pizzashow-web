import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div>
      <div>AppLayout</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
