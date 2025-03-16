import { formatCurrency, groupPositionsByAssetType } from "../../lib/utils";

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

export function PositionsByClassTable({ positions }: PositionsTableProps) {
  const groupedPositions = groupPositionsByAssetType(positions);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Class
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Number of assets
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total value
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {groupedPositions.map((position) => (
          <tr key={position.assetType}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {position.assetType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              {position.totalQuantity.toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              {formatCurrency(position.totalPrice)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
