import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})
type signInFormSchema = z.infer<typeof signInForm>

export const SignIn = () => {
  const [searchParams] = useSearchParams() // state para acessar valores na URL

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFormSchema>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })
  // mutateAsync is signIn, however, to the use useMutation, we can acess properties as isSucess, isIdle, data, etc... Assim we can managing the request with useQuery, using useMutation function

  async function handleSignIn(data: signInFormSchema) {
    try {
      await authenticate({ email: data.email })
      toast.success('Enviamos um link de autenticação para seu e-mail.')
      reset()
    } catch {
      toast.error('Credenciais inválidas.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
        closeButton: false,
      })
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={'link'}>
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>

            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            className="gap-4 space-y-4"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail:</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
