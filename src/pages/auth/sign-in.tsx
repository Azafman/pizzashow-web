import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})
type signInFormSchema = z.infer<typeof signInForm>

export const SignIn = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInFormSchema>()

  async function handleSignIn(data: signInFormSchema) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    reset()
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
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
