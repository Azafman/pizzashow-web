import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const filtersOrderForm = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})
type filtersOrderSchema = z.infer<typeof filtersOrderForm>

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<filtersOrderSchema>({
    resolver: zodResolver(filtersOrderForm),
    defaultValues: {
      orderId: searchParams.get('orderId') ?? '',
      customerName: searchParams.get('customerName') ?? '',
      status: searchParams.get('status') ?? 'all',
    },
  })

  function handleOrderFiltering({
    customerName,
    orderId,
    status,
  }: filtersOrderSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete('page')
      prevState.delete('status')
      prevState.delete('orderId')
      prevState.delete('customerName')

      return prevState
    })
    reset()
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleOrderFiltering)}
    >
      <span className="gap-2 text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        control={control}
        name="status"
        defaultValue={'all'}
        disabled={isSubmitting}
        render={({ field: { name, onChange, value } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
            >
              <SelectTrigger className="h-8 w-[175px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant={'secondary'} size={'xs'}>
        <Search />
        Filtar resultados
      </Button>
      <Button
        type="button"
        variant={'outline'}
        size={'xs'}
        onClick={() => handleClearFilters()}
      >
        <X />
        Remover filtros
      </Button>
    </form>
  )
}
