import { Box, Skeleton } from "@mantine/core";
import { TableRow } from "./TableRow";

export function TableSkeletonRow({
  gridTemplateColumns,
}: {
  gridTemplateColumns: string;
}) {
  const count = `${gridTemplateColumns}`.split(/\s+/g).length;

  return (
    <TableRow className="skeleton" gridTemplateColumns={gridTemplateColumns}>
      {[...new Array(count)].map((_, i) => (
        <Box className="table-cell" key={i}>
          <Box className="label">
            <Skeleton h={14} w="6ch" />
          </Box>
          <Box className="value">
            <Skeleton h={14} w="100%" miw="10ch" />
          </Box>
        </Box>
      ))}
    </TableRow>
  );
}
