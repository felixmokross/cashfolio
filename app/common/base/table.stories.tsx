import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./table";

const meta: Meta<typeof Table<DataRow>> = {
  title: "base/Table",
  component: Table,
};

export default meta;

type DataRow = {
  id: number;
  name: string;
  assetClass: string;
  balance: number;
};

type Story = StoryObj<typeof Table<DataRow>>;

export const Default: Story = {
  args: {
    columns: [
      { name: "Name", field: "name" },
      { name: "Asset Class", field: "assetClass" },
      { name: "Balance", field: "balance" },
    ],
    data: [
      { id: 1, name: "Main Account", assetClass: "Cash", balance: 10_000 },
      { id: 2, name: "Stock A", assetClass: "Equity", balance: 40_000 },
      { id: 3, name: "Stock B", assetClass: "Equity", balance: 30_000 },
    ],
    getRowId: (row) => row.id,
  },
};
