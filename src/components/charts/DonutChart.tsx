import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { formatCurrency, formatPercent } from "../../lib/utils";

export type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};

interface DonutChartProps {
  data: ChartDataItem[];
  title: string;
  isAnimationActive?: boolean;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function DonutChart({
  data,
  title,
  isAnimationActive = true,
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[300px] w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={100} height={100}>
          <Pie
            isAnimationActive={isAnimationActive}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) =>
              `${name} (${formatPercent(value / total)})`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Value"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
