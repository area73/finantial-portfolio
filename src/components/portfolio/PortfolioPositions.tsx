import { PositionsTable } from "../charts/PositionsTable";
import { ExtendedPosition } from "../../types/portfolio";

interface PortfolioPositionsProps {
  positions: ExtendedPosition[];
}

export function PortfolioPositions({ positions }: PortfolioPositionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Positions</h2>
        <PositionsTable positions={positions} />
      </div>
    </div>
  );
}
