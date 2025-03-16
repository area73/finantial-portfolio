import { formatCurrency } from "../../lib/utils";

interface Position {
  id: number;
  asset: string;
  quantity: number;
  price: number;
  assetName: string;
  assetType: string;
}

interface PositionsTableProps {
  positions: Position[];
}

export function PositionsByAssetTable({ positions }: PositionsTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Asset
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Value
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {positions.map((position) => (
          <tr key={position.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {position.assetName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
              {position.assetType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              {position.quantity.toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              {formatCurrency(position.price)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              {formatCurrency(position.quantity * position.price)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
