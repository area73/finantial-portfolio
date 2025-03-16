import { PositionsTable } from "../charts/PositionsTable";
import { ExtendedPosition } from "../../types/portfolio";
import { useStore } from "../../hooks/useStore";

interface PortfolioPositionsProps {
  positions: ExtendedPosition[];
}

export function PortfolioPositions({ positions }: PortfolioPositionsProps) {
  const { viewType } = useStore();
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Positions by {viewType}</h2>
        <PositionsTable positions={positions} />
      </div>
    </div>
  );
}
