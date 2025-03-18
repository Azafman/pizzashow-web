import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

/* 
ResponsiveContainer -> permite que o gráfico seja responsivo e tenha seu tamanho alterado conforme a tela for alterado sua dimensão
LineChart -> é o gráfico do tipo linha
*/
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 800 },
  { date: '12/12', revenue: 900 },
  { date: '13/12', revenue: 1600 },
  { date: '14/12', revenue: 1230 },
  { date: '15/12', revenue: 1100 },
]

export const RevenueChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita no período diário</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {/* Pressuponho que card content assuma a largura máxima do Card */}
        <ResponsiveContainer width={'100%'} height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            {/* LineChart é tipo de gráfico, para mais veja a documentação: https://recharts.org/ */}
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
              width={
                80
              } /* largura que a área de dados da linha vertical ocupará */
            />
            {/* <YAxis/> -> representa a barra vertical (eixo X) de dados */}
            {/* stroke -> cor dos dados e barra vertical (Y) / axisLine -> Linha que percorre a vertical (Y), de 0 até o valor máximo informado nos dados (revenue) / tickLine -> traço nos valores que montam a linha vertical (Y) */}
            {/* Em tickFormatter, callback para formatar os valores que ficarão dispostos na barra/linha vertical (Y) */}
            {/* esse estilo diminui o tamanho das fontes dentro do gráfico */}
            {/* data é os dados do gráfico */}

            <XAxis dataKey={'date'} tickLine={false} axisLine={false} dy={16} />
            {/* <XAxis/> -> representa a barra inferior/horizontal (eixo X) de dados */}
            {/* dy -> meio que margin-top para a linha/barra horizontal de dados (X) */}

            <CartesianGrid
              vertical={false}
              className="stroke-muted-foreground"
            />
            {/* CartesianGrid são as linhas guia de auxílio para leitura da tabela */}
            {/* className neste caso especifíco, substituiu o stroke. E somente com a propriedade stroke-muted ou stroke-foreground ou stroke-muted-foreground */}

            <Line
              type={'linear'}
              strokeWidth={2}
              dataKey={'revenue'}
              stroke={colors.emerald['500']}
            />
            {/* <Line /> -> representa a Linha de conteúdo do gráfico */}
            {/* type -> tipo da linha, strokeWidth -> grossura da linha do dado utilizado, dataK */}
            {/* dataKey, é o index usado na variável data, que contém os dados nos qual a linha será construído em cima. */}
            {/* stroke -> cor da linha no gráfico (dados que constroem o gráfico), usando cores do tailwindcss */}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
