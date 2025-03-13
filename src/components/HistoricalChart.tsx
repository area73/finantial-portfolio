import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../lib/utils';

interface HistoricalChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export function HistoricalChart({ data }: HistoricalChartProps) {
  return (
    <div className="h-[400px] w-full">
      <h2 className="text-xl font-semibold mb-4">Portfolio Value Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
          />
          <Line
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