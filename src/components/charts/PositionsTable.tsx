import { useStore } from "../../hooks/useStore";
import { PositionsByAssetTable } from "./PositionsByAssetTable";
import { PositionsByClassTable } from "./PositionsByClassTable";
import { motion, AnimatePresence } from "framer-motion";

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

export function PositionsTable({ positions }: PositionsTableProps) {
  const { viewType } = useStore();
  return (
    <div className="overflow-x-auto">
      <AnimatePresence mode="wait">
        {viewType === "asset" ? (
          <motion.div
            key="asset"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PositionsByAssetTable positions={positions} />
          </motion.div>
        ) : (
          <motion.div
            key="class"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PositionsByClassTable positions={positions} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
