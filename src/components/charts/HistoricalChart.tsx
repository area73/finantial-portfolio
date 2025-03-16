import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../lib/utils";

interface HistoricalChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  isAnimationActive?: boolean;
}

export function HistoricalChart({
  data,
  isAnimationActive = true,
}: HistoricalChartProps) {
  return (
    <div className="h-[400px] w-full">
      <h2 className="text-xl font-semibold mb-4">Portfolio Value Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={90}
            dy={10}
          />

          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip
            isAnimationActive={isAnimationActive}
            labelFormatter={(value: string) =>
              new Date(value).toLocaleDateString()
            }
            formatter={(value: number) => [
              formatCurrency(value),
              "Portfolio Value",
            ]}
          />
          <Line
            isAnimationActive={isAnimationActive}
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
