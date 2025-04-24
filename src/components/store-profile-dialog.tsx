import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  ManagedRestaurant,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileForm = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
})
type storeProfileFormSchema = z.infer<typeof storeProfileForm>

export function StoreProfileDialog() {
  const queryClient = useQueryClient() // um hook para acessar o queryClient (estado global) -> react-query.ts

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity, // tempo em que a query ficará obsoleta (porque esse tipo de dado não é alterado com frequência)
  }) // por usar a mesma queryKey, não será feita uma nova requisição(porém o valor retornado da
  // requisição utilizado será utilizado)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<storeProfileFormSchema>({
    resolver: zodResolver(storeProfileForm),
    values: {
      // uma outra opção seria o atributo defaultValues, porém esse não atenderia pois pegaria somente os valores no exato momento em que o componente fosse invocado (value aparenta observar e alterar o valor quando a query managedRestaurant é efeutada)
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })
  function updateManagedRestaurantInCache(variables: storeProfileFormSchema) {
    const profileCached = queryClient.getQueryData<ManagedRestaurant>([
      'managed-restaurant',
    ])
    // (_) data is the data returned by request (updateProfileFn)
    // variable is the payload data (dados enviados)
    // profileCached -> é o dado salvo em cache pela react query em decorrência da query feita em <AccountMenu />
    // getQueryData<TipagemEsperada>, nos ajuda a verificar os dados que serão retornados

    /* 
      - About:getQueryData
      Imperative (non-reactive) way to retrieve data for a QueryKey. Should only be used in callbacks or functions
       where reading the latest data is necessary, e.g. for optimistic updates.

      Hint: Do not use this function inside a component, because it won't receive updates. Use useQuery to create a QueryObserver 
      that subscribes to changes.
    */

    if (profileCached) {
      queryClient.setQueryData<ManagedRestaurant>(['managed-restaurant'], {
        ...profileCached,
        name: variables.name,
        description: variables.description,
      })
      // setQueryData<TipagemEsperada>, limita o tipo de dado que podemos alterar (prevenção à erro)
      // setQueryData -> update the value of managed-restaurant in HTTP-STATE => result: Todos lugares da aplicação que utilizam essa query
      // terão seus valores automaticamente atualizados
    }
    return { profileCached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description, name }) {
      // { description, name }->is payload
      // onMutate is dispatched when updateProfileFn Is invoked
      const { profileCached } = updateManagedRestaurantInCache({
        name,
        description,
      }) // atualiza o http state (renderiza para o usuário)

      return {
        previosProfile: profileCached,
      }
    },
    onError(_, __, context) {
      // context is the value returned by function onMutate
      // onError is dispatched when catch the error in onMutate
      if (context?.previosProfile) {
        updateManagedRestaurantInCache(context.previosProfile)
      }
    },
  })

  async function handleStoreProfile(data: storeProfileFormSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleStoreProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>

            <Textarea
              id="description"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'outline'}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant={'success'} disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
