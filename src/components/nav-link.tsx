import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps
export const NavLink = (props: NavLinkProps) => {
  const { pathname } = useLocation()
  // A URL pathname, beginning with a /.
  return (
    <Link
      data-current={pathname === props.to} /* negrito no link da página atual */
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
    /* 
        className="data-[current=true]:text-foreground" -> jeito tailwindCSS
    */
  )
}
