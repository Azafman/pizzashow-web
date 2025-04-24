import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export const AccountMenu = () => {
  const navigate = useNavigate()

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
      // tempo em que a query ficará obsoleta (porque esse tipo de dado não é alterado com frequência)
    })
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    // tempo em que a query ficará obsoleta (porque esse tipo de dado não é alterado com frequência)
  })
  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut, // o back-end apaga o cookie de autenticação no navagador
    onSuccess() {
      navigate('/sign-in', {
        replace: true,
      })
    },
  })

  return (
    <Dialog>
      {/* Dialog dá o contexto em que será usado, nesse caso é o componente pai */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-full w-40" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown />
            {/* para dar a sensação de ser um menu clicável */}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            {/* Faz com que o dialog trigger assuma as propriedades de DropdownMenuItem (as Child) e ele abre o DialogContent */}
            <DropdownMenuItem className="hover:cursor-pointer">
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="text-rose-500 hover:cursor-pointer dark:text-rose-400"
            onClick={() => signOutFn()}
            asChild
            disabled={isSigningOut}
          >
            {/* dark:text-rose-400 seta a cor quando o tema for dark */}
            <button className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
      {/* Contenúdo da popup (dialog), abra o componente e veja */}
    </Dialog>
  )
}
