import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const OrderDetails = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 98498DFDF</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              {/* text-foreground -> cor padrão de todo texto no tema atual, que por sua vez contrasta com a cor principal do tema */}
              {/* text-muted-foreground -> cor de texto do tema atual, que possui contraste leve com a cor principal do tema */}
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pedente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Mateus Azaf Martins Lima
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                mateusazaf295@gmail.com
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Realizado</TableCell>
              <TableCell className="flex justify-end">há 3 minutos</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Pizza moda casa</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">R$ 59,90</TableCell>
              <TableCell className="text-right">R$ 179,70</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pizza FranBacon</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">R$ 65,90</TableCell>
              <TableCell className="text-right">R$ 65,90</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              {/* Como tenho duas colunas somente, se o atributo colSpan não for informado, as colunas preencherão somente metada do espaço disponível. Porém ao setar 3 no atributo em vigência, a célula em questão, ocupará 3 colunas. */}
              <TableCell>R$ 245,60</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
