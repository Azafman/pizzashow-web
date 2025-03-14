import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const MonthRevenueCard = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        {/* space-y -> seta margin-top e margin-bottom (y -> vertical) */}
        <CardTitle className="text-base font-semibold">
          Receita total(mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        {/* color altera a cor do svg */}
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 25.000,00</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-rose-600 dark:text-rose-400">-2%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
