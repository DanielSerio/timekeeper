import { Box } from "@mantine/core";
import { format } from "date-fns";

type BaseObject<CreatedKey extends "createdAt" | "date"> = {
  lastUpdatedAt: Date | null;
} & Record<CreatedKey, Date>;

export function renderCreatedAtDate<
  Row extends BaseObject<CreatedKey>,
  CreatedKey extends "createdAt" | "date" = "createdAt",
>(key: CreatedKey) {
  return function (row: Row) {
    const dateToRender = row[key];

    let date: Date;

    if (key === "date") {
      date = new Date(Date.parse(`${dateToRender}T00:00:00.000`));
    } else {
      date = new Date(Date.parse(`${dateToRender}`));
    }

    return format(date, `yyyy/MM/dd`);
  };
}

export function renderLastUpdatedDate<
  Row extends BaseObject<CreatedKey>,
  CreatedKey extends "createdAt" | "date" = "createdAt",
>(row: Row) {
  const updateDate = row.lastUpdatedAt;

  if (!updateDate) {
    return <Box className="muted">--</Box>;
  }

  const date = new Date(Date.parse(`${updateDate}`));

  return format(date, "yyyy/MM/dd");
}
