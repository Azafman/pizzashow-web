import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

/* 
ResponsiveContainer -> permite que o gráfico seja responsivo e tenha seu tamanho alterado conforme a tela for alterado sua dimensão
LineChart -> é o gráfico do tipo linha
*/
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { product: 'Pepperoni', amount: 13 },
  { product: 'Mussarela', amount: 8 },
  { product: 'Marguerita', amount: 40 },
  { product: '4 Queijos', amount: 8 },
  { product: 'Fran-bacon', amount: 31 },
]
const COLORS = [
  colors.sky['500'],
  colors.amber['500'],
  colors.violet['500'],
  colors.rose['500'],
  colors.emerald['500'],
]
const generateCustomizedLabelToEachItemPieChart = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  value: string
  index: number
}) => {
  const RADIAN = Math.PI / 180
  const radius = 12 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {data[index].product.length > 12
        ? data[index].product.substring(0, 12).concat('...')
        : data[index].product}{' '}
      ({value})
    </text>
  )
  /* gera um label (descrição) personalizada de cada célula do gráfico */
  /* código copiado da internet, mas tem algo parecido na documentação. 
  Veja: https://recharts.org/en-US/examples/PieChartWithCustomizedLabel */
}
export const PopularProductsChart = () => {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {/* Pressuponho que card content assuma a largura máxima do Card */}
        <ResponsiveContainer width={'100%'} height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey={'amount'}
              nameKey={'product'}
              cx="50%"
              cy="50%"
              outerRadius={84}
              innerRadius={64}
              strokeWidth={4}
              label={generateCustomizedLabelToEachItemPieChart}
              labelLine={false}
            >
              {data.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background transition-all hover:opacity-80 dark:stroke-muted"
                  />
                  /* fill a cor background de cada célula */
                  /* className="stroke-background" -> a cor de backgound ou borda (espaçamento gerado pela propriedade strokeWidth) das células */
                )
              })}
              {/* Por padrão todas as células vem iguais (cor de fundo). Para personalizar siga o exemplo acima que segue o da documentação: https://recharts.org/en-US/examples/PieChartWithCustomizedLabel */}
            </Pie>
            {/* datakey -> index do dado que será utilizado para montar o gráfico 
            nameKey -> nome (descrição) do dado que será utilizado para montar o gráfico */}
            {/* 
            cx="50%" -> meio que um margin-left (distância em % da esquerda)
            cy="50%" -> meio que um margin-top (distância em % do topo)
            */}

            {/* 
            Use os seguintes valores para facilitar o entendimento das propriedades em questão
            outerRadius={20}-> até onde o circulo do gráfico será exibido (em % do valor disponível para o circulo)
            innerRadius={0}-> onde a circulo do gráfico começa a ser exibido (a partir do centro do circulo)
            */}

            {/* strokeWidth={8} -> adiciona espaçamento interno entre as fatias da pizza e  entre
            as fatias e o espaço a elas pertencente (outerRadius - innerRadius), numa espécie de padding-top e padding-bottom. */}

            {/* labelline -> linha da célula do gráfico até a descrição */}
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
